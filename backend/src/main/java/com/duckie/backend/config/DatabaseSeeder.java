package com.duckie.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.duckie.backend.entity.AIAnalysisResult;
import com.duckie.backend.entity.Application;
import com.duckie.backend.entity.CV;
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
    private final PasswordEncoder passwordEncoder;
    // Thêm Repo này để seed dữ liệu AI của Trân
    private final AIAnalysisResultRepository aiAnalysisResultRepository; 

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            System.out.println(">>> Start Seeding Unified Data for Testing...");

            User admin = User.builder()
                    .username("admin_test")
                    .email("admin@duckie.com")
                    .fullname("System Administrator")
                    .password(passwordEncoder.encode("123456"))
                    .role(Role.ADMIN)
                    .status(UserStatus.ACTIVE)
                    .build();
            userRepository.save(admin);

            User recruiter = User.builder()
                    .username("recruiter_test")
                    .email("hr@duckie.com")
                    .fullname("System Recruiter")
                    .password(passwordEncoder.encode("123456"))
                    .role(Role.RECRUITER) 
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

            AIAnalysisResult aiResult = AIAnalysisResult.builder()
                    .cv(candidateCv)
                    .matchScore(85.5)
                    .extractedSkills("Java, Spring Boot, REST API")
                    .yearsOfExperience(5.0)
                    .critique("Ứng viên rất mạnh về Backend, phù hợp với team.")
                    .build();
            aiAnalysisResultRepository.save(aiResult);

            if (emailTemplateRepository.count() == 0) {
                System.out.println(">>> Email Templates Seeded!");
            }
            
            System.out.println(">>> All Systems Go! Seeding Completed Successfully!");
        }
    }
}