package com.duckie.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.duckie.backend.dto.JobTemplateRequest;
import com.duckie.backend.dto.JobTemplateResponse;
import com.duckie.backend.entity.JobTemplate;
import com.duckie.backend.mapper.JobTemplateMapper;
import com.duckie.backend.service.IJobTemplateService;

@RestController
@RequestMapping("/api/job-templates")
public class JobTemplateController {
    private final IJobTemplateService jobTemplateService;
    private final JobTemplateMapper jobTemplateMapper;

    public JobTemplateController(IJobTemplateService jobTemplateService, JobTemplateMapper jobTemplateMapper) {
        this.jobTemplateService = jobTemplateService;
        this.jobTemplateMapper = jobTemplateMapper;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER')")
    public ResponseEntity<List<JobTemplateResponse>> getAllTemplates(@RequestParam(required = false) String search) {
        List<JobTemplate> templates;
        if (search != null && !search.isBlank()) {
            templates = jobTemplateService.searchTemplates(search);
        } else {
            templates = jobTemplateService.getAllJobTemplates();
        }
        
        List<JobTemplateResponse> response = templates.stream()
                .map(jobTemplateMapper::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER')")
    public ResponseEntity<JobTemplateResponse> getTemplateById(@PathVariable Long id) {
        JobTemplate template = jobTemplateService.getJobTemplateById(id);
        return ResponseEntity.ok(jobTemplateMapper.toResponse(template));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER')")
    public ResponseEntity<JobTemplateResponse> createTemplate(@RequestBody JobTemplateRequest request) {
        JobTemplate template = new JobTemplate();
        template.setTitle(request.title());
        template.setDescription(request.description());
        template.setDepartment(request.department());
        template.setRequirements(request.requirements());
        template.setRequiredSkills(request.requiredSkills());
        
        JobTemplate saved = jobTemplateService.createJobTemplate(template);
        return ResponseEntity.status(HttpStatus.CREATED).body(jobTemplateMapper.toResponse(saved));
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER')")
    public ResponseEntity<JobTemplateResponse> patchTemplate(@PathVariable Long id, @RequestBody JobTemplateRequest request) {
        JobTemplateResponse updated = jobTemplateService.patchUpdate(id, request);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER')")
    public ResponseEntity<JobTemplateResponse> updateTemplate(@PathVariable Long id, @RequestBody JobTemplateRequest request) {
        JobTemplate templateData = new JobTemplate();
        templateData.setTitle(request.title());
        templateData.setDescription(request.description());
        templateData.setDepartment(request.department());
        templateData.setRequirements(request.requirements());
        templateData.setRequiredSkills(request.requiredSkills());

        JobTemplate updated = jobTemplateService.updateJobTemplate(id, templateData);
        return ResponseEntity.ok(jobTemplateMapper.toResponse(updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER')")
    public ResponseEntity<Void> deleteTemplate(@PathVariable Long id) {
        jobTemplateService.deleteJobTemplate(id);
        return ResponseEntity.noContent().build();
    }
}