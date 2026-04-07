package com.duckie.backend.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map; 

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; 
import org.springframework.web.bind.annotation.*;

import com.duckie.backend.dto.JobPostingRequest;
import com.duckie.backend.dto.JobPostingResponse;
import com.duckie.backend.service.JobPostingService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobPostingController {

    private final JobPostingService jobPostingService;

    @PostMapping
    @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN')")
    public ResponseEntity<JobPostingResponse> createJobPosting(
            @Valid @RequestBody JobPostingRequest request,
            Principal principal) {
        return ResponseEntity.ok(jobPostingService.createJobPosting(request, principal.getName()));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('HIRING_MANAGER', 'RECRUITER', 'ADMIN')")
    public ResponseEntity<List<JobPostingResponse>> getJobs(Principal principal) {
        return ResponseEntity.ok(jobPostingService.getJobsByRole(principal.getName()));
    }

    @GetMapping("/history")
    @PreAuthorize("hasAnyRole('HIRING_MANAGER', 'ADMIN')")
    public ResponseEntity<List<JobPostingResponse>> getJobHistory() {
        return ResponseEntity.ok(jobPostingService.getJobHistory());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('HIRING_MANAGER', 'RECRUITER', 'ADMIN')")
    public ResponseEntity<JobPostingResponse> getJob(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(jobPostingService.getJobById(id, principal.getName()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN')")
    public ResponseEntity<JobPostingResponse> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobPostingRequest request,
            Principal principal) {
        return ResponseEntity.ok(jobPostingService.updateJob(id, request, principal.getName()));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN')")
    public ResponseEntity<String> toggleStatus(@PathVariable Long id, Principal principal) {
        jobPostingService.toggleJobStatus(id, principal.getName());
        return ResponseEntity.ok("Status updated successfully!");
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN')")
    public ResponseEntity<String> deleteJob(@PathVariable Long id, Principal principal) {
        jobPostingService.deleteJob(id, principal.getName());
        return ResponseEntity.ok("Job deleted successfully!");
    }


    @GetMapping("/api/reports/jobs/{id}") 
    @PreAuthorize("hasAnyRole('HIRING_MANAGER', 'RECRUITER', 'ADMIN')")
    public ResponseEntity<Map<String, Long>> getJobReport(@PathVariable Long id) {
        return ResponseEntity.ok(jobPostingService.getJobPipelineReport(id));
    }
}