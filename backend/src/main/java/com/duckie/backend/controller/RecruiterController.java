package com.duckie.backend.controller;

import com.duckie.backend.dto.AIAnalysisResponse;
import com.duckie.backend.dto.ApplicationResponse;
import com.duckie.backend.model.AIAnalysisResult;
import com.duckie.backend.model.Application;
import com.duckie.backend.model.User;
import com.duckie.backend.repository.UserRepository;
import com.duckie.backend.service.CVProcessingService;
import com.duckie.backend.service.CloudinaryService;
import jakarta.mail.Multipart;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

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
            if (files.isEmpty())
                return ResponseEntity.badRequest().body("Choose at least 1 cv!");
            List<Application> applications = cvProcessingService.uploadBulkCVs(jobId, files);

            List<ApplicationResponse> responseList = applications.stream().map(app ->
                    new ApplicationResponse(
                            app.getID(),
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
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
