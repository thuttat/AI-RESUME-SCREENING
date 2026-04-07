package com.duckie.backend.config;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.duckie.backend.entity.AIAnalysisResult;
import com.duckie.backend.entity.Application;
import com.duckie.backend.entity.CV;
import com.duckie.backend.entity.EmailTemplate;
import com.duckie.backend.entity.JobPosting;
import com.duckie.backend.entity.JobStatus;
import com.duckie.backend.entity.Role;
import com.duckie.backend.entity.Status;
import com.duckie.backend.entity.User;
import com.duckie.backend.entity.UserStatus;
import com.duckie.backend.repository.AIAnalysisResultRepository;
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
    private final AIAnalysisResultRepository aiAnalysisResultRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            System.out.println(">>> Start Unified Seeding for Dashboard & AI Testing...");

            User admin = User.builder()
                    .username("admin_test")
                    .email("admin@duckie.com")
                    .fullname("Super Administrator")
                    .password(passwordEncoder.encode("123456"))
                    .role(Role.ADMIN)
                    .status(UserStatus.ACTIVE)
                    .build();
            userRepository.save(admin);

            User recruiter1 = User.builder()
                    .username("recruiter_test")
                    .email("hr@duckie.com")
                    .fullname("John Smith")
                    .password(passwordEncoder.encode("123456"))
                    .role(Role.RECRUITER)
                    .status(UserStatus.ACTIVE)
                    .build();
            userRepository.save(recruiter1);

            User manager = User.builder()
                    .username("manager_test")
                    .email("manager@duckie.com")
                    .fullname("Hiring Manager")
                    .password(passwordEncoder.encode("123456"))
                    .role(Role.HIRING_MANAGER)
                    .status(UserStatus.ACTIVE)
                    .build();
            userRepository.save(manager);

            JobPosting primaryJob = null;
            for (int i = 1; i <= 3; i++) {
                JobPosting job = JobPosting.builder()
                        .title("Java Developer " + i)
                        .description("Tham gia phát triển hệ thống AI Resume Screening phiên bản " + i)
                        .requiredSkills("Java, Spring Boot, PostgreSQL")
                        .status(JobStatus.OPEN)
                        .createdBy(recruiter1)
                        .build();
                jobPostingRepository.save(job);
                if (i == 1) primaryJob = job;
            }

            Instant now = Instant.now();
            
            createMockCVAndApp("Nguyen Van A", 85.5, now, recruiter1, primaryJob, Status.PENDING);
            createMockCVAndApp("Tran Thi B", 70.0, now.minus(5, ChronoUnit.DAYS), recruiter1, primaryJob, Status.PENDING);
            createMockCVAndApp("Le Van C", 65.0, now.minus(10, ChronoUnit.DAYS), recruiter1, primaryJob, Status.PENDING);

            if (emailTemplateRepository.count() == 0) {
                EmailTemplate offer = EmailTemplate.builder()
                        .templateName("OFFER_TEMPLATE")
                        .subject("Chúc mừng! Thư mời làm việc - [JobTitle]")
                        .body("Chào [CandidateName],\n\nChúng tôi rất ấn tượng với hồ sơ của bạn...")
                        .createdAt(Instant.now())
                        .isActive(true) 
                        .build();
                emailTemplateRepository.save(offer);

                EmailTemplate reject = EmailTemplate.builder()
                        .templateName("REJECTION_TEMPLATE")
                        .subject("Kết quả ứng tuyển - [JobTitle]")
                        .body("Chào [CandidateName],\n\nRất tiếc bạn chưa phù hợp...")
                        .createdAt(Instant.now())
                        .isActive(true) 
                        .build();
                emailTemplateRepository.save(reject);
                System.out.println(">>> Email Templates Seeded!");
            }

            System.out.println(">>> All Systems Go! Seeding Completed Successfully!");
        }
    }

    private void createMockCVAndApp(String name, Double score, Instant time, User uploadedBy, JobPosting job, Status status) {
        CV cv = CV.builder()
                .candidateName(name)
                .candidateEmail(name.toLowerCase().replace(" ", "") + "@gmail.com")
                .cvFileUrl("https://duckie.com/cv/" + name.replace(" ", "") + ".pdf")
                .uploadedBy(uploadedBy)
                .createdAt(time)
                .build();
        cvRepository.save(cv);

        AIAnalysisResult aiResult = AIAnalysisResult.builder()
                .cv(cv)
                .matchScore(score)
                .extractedSkills("Java, Spring Boot, SQL")
                .yearsOfExperience(3.5) 
                .critique("Ứng viên có kỹ năng tốt, phù hợp với yêu cầu dự án.")
                .build();
        aiAnalysisResultRepository.save(aiResult);
        if (job != null) {
            Application app = Application.builder()
                    .jobPosting(job)
                    .cv(cv)
                    .status(status)
                    .build();
            applicationRepository.save(app);
        }
    }
}