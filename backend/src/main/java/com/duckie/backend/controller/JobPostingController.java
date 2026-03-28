package com.duckie.backend.controller;

import com.duckie.backend.dto.JobPostingRequest;
import com.duckie.backend.dto.JobPostingResponse;
import com.duckie.backend.model.User;
import com.duckie.backend.service.JobPostingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/recruiter/jobs")
@RequiredArgsConstructor
public class JobPostingController {
    private final JobPostingService jobPostingService;

    @PostMapping
    public ResponseEntity<JobPostingResponse> createJobPosting(
            @Valid @RequestBody JobPostingRequest request,
            Principal principal
            ) {
        String username = principal.getName();
        JobPostingResponse response = jobPostingService.createJobPosting(request, username);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<JobPostingResponse>> getOwnRecruiterJobs(Principal principal) {
        return ResponseEntity.ok(jobPostingService.getOwnRecruiterJobs(principal.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobPostingResponse> getJob(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(jobPostingService.getJobById(id, principal.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobPostingResponse> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobPostingRequest request,
            Principal principal) {
        return ResponseEntity.ok(jobPostingService.updateJob(id, request, principal.getName()));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<String> toggleStatus(@PathVariable Long id, Principal principal) {
        jobPostingService.toggleJobStatus(id, principal.getName());
        return ResponseEntity.ok("Successfully updated!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id, Principal principal) {
        try {
            jobPostingService.deleteJob(id, principal.getName());
            return ResponseEntity.ok("Successfully deleted!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Could not delete job: " + e.getMessage());
        }
    }
}
