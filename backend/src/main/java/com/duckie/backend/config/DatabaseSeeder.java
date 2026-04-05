package com.duckie.backend.config;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.duckie.backend.entity.AIAnalysisResult;
import com.duckie.backend.entity.CV;
import com.duckie.backend.entity.JobPosting;
import com.duckie.backend.entity.JobStatus;
import com.duckie.backend.entity.Role;
import com.duckie.backend.entity.User;
import com.duckie.backend.entity.UserStatus;
import com.duckie.backend.repository.CVRepository;
import com.duckie.backend.repository.JobPostingRepository;
import com.duckie.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final JobPostingRepository jobPostingRepository;
    private final CVRepository cvRepository; 
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            System.out.println("Start Seeding Data for Dashboard Testing...");

            User admin = User.builder().username("admin_test").email("admin@duckie.com")
                    .fullname("Super Administrator").password(passwordEncoder.encode("123456"))
                    .role(Role.ADMIN).status(UserStatus.ACTIVE).build();
            userRepository.save(admin);

            User recruiter1 = User.builder().username("jonny77").email("jonny@duckie.com")
                    .fullname("John Smith").password(passwordEncoder.encode("123456"))
                    .role(Role.RECUITER).status(UserStatus.ACTIVE).build();
            userRepository.save(recruiter1);

            User recruiter2 = User.builder().username("olly659").email("olly@duckie.com")
                    .fullname("Olivia Bennett").password(passwordEncoder.encode("123456"))
                    .role(Role.RECUITER).status(UserStatus.ACTIVE).build();
            userRepository.save(recruiter2);

           
            for (int i = 1; i <= 3; i++) {
                jobPostingRepository.save(JobPosting.builder()
                        .title("Java Developer " + i)
                        .description("Mô tả công việc cho Java Developer " + i) 
                        .requiredSkills("Java, Spring Boot, SQL")               
                        .status(JobStatus.OPEN)
                        .createdBy(recruiter1)
                        .build());
            }
            for (int i = 1; i <= 2; i++) {
                jobPostingRepository.save(JobPosting.builder()
                        .title("ReactJS Developer " + i)
                        .description("Mô tả công việc cho ReactJS Developer " + i) 
                        .requiredSkills("ReactJS, Tailwind CSS, Javascript")       
                        .status(JobStatus.OPEN)
                        .createdBy(recruiter2)
                        .build());
            }


            Instant now = Instant.now();
            
            createMockCV("Nguyen Van A", null, now.minus(90, ChronoUnit.DAYS), recruiter1);
            createMockCV("Tran Thi B", null, now.minus(85, ChronoUnit.DAYS), recruiter1);
            
            
            createMockCV("Le Van C", null, now.minus(50, ChronoUnit.DAYS), recruiter2);
            createMockCV("Pham Dinh D", new AIAnalysisResult(), now.minus(45, ChronoUnit.DAYS), recruiter2);
            createMockCV("Hoang Thi E", new AIAnalysisResult(), now.minus(40, ChronoUnit.DAYS), recruiter1);

           
            createMockCV("Ngo Van F", new AIAnalysisResult(), now.minus(5, ChronoUnit.DAYS), recruiter1);
            createMockCV("Vu Thi G", new AIAnalysisResult(), now.minus(2, ChronoUnit.DAYS), recruiter2);
            createMockCV("Dang Van H", new AIAnalysisResult(), now, recruiter1);

            System.out.println("Mock Data Seeded Successfully!");
        }
    }

   
    private void createMockCV(String name, AIAnalysisResult aiResult, Instant time, User uploadedBy) {
        CV cv = CV.builder()
                .candidateName(name)
                .candidateEmail("test@email.com")
                .uploadedBy(uploadedBy)
                .createdAt(time) 
                .build();
                
       
        if (aiResult != null) {
            aiResult.setCv(cv); 
            cv.setAiAnalysisResult(aiResult);
        }
        cvRepository.save(cv);
    }
}