package com.duckie.backend.controller;

import com.duckie.backend.dto.RecruiterDashboardResponse;
import com.duckie.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/recruiter")
@RequiredArgsConstructor
public class RecruiterDashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<RecruiterDashboardResponse> getRecruiterStats(Principal principal) {
        return ResponseEntity.ok(dashboardService.getRecruiterDashboardStats(principal.getName()));
    }
}
