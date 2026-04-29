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
import com.duckie.backend.entity.Evaluation;
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
import com.duckie.backend.repository.EvaluationRepository;
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
    private final EvaluationRepository evaluationRepository;
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
                        .description("Participate in developing the AI Resume Screening system version " + i)
                        .requiredSkills("Java, Spring Boot, PostgreSQL")
                        .status(JobStatus.OPEN)
                        .createdBy(recruiter1)
                        .build();
                jobPostingRepository.save(job);
                if (i == 1) primaryJob = job;
            }

            JobPosting frontendJob = JobPosting.builder()
                    .title("Senior React Developer")
                    .description("Build the Dashboard interface for the AI system")
                    .requiredSkills("React, Tailwind CSS, TypeScript")
                    .status(JobStatus.OPEN)
                    .createdBy(recruiter2)
                    .build();
            jobPostingRepository.save(frontendJob);

            JobPosting aiJob = JobPosting.builder()
                    .title("Python AI Engineer")
                    .description("Research and implement NLP models for CV analysis")
                    .requiredSkills("Python, PyTorch, LangChain")
                    .status(JobStatus.OPEN)
                    .createdBy(recruiter2)
                    .build();
            jobPostingRepository.save(aiJob);

            Instant now = Instant.now();
            Application app1 = createMockCVAndApp("Nguyen Van A", 92.5, now, recruiter1, primaryJob, Status.SHORTLIST);
            createMockCVAndApp("Tran Thi B", 70.0, now.minus(5, ChronoUnit.DAYS), recruiter1, primaryJob, Status.PENDING);
            createMockCVAndApp("Le Van C", 95.0, now.minus(10, ChronoUnit.DAYS), recruiter1, primaryJob, Status.HIRED);
            createMockCVAndApp("Hoang Thi D", 45.0, now.minus(2, ChronoUnit.DAYS), recruiter1, primaryJob, Status.REJECT);
            createMockCVAndApp("Hoang Frontend", 92.0, now, recruiter2, frontendJob, Status.REJECT);
            createMockCVAndApp("Hoang AI", 88.0, now, recruiter2, aiJob, Status.REVIEWING);

            Instant march = now.minus(30, ChronoUnit.DAYS);
            createMockCVAndApp("Candidate March 1", 78.0, march, recruiter1, primaryJob, Status.REJECT);
            createMockCVAndApp("Candidate March 2", 82.5, march.minus(5, ChronoUnit.DAYS), recruiter1, frontendJob, Status.SHORTLIST);
            createMockCVAndApp("Candidate March 3", 88.0, march.minus(10, ChronoUnit.DAYS), recruiter2, aiJob, Status.ACCEPTED);
            createMockCVAndApp("Candidate March 4", 55.0, march.minus(15, ChronoUnit.DAYS), recruiter2, primaryJob, Status.REVIEWING);

            if(app1 != null) {
                Evaluation eval = Evaluation.builder()
                        .application(app1)
                        .evaluator(manager)
                        .rating(4)
                        .feedback("Very strong Spring Boot skills, good interview attitude. Standard salary offer recommended.")
                        .build();
                evaluationRepository.save(eval);
            }

            if (emailTemplateRepository.count() == 0) {
                EmailTemplate offer = EmailTemplate.builder()
                        .type("OFFER_TEMPLATE")
                        .templateName("OFFER_TEMPLATE")
                        .subject("Congratulations! Job Offer - [JobTitle]")
                        .body("Dear [CandidateName],\n\nWe are impressed with your profile and would like to offer you the position...")
                        .createdAt(Instant.now())
                        .isActive(true)
                        .build();
                emailTemplateRepository.save(offer);

                EmailTemplate reject = EmailTemplate.builder()
                        .type("REJECTION_TEMPLATE")
                        .templateName("REJECTION_TEMPLATE")
                        .subject("Application Status - [JobTitle]")
                        .body("Dear [CandidateName],\n\nThank you for your interest. Unfortunately, we have decided to proceed with other candidates...")
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
                            .description("Responsible for building the UI for the AI Screening system.")
                            .requirements("React, TypeScript, Tailwind CSS, 5+ years experience")
                            .requiredSkills("React, TypeScript, Tailwind CSS, HTML/CSS")
                            .isActive(true)
                            .build(),
                    JobTemplate.builder()
                            .title("Backend Engineer")
                            .department("Engineering")
                            .description("Design and implement high-performance APIs and integrate AI models.")
                            .requirements("Java, Spring Boot, PostgreSQL, Microservices")
                            .requiredSkills("Java, Spring Boot, PostgreSQL, Docker")
                            .isActive(true)
                            .build(),
                    JobTemplate.builder()
                            .title("UX Designer")
                            .department("Design")
                            .description("Research and design optimal user experiences for the recruitment process.")
                            .requirements("Figma, Adobe XD, Portfolio required")
                            .requiredSkills("Figma, Adobe XD, Prototyping")
                            .isActive(false)
                            .build()
            );

            jobTemplateRepository.saveAll(templates);
            System.out.println(">>> Job Templates Seeded!");
        }
    }

    private Application createMockCVAndApp(String name, Double score, Instant time, User uploadedBy, JobPosting job, Status status) {
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
                .critique("Candidate has good technical skills, fits the project requirements.")
                .build();
        aiAnalysisResultRepository.save(aiResult);

        if (job != null) {
            Application app = Application.builder()
                    .jobPosting(job)
                    .cv(cv)
                    .status(status)
                    .build();
            return applicationRepository.save(app);
        }
        return null;
    }
}