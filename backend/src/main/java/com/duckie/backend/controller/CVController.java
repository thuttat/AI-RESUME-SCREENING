package com.duckie.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.duckie.backend.dto.ApplicationResponse;
import com.duckie.backend.entity.Application;
import com.duckie.backend.mapper.ApplicationMapper;
import com.duckie.backend.service.CVProcessingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cvs")
@RequiredArgsConstructor
public class CVController {
    
    private final CVProcessingService cvProcessingService;
    private final ApplicationMapper applicationMapper;

    @PostMapping("/upload")
    @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN')")
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
}