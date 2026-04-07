package com.duckie.backend.config;

import java.time.Instant;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.duckie.backend.entity.EmailTemplate;
import com.duckie.backend.repository.EmailTemplateRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final EmailTemplateRepository emailTemplateRepository;

    @Override
    public void run(String... args) throws Exception {
        if (!emailTemplateRepository.existsByTemplateName("OFFER_TEMPLATE")) {
            EmailTemplate offerTemplate = EmailTemplate.builder()
                    .templateName("OFFER_TEMPLATE")
                    .subject("Chúc mừng! Thư mời làm việc cho vị trí [JobTitle]")
                    .body("Chào [CandidateName],\n\nChúng tôi rất ấn tượng...")
                    .createdAt(Instant.now())
                    .isActive(true) 
                    .build();
            emailTemplateRepository.save(offerTemplate);
        }

        if (!emailTemplateRepository.existsByTemplateName("REJECTION_TEMPLATE")) {
            EmailTemplate rejectionTemplate = EmailTemplate.builder()
                    .templateName("REJECTION_TEMPLATE")
                    .subject("Thông báo kết quả ứng tuyển vị trí [JobTitle]")
                    .body("Chào [CandidateName],\n\nRất tiếc...")
                    .createdAt(Instant.now())
                    .isActive(true) 
                    .build();
            emailTemplateRepository.save(rejectionTemplate);
        }
    }
}