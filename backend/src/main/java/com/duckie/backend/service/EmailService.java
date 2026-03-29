package com.duckie.backend.service;

import com.duckie.backend.exception.ResourceNotFoundException;
import com.duckie.backend.entity.Application;
import com.duckie.backend.entity.EmailTemplate;
import com.duckie.backend.entity.EmailLog;
import com.duckie.backend.entity.EmailStatus; // ĐÃ THÊM IMPORT ENUM
import com.duckie.backend.repository.EmailTemplateRepository;
import com.duckie.backend.repository.EmailLogRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class EmailService {
    
    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    
    private final JavaMailSender mailSender;
    private final EmailTemplateRepository emailTemplateRepository;
    private final EmailLogRepository emailLogRepository; 

    public void sendNotificationEmail(Application application, String templateName) {
        EmailTemplate template = getTemplateByName(templateName);

        String toEmail = application.getCV().getCandidateEmail();
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
            executeSendEmail(toEmail, subject, body);
            
            emailLog.setStatus(EmailStatus.SENT);
            emailLog.setSentAt(Instant.now());
            emailLogRepository.save(emailLog);
            
        } catch (Exception e) {
            log.error("Failed to send email to {}", toEmail, e);
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

    private void executeSendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}