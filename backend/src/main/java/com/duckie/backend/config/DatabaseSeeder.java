package com.duckie.backend.config;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.duckie.backend.entity.AIAnalysisResult;
import com.duckie.backend.entity.Application;
import com.duckie.backend.entity.CV;
import com.duckie.backend.entity.EmailTemplate;
import com.duckie.backend.entity.JobPosting;
import com.duckie.backend.entity.JobStatus;
import com.duckie.backend.entity.JobTemplate;
import com.duckie.backend.entity.Role;
import com.duckie.backend.entity.Status;
import com.duckie.backend.entity.User;
import com.duckie.backend.entity.UserStatus;
import com.duckie.backend.repository.AIAnalysisResultRepository;
import com.duckie.backend.repository.ApplicationRepository;
import com.duckie.backend.repository.CVRepository;
import com.duckie.backend.repository.EmailTemplateRepository;
import com.duckie.backend.repository.JobPostingRepository;
import com.duckie.backend.repository.JobTemplateRepository;
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
    private final JobTemplateRepository jobTemplateRepository;
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

            User recruiter2 = User.builder()
                    .username("recruiter_2")
                    .email("rec2@duckie.com")
                    .fullname("Sarah Connor")
                    .password(passwordEncoder.encode("123456"))
                    .role(Role.RECRUITER)
                    .status(UserStatus.ACTIVE)
                    .build();
            userRepository.save(recruiter2);

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
            
            //Job cua recruiter 2
            JobPosting frontendJob = JobPosting.builder()
                    .title("Senior React Developer")
                    .description("Xây dựng giao diện Dashboard cho hệ thống AI")
                    .requiredSkills("React, Tailwind CSS, TypeScript")
                    .status(JobStatus.OPEN)
                    .createdBy(recruiter2)
                    .build();
            jobPostingRepository.save(frontendJob);
            JobPosting aiJob = JobPosting.builder()
                    .title("Python AI Engineer")
                    .description("Nghiên cứu và triển khai các model NLP cho phân tích CV")
                    .requiredSkills("Python, PyTorch, LangChain")
                    .status(JobStatus.OPEN)
                    .createdBy(recruiter2)
                    .build();
            jobPostingRepository.save(aiJob);

            //Month now: 4
            Instant now = Instant.now();
            createMockCVAndApp("Nguyen Van A", 85.5, now, recruiter1, primaryJob, Status.PENDING);
            createMockCVAndApp("Tran Thi B", 70.0, now.minus(5, ChronoUnit.DAYS), recruiter1, primaryJob, Status.PENDING);
            createMockCVAndApp("Le Van C", 65.0, now.minus(10, ChronoUnit.DAYS), recruiter1, primaryJob, Status.PENDING);
            createMockCVAndApp("Hoang Frontend", 92.0, now, recruiter2, frontendJob, Status.REJECT);
            createMockCVAndApp("Hoang AI", 88.0, now, recruiter2, aiJob, Status.REVIEWING);

            // --- M3
            Instant march = now.minus(30, ChronoUnit.DAYS);
            createMockCVAndApp("Candidate March 1", 78.0, march, recruiter1, primaryJob, Status.REJECT);
            createMockCVAndApp("Candidate March 2", 82.5, march.minus(5, ChronoUnit.DAYS), recruiter1, frontendJob, Status.SHORTLIST);
            createMockCVAndApp("Candidate March 3", 88.0, march.minus(10, ChronoUnit.DAYS), recruiter2, aiJob, Status.ACCEPTED);
            createMockCVAndApp("Candidate March 4", 55.0, march.minus(15, ChronoUnit.DAYS), recruiter2, primaryJob, Status.REVIEWING);

            // --- M2
            Instant feb = now.minus(60, ChronoUnit.DAYS);
            createMockCVAndApp("Candidate Feb 1", 91.0, feb, recruiter1, primaryJob, Status.ACCEPTED);
            createMockCVAndApp("Candidate Feb 2", 45.0, feb.minus(10, ChronoUnit.DAYS), recruiter2, aiJob, Status.REJECT);
            createMockCVAndApp("Candidate Feb 3", 66.5, feb.minus(20, ChronoUnit.DAYS), recruiter1, frontendJob, Status.PENDING);

            // --- M1
            Instant jan = now.minus(90, ChronoUnit.DAYS);
            createMockCVAndApp("Candidate Jan 1", 80.0, jan, recruiter2, aiJob, Status.ACCEPTED);
            createMockCVAndApp("Candidate Jan 2", 72.0, jan.minus(15, ChronoUnit.DAYS), recruiter1, primaryJob, Status.SHORTLIST);

            if (emailTemplateRepository.count() == 0) {
                EmailTemplate offer = EmailTemplate.builder()
                        .type("Offer")
                        .subject("Chúc mừng! Thư mời làm việc - [JobTitle]")
                        .body("Chào [CandidateName],\n\nChúng tôi rất ấn tượng với hồ sơ của bạn...")
                        .createdAt(Instant.now())
                        .isActive(true) 
                        .build();
                emailTemplateRepository.save(offer);

                EmailTemplate reject = EmailTemplate.builder()
                        .type("Reject")
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
        
        if (jobTemplateRepository.count() == 0) {
            System.out.println(">>> Seeding Job Templates...");
            
            List<JobTemplate> templates = List.of(
                JobTemplate.builder()
                    .title("Senior Frontend Developer")
                    .department("Engineering")
                    .description("Chịu trách nhiệm xây dựng giao diện người dùng cho hệ thống AI Screening.")
                    .requirements("React, TypeScript, Tailwind CSS, 5+ years experience")
                    .isActive(true)
                    .build(),
                JobTemplate.builder()
                    .title("Backend Engineer")
                    .department("Engineering")
                    .description("Thiết kế và triển khai các API hiệu suất cao và tích hợp mô hình AI.")
                    .requirements("Java, Spring Boot, PostgreSQL, Microservices")
                    .isActive(true)
                    .build(),
                JobTemplate.builder()
                    .title("UX Designer")
                    .department("Design")
                    .description("Nghiên cứu và thiết kế trải nghiệm người dùng tối ưu cho quy trình tuyển dụng.")
                    .requirements("Figma, Adobe XD, Portfolio required")
                    .isActive(false) 
                    .build()
            );
            
            jobTemplateRepository.saveAll(templates);
            System.out.println(">>> Job Templates Seeded!");
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