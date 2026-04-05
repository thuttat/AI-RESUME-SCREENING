package com.duckie.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.duckie.backend.dto.ApplicationResponse;
import com.duckie.backend.dto.ApplicationStatusRequest;
import com.duckie.backend.entity.Application;
import com.duckie.backend.service.ApplicationMapper;
import com.duckie.backend.service.ApplicationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;
    private final ApplicationMapper applicationMapper;

    @GetMapping("/{applicationId:\\d+}")
    @PreAuthorize("hasAnyRole('RECUITER', 'ADMIN')")
    public ResponseEntity<ApplicationResponse> getDetail(@PathVariable Long applicationId) {
        Application app = applicationService.getApplicationById(applicationId);
        return ResponseEntity.ok(applicationMapper.toResponse(app));
    }

    @PatchMapping("/{applicationId}/status")
    @PreAuthorize("hasAnyRole('HIRING_MANAGER', 'RECUITER', 'ADMIN')")
    public ResponseEntity<ApplicationResponse> updateStatus(
            @PathVariable Long applicationId, 
            @Valid @RequestBody ApplicationStatusRequest request) {
        
        Application updated = applicationService.updateApplicationStatus(
            applicationId, 
            request.status(), 
            request.note()
        );
        
        return ResponseEntity.ok(applicationMapper.toResponse(updated));
    }
}