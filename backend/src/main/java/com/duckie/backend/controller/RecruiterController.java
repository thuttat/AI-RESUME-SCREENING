package com.duckie.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.duckie.backend.dto.ApplicationResponse;
import com.duckie.backend.entity.AIAnalysisResult;
import com.duckie.backend.entity.Application;
import com.duckie.backend.repository.AIAnalysisResultRepository;
import com.duckie.backend.repository.ApplicationRepository;
import com.duckie.backend.repository.JobPostingRepository;
import com.duckie.backend.service.ApplicationMapper;
import com.duckie.backend.service.CVProcessingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/recruiter")
@RequiredArgsConstructor
public class RecruiterController {
    
    private final CVProcessingService cvProcessingService;
    private final ApplicationMapper applicationMapper; 
    private final ApplicationRepository applicationRepository; 
    private final JobPostingRepository jobPostingRepository;
    private final AIAnalysisResultRepository aiAnalysisResultRepository;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadBulkCVs(
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam("jobId") Long jobId) {
        if (files == null || files.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Select at least 1 cv!"));
        }

        try {
            List<Application> applications = cvProcessingService.uploadBulkCVs(jobId, files);

            List<ApplicationResponse> responseList = applications.stream()
                    .map(applicationMapper::toResponse)
                    .toList();

            return ResponseEntity.ok(responseList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/parse/{applicationId}")
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