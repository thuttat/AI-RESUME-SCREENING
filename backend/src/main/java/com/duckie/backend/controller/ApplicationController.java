package com.duckie.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.duckie.backend.dto.ApplicationResponse;
import com.duckie.backend.dto.ApplicationStatusRequest;
import com.duckie.backend.entity.Status;
import com.duckie.backend.service.ApplicationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;
    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasAnyRole('HIRING_MANAGER', 'RECRUITER', 'ADMIN')")
    public ResponseEntity<Page<ApplicationResponse>> getApplicationsByJob(
            @PathVariable Long jobId,
            @RequestParam(required = false) Status status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<ApplicationResponse> response = applicationService.getApplicationsByJobIdAndStatus(jobId, status, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{applicationId:\\d+}")
    @PreAuthorize("hasAnyRole('HIRING_MANAGER', 'RECRUITER', 'ADMIN')")
    public ResponseEntity<ApplicationResponse> getDetail(@PathVariable Long applicationId) {
        return ResponseEntity.ok(applicationService.getApplicationById(applicationId));
    }

    @PatchMapping("/{applicationId}/status")
    @PreAuthorize("hasAnyRole('HIRING_MANAGER', 'RECRUITER', 'ADMIN')")
    public ResponseEntity<ApplicationResponse> updateStatus(
            @PathVariable Long applicationId, 
            @Valid @RequestBody ApplicationStatusRequest request) {
        
        return ResponseEntity.ok(
            applicationService.updateApplicationStatus(applicationId, request.status(), request.note())
        );
    }
    @GetMapping
    @PreAuthorize("hasAnyRole('HIRING_MANAGER', 'RECRUITER', 'ADMIN')")
    public ResponseEntity<Page<ApplicationResponse>> getAllApplications(
            @RequestParam(required = false) Status status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ApplicationResponse> response = applicationService.getApplicationsByJobIdAndStatus(null, status, pageable);
        return ResponseEntity.ok(response);
    }
}