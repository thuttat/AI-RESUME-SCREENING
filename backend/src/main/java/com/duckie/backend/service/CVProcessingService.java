package com.duckie.backend.service;

import com.duckie.backend.exception.DuplicateResourceException;
import com.duckie.backend.exception.ResourceNotFoundException;
import com.duckie.backend.model.*;
import com.duckie.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CVProcessingService {
    private final CVRepository cvRepository;
    private final JobPostingRepository jobPostingRepository;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;
    private final AIService aiService;
    private final CloudinaryService cloudinaryService;

    @Transactional
    public List<Application> uploadBulkCVs(Long jobId, List<MultipartFile> files) {
        JobPosting jobPosting = getJobPostingById(jobId);
        User recruiter = getRecruiter();

        List<Application> savedApplications = new ArrayList<>();

        for (MultipartFile file: files) {
            try {
                String fileUrl = cloudinaryService.uploadFile(file);
                CV cv = CV.builder()
                        .uploadedBy(recruiter)
                        .cvFileUrl(fileUrl)
                        .candidateName("Waiting for update...")
                        .candidateEmail("Waiting for update...")
                        .build();
                cv = cvRepository.save(cv);

                Application application = createNewApplication(jobPosting, cv);
                savedApplications.add(application);
            } catch (Exception e) {
                throw new RuntimeException("Execution error" + e);
            }
        }
        return savedApplications;
    }

    @Transactional
    public AIAnalysisResult parseCVWithAI(Long applicationId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found!"));

        CV cv = application.getCV();
        JobPosting jobPosting = application.getJobPosting();

        String extractedText = "Kinh nghiệm 3 năm Java Spring Boot, ReactJS. Từng làm hệ thống e-commerce...";
        String extractedNameFromAI = "Ho Ngoc Ha";
        String extractedEmailFromAI = "hngocha@gmail.com";

        boolean isDuplicate = checkDuplicateApplication(extractedEmailFromAI, jobPosting.getId(), cv.getID());

        if (isDuplicate) {
            applicationRepository.delete(application);
            cvRepository.delete(cv);
            throw new DuplicateResourceException(extractedEmailFromAI + " already applied for this job!");
        }

        cv.setCandidateName(extractedNameFromAI);
        cv.setCandidateEmail(extractedEmailFromAI);
        cvRepository.save(cv);

        return aiService.analysisResult(cv, jobPosting, extractedText);
    }

    private JobPosting getJobPostingById(Long jobId) {
        return jobPostingRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job Posting not found!"));
    }

    private User getRecruiter() {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found!"));
    }

    private CV saveNewCV(User recruiter, String name, String email, String fileUrl) {
        CV cv = CV.builder()
                .uploadedBy(recruiter)
                .candidateName(name)
                .candidateEmail(email)
                .cvFileUrl(fileUrl)
                .build();
        return cvRepository.save(cv);
    }

    private Application createNewApplication(JobPosting jobPosting, CV cv) {
        Application application = Application.builder()
                .jobPosting(jobPosting)
                .cv(cv)
                .status(Status.PENDING)
                .build();
        return applicationRepository.save(application);
    }

    private boolean checkDuplicateApplication(String email, Long jobId, Long currentCvId) {
        return applicationRepository.existsDuplicateByEmailForJob(email, jobId, currentCvId);
    }
}
