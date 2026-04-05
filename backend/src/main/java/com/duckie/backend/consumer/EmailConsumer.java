package com.duckie.backend.consumer;

import com.duckie.backend.config.RabbitMQConfig;
import com.duckie.backend.entity.EmailLog;
import com.duckie.backend.entity.EmailStatus;
import com.duckie.backend.repository.EmailLogRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Component
@RequiredArgsConstructor
public class EmailConsumer {

    private static final Logger log = LoggerFactory.getLogger(EmailConsumer.class);
    
    private final JavaMailSender mailSender;
    private final EmailLogRepository emailLogRepository;

    @RabbitListener(queues = RabbitMQConfig.EMAIL_QUEUE)
    @Transactional
    public void processEmail(Long emailLogId) {
        log.info("Consumer đang lấy Bill từ Queue... ID: {}", emailLogId);

        EmailLog emailLog = emailLogRepository.findById(emailLogId).orElse(null);
        if (emailLog == null) return; 

        String toEmail = emailLog.getApplication().getCV().getCandidateEmail();

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject(emailLog.getSubject());
            message.setText(emailLog.getBody());
            
            mailSender.send(message); 

            emailLog.setStatus(EmailStatus.SENT);
            emailLog.setSentAt(Instant.now());
            emailLogRepository.save(emailLog);
            
            log.info("Gửi email thành công tới: {}", toEmail);

        } catch (Exception e) {
            log.error("Lỗi khi gửi mail thật tới {}", toEmail, e);
            emailLog.setStatus(EmailStatus.FAILED);
            emailLogRepository.save(emailLog);
        }
    }
}