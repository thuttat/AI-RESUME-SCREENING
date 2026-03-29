package com.duckie.backend.service;

import com.duckie.backend.exception.ResourceNotFoundException;
import com.duckie.backend.entity.Application;
import com.duckie.backend.entity.Status;
import com.duckie.backend.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ApplicationService {
    
    private final ApplicationRepository applicationRepository;
    
    public Page<Application> getRankedApplications(Long jobId, Pageable pageable) {
        return applicationRepository.findRankedApplicationByJobId(jobId, pageable);
    }

    @Transactional
    public Application updateApplicationStatus(Long applicationId, Status newStatus) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found!"));

        application.setStatus(newStatus);
        return applicationRepository.save(application);
    }
}