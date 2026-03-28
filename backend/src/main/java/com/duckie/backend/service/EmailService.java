package com.duckie.backend.service;

import com.duckie.backend.exception.ResourceNotFoundException;
import com.duckie.backend.model.Application;
import com.duckie.backend.model.EmailTemplate;
import com.duckie.backend.repository.EmailTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final EmailTemplateRepository emailTemplateRepository;

    public void sendNotificationEmail(Application application, String templateName) {
        EmailTemplate template = getTemplateByName(templateName);

        String toEmail = application.getCV().getCandidateEmail();
        String subject = fillTemplateVariables(template.getSubject(), application);
        String body = fillTemplateVariables(template.getBody(), application);

        executeSendEmail(toEmail, subject, body);
    }

    private EmailTemplate getTemplateByName(String templateName) {
        return emailTemplateRepository.findByTemplateName(templateName)
                .orElseThrow(() -> new ResourceNotFoundException("Template not found!"));
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
