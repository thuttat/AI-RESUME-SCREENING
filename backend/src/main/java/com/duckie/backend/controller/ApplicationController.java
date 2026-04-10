package com.duckie.backend.controller;

import com.duckie.backend.dto.RankedCandidateResponse;
import com.duckie.backend.entity.AIAnalysisResult;
import com.duckie.backend.service.CVProcessingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.duckie.backend.dto.ApplicationResponse;
import com.duckie.backend.dto.ApplicationStatusRequest;
import com.duckie.backend.entity.Application;
import com.duckie.backend.service.ApplicationMapper;
import com.duckie.backend.service.ApplicationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;
    private final ApplicationMapper applicationMapper;
    private final CVProcessingService cvProcessingService;

    @GetMapping("/{applicationId:\\d+}")
    @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN')")
    public ResponseEntity<ApplicationResponse> getDetail(@PathVariable Long applicationId) {
        Application app = applicationService.getApplicationById(applicationId);
        return ResponseEntity.ok(applicationMapper.toResponse(app));
    }

    @PatchMapping("/{applicationId}/status")
    @PreAuthorize("hasAnyRole('HIRING_MANAGER', 'RECRUITER', 'ADMIN')")
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

    @PostMapping("/{applicationId}/parse")
    @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN')")
    public ResponseEntity<?> parseCV(@PathVariable Long applicationId) {
        try {
            AIAnalysisResult result = cvProcessingService.parseCVWithAI(applicationId);

            Map<String, Object> responseData = new HashMap<>();
            responseData.put("id", result.getId());
            responseData.put("matchScore", result.getMatchScore());
            responseData.put("extractedSkills", result.getExtractedSkills());
            responseData.put("yearsOfExperience", result.getYearsOfExperience());
            responseData.put("candidateName", result.getCv().getCandidateName());
            responseData.put("candidateEmail", result.getCv().getCandidateEmail());
            responseData.put("critique", result.getCritique());

            return ResponseEntity.ok(responseData);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}