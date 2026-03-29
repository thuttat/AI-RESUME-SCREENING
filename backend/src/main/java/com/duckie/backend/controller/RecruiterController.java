package com.duckie.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.duckie.backend.dto.AIAnalysisResponse;
import com.duckie.backend.dto.ApplicationResponse;
import com.duckie.backend.entity.AIAnalysisResult;
import com.duckie.backend.entity.Application;
import com.duckie.backend.service.CVProcessingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/recruiter")
@RequiredArgsConstructor
public class RecruiterController {
    
    private final CVProcessingService cvProcessingService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadBulkCVs(
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam("jobId") Long jobId
            ) {
        try {
            if (files.isEmpty()) {
                return ResponseEntity.badRequest().body("Choose at least 1 cv!");
            }
            
            List<Application> applications = cvProcessingService.uploadBulkCVs(jobId, files);

            List<ApplicationResponse> responseList = applications.stream().map(app ->
                    new ApplicationResponse(
                            app.getId(),
                            app.getJobPosting().getId(),
                            app.getJobPosting().getTitle(),
                            app.getCV().getCandidateName(),
                            app.getCV().getCandidateEmail(),
                            app.getCV().getCvFileUrl(),
                            app.getStatus().name()
                    )
            ).toList();

            return ResponseEntity.ok(responseList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/parse/{applicationId}")
    public ResponseEntity<?> parseCV(@PathVariable Long applicationId) {
        try {
            AIAnalysisResult result = cvProcessingService.parseCVWithAI(applicationId);
            AIAnalysisResponse cleanResponse = new AIAnalysisResponse(
                    result.getId(),
                    result.getCv().getCandidateName(),
                    result.getCv().getCandidateEmail(),
                    result.getMatchScore(),
                    result.getExtractedSkills(),
                    result.getYearsOfExperience()
            );

            return ResponseEntity.ok(cleanResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}