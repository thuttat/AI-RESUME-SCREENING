package com.duckie.backend.config;

import com.duckie.backend.model.*;
import com.duckie.backend.repository.JobPostingRepository;
import com.duckie.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final JobPostingRepository jobPostingRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            System.out.println("Start Seeding Data...");

            User recruiter = User.builder()
                    .username("recruiter_test")
                    .email("hr@duckie.com")
                    .password(passwordEncoder.encode("123456"))
                    .role(Role.RECUITER)
                    .status(UserStatus.ACTIVE)
                    .build();

            userRepository.save(recruiter);
            System.out.println("Successfully seed");

            JobPosting job = JobPosting.builder()
                    .title("Senior Java Spring Boot Developer")
                    .description("Tham gia phát triển hệ thống AI Resume Screening...")
                    .requiredSkills("Java, Spring Boot, PostgreSQL, React, REST API")
                    .status(JobStatus.OPEN)
                    .createdBy(recruiter)
                    .build();

            jobPostingRepository.save(job);
            System.out.println("ID: " + job.getId() + ") - " + job.getTitle());

            System.out.println("Done!");
        }
    }
}