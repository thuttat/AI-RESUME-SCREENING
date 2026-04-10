package com.duckie.backend.service;

import com.duckie.backend.dto.RankedCandidateResponse;
import com.duckie.backend.repository.JobPostingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.duckie.backend.entity.Application;
import com.duckie.backend.entity.Status;
import com.duckie.backend.exception.ResourceNotFoundException;
import com.duckie.backend.repository.ApplicationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationService {
    
    private final ApplicationRepository applicationRepository;
    private final EmailService emailService;
    private final JobPostingRepository jobPostingRepository;
    private final ApplicationMapper applicationMapper;

    @Transactional(readOnly = true)
    public Page<RankedCandidateResponse> getRankedApplications(Long jobId, Pageable pageable) {
        if (!jobPostingRepository.existsById(jobId)) {
            throw new ResourceNotFoundException("Job posting not found!");
        }
        Page<Application> applications = applicationRepository.findRankedApplicationByJobId(jobId, pageable);
        return applications.map(applicationMapper::toRankedResponse);
    }

    @Transactional
    public Application updateApplicationStatus(Long applicationId, Status newStatus, String note) {
        Application app = applicationRepository.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy hồ sơ ID: " + applicationId));
        
        app.setStatus(newStatus);
        Application savedApp = applicationRepository.save(app);

        if (newStatus.name().equals("HIRED")) {
            emailService.sendNotificationEmail(savedApp, "OFFER_TEMPLATE");
        } else if (newStatus.name().equals("REJECTED")) {
            emailService.sendNotificationEmail(savedApp, "REJECTION_TEMPLATE");
        }
        
        return savedApp;
    }

    public Application getApplicationById(Long applicationId) {
        return applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found!"));
    }
}