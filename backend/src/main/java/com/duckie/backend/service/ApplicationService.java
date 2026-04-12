package com.duckie.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.duckie.backend.dto.ApplicationResponse;
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
    private final ApplicationMapper applicationMapper; 
    
    @Transactional(readOnly = true)
    public Page<ApplicationResponse> getRankedApplications(Long jobId, Pageable pageable) {
        return applicationRepository.findRankedApplicationByJobId(jobId, pageable)
                .map(applicationMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public Page<ApplicationResponse> getApplicationsByJobIdAndStatus(Long jobId, Status status, Pageable pageable) {
        Page<Application> applications;
        if (jobId == null) {
            if (status != null) {
                applications = applicationRepository.findByJobPostingIdAndStatus(null, status, pageable);
            } else {
                applications = applicationRepository.findAll(pageable); 
            }
        } else {
            if (status != null) {
                applications = applicationRepository.findByJobPostingIdAndStatus(jobId, status, pageable);
            } else {
                applications = applicationRepository.findByJobPostingId(jobId, pageable);
            }
        }
        
        return applications.map(applicationMapper::toResponse);
    }
    @Transactional
    public ApplicationResponse updateApplicationStatus(Long applicationId, Status newStatus, String note) {
        Application app = applicationRepository.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy hồ sơ ID: " + applicationId));
        
        app.setStatus(newStatus);
        Application savedApp = applicationRepository.save(app);

        if (newStatus == Status.HIRED) {
            emailService.sendNotificationEmail(savedApp, "OFFER_TEMPLATE");
        } else if (newStatus == Status.REJECT) { 
            emailService.sendNotificationEmail(savedApp, "REJECTION_TEMPLATE");
        }
        
        return applicationMapper.toResponse(savedApp);
    }

    @Transactional(readOnly = true)
    public ApplicationResponse getApplicationById(Long applicationId) {
        Application app = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found!"));
        return applicationMapper.toResponse(app);
    }
}