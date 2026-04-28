package com.duckie.backend.service;

import com.duckie.backend.exception.ResourceNotFoundException;
import com.duckie.backend.entity.Application;
import com.duckie.backend.entity.EmailTemplate;
import com.duckie.backend.entity.EmailLog;
import com.duckie.backend.entity.EmailStatus; 
import com.duckie.backend.repository.EmailTemplateRepository;
import com.duckie.backend.repository.EmailLogRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.duckie.backend.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

@Service
@RequiredArgsConstructor
public class EmailService {
    
    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    
    private final EmailTemplateRepository emailTemplateRepository;
    private final EmailLogRepository emailLogRepository; 
    private final RabbitTemplate rabbitTemplate; 

    public void sendNotificationEmail(Application application, String templateName) {
        EmailTemplate template = getTemplateByName(templateName);

        String subject = fillTemplateVariables(template.getSubject(), application);
        String body = fillTemplateVariables(template.getBody(), application);

        EmailLog emailLog = EmailLog.builder()
                .application(application)
                .subject(subject)
                .body(body)
                .status(EmailStatus.PENDING) 
                .build();
        emailLog = emailLogRepository.save(emailLog);

        try {
            rabbitTemplate.convertAndSend(
                RabbitMQConfig.EMAIL_EXCHANGE, 
                RabbitMQConfig.EMAIL_ROUTING_KEY, 
                emailLog.getId() 
            );
            log.info("Đã đưa email (Log ID: {}) vào hàng đợi", emailLog.getId());
        } catch (Exception e) {
            log.error("Lỗi khi đưa email vào RabbitMQ (Log ID: {})", emailLog.getId(), e);
            emailLog.setStatus(EmailStatus.FAILED);
            emailLogRepository.save(emailLog);
        }
    }

    private EmailTemplate getTemplateByName(String type) { 
        return emailTemplateRepository.findByType(type)
                .orElseThrow(() -> new ResourceNotFoundException("Template not found: " + type));
    }
    
    private String fillTemplateVariables(String rawText, Application application) { 
        if (rawText == null) return "";
        return rawText.replace("[CandidateName]", application.getCV().getCandidateName())
                .replace("[JobTitle]", application.getJobPosting().getTitle());
    }
}