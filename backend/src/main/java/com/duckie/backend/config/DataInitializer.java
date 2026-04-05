package com.duckie.backend.config;

import com.duckie.backend.entity.EmailTemplate;
import com.duckie.backend.repository.EmailTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;

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
                    .body("Chào [CandidateName],\n\nChúng tôi rất ấn tượng với buổi phỏng vấn vừa rồi và muốn mời bạn gia nhập đội ngũ của chúng tôi cho vị trí [JobTitle].\n\nTrân trọng,\nĐội ngũ tuyển dụng.")
                    .createdAt(Instant.now())
                    .build();
            emailTemplateRepository.save(offerTemplate);
        }

        if (!emailTemplateRepository.existsByTemplateName("REJECTION_TEMPLATE")) {
            EmailTemplate rejectionTemplate = EmailTemplate.builder()
                    .templateName("REJECTION_TEMPLATE")
                    .subject("Thông báo kết quả ứng tuyển vị trí [JobTitle]")
                    .body("Chào [CandidateName],\n\nCảm ơn bạn đã quan tâm đến vị trí [JobTitle]. Sau khi xem xét kỹ lưỡng, chúng tôi rất tiếc phải thông báo rằng bạn chưa phù hợp với yêu cầu hiện tại của công ty.\n\nChúc bạn may mắn trên con đường sự nghiệp.\nTrân trọng.")
                    .createdAt(Instant.now())
                    .build();
            emailTemplateRepository.save(rejectionTemplate);
        }
        
    }
}