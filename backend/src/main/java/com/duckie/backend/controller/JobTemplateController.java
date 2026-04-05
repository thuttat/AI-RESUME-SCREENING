package com.duckie.backend.controller;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.duckie.backend.dto.JobTemplateRequest;
import com.duckie.backend.dto.JobTemplateResponse;
import com.duckie.backend.dto.PaginationResponse;
import com.duckie.backend.service.JobTemplateService;

@RestController
@RequestMapping("/api/job-templates")
public class JobTemplateController {
    private final JobTemplateService jobTemplateService;
    public JobTemplateController(JobTemplateService jobTemplateService) {
        this.jobTemplateService = jobTemplateService;
    }

    @GetMapping
    public ResponseEntity<PaginationResponse<JobTemplateResponse>>getAllTemplate(
        @RequestParam(required = false) String search,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size){
        Pageable pageable=PageRequest.of(page, size);
        Page<JobTemplateResponse> pageData=jobTemplateService.findAll(search, pageable);
        PaginationResponse<JobTemplateResponse> response = PaginationResponse.<JobTemplateResponse>builder()
                .content(pageData.getContent())         
                .pageNo(pageData.getNumber())           
                .pageSize(pageData.getSize())            
                .totalElements(pageData.getTotalElements()) 
                .totalPages(pageData.getTotalPages())      
                .last(pageData.isLast())                 
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobTemplateResponse> getTemplateById(@PathVariable Long id) {
        JobTemplateResponse response = jobTemplateService.findById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<JobTemplateResponse> createTemplate(@RequestBody JobTemplateRequest request) {
        JobTemplateResponse response = jobTemplateService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobTemplateResponse> updateTemplate(
            @PathVariable Long id, 
            @RequestBody JobTemplateRequest request) {
        JobTemplateResponse response = jobTemplateService.update(id, request);
        return ResponseEntity.ok(response);
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<JobTemplateResponse> patchUpdateTemplate(
            @PathVariable Long id, 
            @RequestBody JobTemplateRequest request) {
        JobTemplateResponse response = jobTemplateService.patchUpdate(id, request);
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTemplate(@PathVariable Long id) {
        jobTemplateService.delete(id);
        return ResponseEntity.noContent().build();
    }

}