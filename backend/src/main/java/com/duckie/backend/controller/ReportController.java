package com.duckie.backend.controller;

import com.duckie.backend.dto.JobReportResponse;
import com.duckie.backend.dto.PipelineResponse;
import com.duckie.backend.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    @GetMapping("/pipeline")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<PipelineResponse> getOverviewPipeline(Principal principal) {
        return ResponseEntity.ok(reportService.getPipelineMetrics(principal.getName()));
    }

    @GetMapping("/jobs/{id}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<JobReportResponse> getJobDetailReport(@PathVariable Long id) {
        return ResponseEntity.ok(reportService.getJobDetailedMetrics(id));
    }
}
