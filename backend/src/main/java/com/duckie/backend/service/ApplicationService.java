package com.duckie.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.duckie.backend.dto.ApplicationResponse;
import com.duckie.backend.dto.BulkEmailRequest;
import com.duckie.backend.dto.EmailRecipientResponse;
import com.duckie.backend.dto.RankedCandidateResponse;
import com.duckie.backend.entity.Application;
import com.duckie.backend.entity.Status;
import com.duckie.backend.exception.ResourceNotFoundException;
import com.duckie.backend.mapper.ApplicationMapper;
import com.duckie.backend.repository.ApplicationRepository;
import com.duckie.backend.repository.JobPostingRepository;
import com.duckie.backend.mapper.ApplicationMapper;

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
            .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy hồ sơ ID: " + applicationId));
        
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

 
    @Transactional(readOnly = true)
    public List<EmailRecipientResponse> getEmailRecipients(Long jobId) {
        Pageable pageable = PageRequest.of(0, 1000);
        Page<Application> applications = applicationRepository.findByJobPostingIdAndStatus(jobId, null, pageable);

        return applications.stream()
                .map(app -> new EmailRecipientResponse(
                        app.getId(),
                        app.getCV() != null ? app.getCV().getCandidateName() : "N/A",
                        app.getCV() != null ? app.getCV().getCandidateEmail() : "N/A",
                        app.getStatus(),
                        app.getEmailLogs() != null && !app.getEmailLogs().isEmpty()
                ))
                .toList();
    }

    @Transactional
    public void sendBulkCustomEmails(BulkEmailRequest request) {
        for (Long appId : request.applicationIds()) {
            Application app = applicationRepository.findById(appId)
                .orElseThrow(() -> new ResourceNotFoundException("Hồ sơ ID " + appId + " không tồn tại"));
            
            emailService.sendCustomNotificationEmail(app, request.subject(), request.body());
        }
    }
}