package com.duckie.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import com.duckie.backend.exception.ResourceNotFoundException;
import com.duckie.backend.mapper.EmailLogMapper;
import com.duckie.backend.entity.Application;
import com.duckie.backend.entity.EmailTemplate;
import com.duckie.backend.entity.EmailLog;
import com.duckie.backend.entity.EmailStatus; 
import com.duckie.backend.repository.EmailTemplateRepository;
import com.duckie.backend.repository.EmailLogRepository;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.duckie.backend.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import com.duckie.backend.dto.EmailLogResponse; 

@Service
@RequiredArgsConstructor
public class EmailService {
    
    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    
    private final EmailTemplateRepository emailTemplateRepository;
    private final EmailLogRepository emailLogRepository; 
    private final RabbitTemplate rabbitTemplate; 
    private final EmailLogMapper emailLogMapper; 

    public void sendNotificationEmail(Application application, String templateName) {
        EmailTemplate template = getTemplateByName(templateName);

        String subject = fillTemplateVariables(template.getSubject(), application);
        String body = fillTemplateVariables(template.getBody(), application);

        createAndSendEmailLog(application, subject, body);
    }


    public void sendCustomNotificationEmail(Application application, String rawSubject, String rawBody) {
        String subject = fillTemplateVariables(rawSubject, application);
        String body = fillTemplateVariables(rawBody, application);

        createAndSendEmailLog(application, subject, body);
        log.info("Đã đưa email tùy chỉnh vào hàng đợi");
    }

    @Transactional(readOnly = true)
    public List<EmailLogResponse> getAllEmailLogs() {
        return emailLogRepository.findAllByOrderBySentAtDesc()
                .stream()
                .map(emailLogMapper::toResponse) 
                .collect(Collectors.toList());
    }

    private void createAndSendEmailLog(Application application, String subject, String body) {
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

    private EmailTemplate getTemplateByName(String templateName) { 
        return emailTemplateRepository.findByTemplateName(templateName)
                .orElseThrow(() -> new ResourceNotFoundException("Template not found: " + templateName));
    }
    
    private String fillTemplateVariables(String rawText, Application application) { 
        if (rawText == null) return "";
        return rawText.replace("[CandidateName]", application.getCV().getCandidateName())
                .replace("[JobTitle]", application.getJobPosting().getTitle());
    }
}