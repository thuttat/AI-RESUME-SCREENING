package com.duckie.backend.config;

import java.time.Instant;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.duckie.backend.entity.Application;
import com.duckie.backend.entity.CV;
import com.duckie.backend.entity.EmailTemplate;
import com.duckie.backend.entity.JobPosting;
import com.duckie.backend.entity.JobStatus;
import com.duckie.backend.entity.Role;
import com.duckie.backend.entity.Status;
import com.duckie.backend.entity.User;
import com.duckie.backend.entity.UserStatus;
import com.duckie.backend.repository.ApplicationRepository;
import com.duckie.backend.repository.CVRepository;
import com.duckie.backend.repository.EmailTemplateRepository;
import com.duckie.backend.repository.JobPostingRepository;
import com.duckie.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final JobPostingRepository jobPostingRepository;
    private final CVRepository cvRepository;
    private final ApplicationRepository applicationRepository;
    private final EmailTemplateRepository emailTemplateRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            System.out.println(">>> Start Seeding Full Data for Testing...");

            User recruiter = User.builder()
                    .username("recruiter_test")
                    .email("hr@duckie.com")
                    .fullname("System Recruiter")
                    .password(passwordEncoder.encode("123456"))
                    .role(Role.RECUITER)
                    .status(UserStatus.ACTIVE)
                    .build();
            userRepository.save(recruiter);

            User manager = User.builder()
                    .username("manager_test")
                    .email("manager@duckie.com")
                    .fullname("Hiring Manager")
                    .password(passwordEncoder.encode("123456"))
                    .role(Role.HIRING_MANAGER)
                    .status(UserStatus.ACTIVE)
                    .build();
            userRepository.save(manager);

            JobPosting job = JobPosting.builder()
                    .title("Senior Java Spring Boot Developer")
                    .description("Tham gia phát triển hệ thống AI Resume Screening...")
                    .requiredSkills("Java, Spring Boot, PostgreSQL, React, REST API")
                    .status(JobStatus.OPEN)
                    .createdBy(recruiter)
                    .build();
            jobPostingRepository.save(job);

            CV candidateCv = CV.builder()
                    .candidateName("Nguyen Van A")
                    .candidateEmail("vana@gmail.com")
                    .cvFileUrl("https://duckie.com/cv/vana.pdf")
                    .uploadedBy(recruiter)
                    .build();
            cvRepository.save(candidateCv);

            Application app = Application.builder()
                    .jobPosting(job)
                    .cv(candidateCv)
                    .status(Status.PENDING) 
                    .build();
            applicationRepository.save(app);

            if (emailTemplateRepository.count() == 0) {
                EmailTemplate offer = EmailTemplate.builder()
                        .templateName("OFFER_TEMPLATE")
                        .subject("Chúc mừng! Thư mời làm việc - [JobTitle]")
                        .body("Chào [CandidateName],\n\nChúng tôi mời bạn làm [JobTitle].\n\nTrân trọng.")
                        .createdAt(Instant.now())
                        .build();
                emailTemplateRepository.save(offer);

                EmailTemplate reject = EmailTemplate.builder()
                        .templateName("REJECTION_TEMPLATE")
                        .subject("Kết quả ứng tuyển - [JobTitle]")
                        .body("Chào [CandidateName],\n\nRất tiếc bạn chưa phù hợp với vị trí [JobTitle].\n\nChúc may mắn.")
                        .createdAt(Instant.now())
                        .build();
                emailTemplateRepository.save(reject);
            }
            
            System.out.println(">>> Seeding Completed Successfully!");
        }
    }
}