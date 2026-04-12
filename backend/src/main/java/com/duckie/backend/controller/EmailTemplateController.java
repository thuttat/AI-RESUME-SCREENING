package com.duckie.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.duckie.backend.dto.EmailPreviewResponse;
import com.duckie.backend.dto.EmailTemplateRequest;
import com.duckie.backend.dto.EmailTemplateResponse;
import com.duckie.backend.dto.PaginationResponse;
import com.duckie.backend.service.EmailTemplateService;

import jakarta.validation.Valid;




@RestController
@RequestMapping("/api/email-templates")
public class EmailTemplateController {
    private final EmailTemplateService emailTemplateService;    
    public EmailTemplateController(EmailTemplateService emailTemplateService) {
        this.emailTemplateService = emailTemplateService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER', 'HIRING_MANAGER')")
    public ResponseEntity<PaginationResponse<EmailTemplateResponse>> getAllTemplates(
            @RequestParam(required = false) String search, 
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
            
        PaginationResponse<EmailTemplateResponse> response = emailTemplateService.findAll(search, page, size);
        
        return ResponseEntity.ok(response);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER')")
    public ResponseEntity<EmailTemplateResponse> createEmailTemplate(@Valid@RequestBody EmailTemplateRequest request) {
        EmailTemplateResponse response = emailTemplateService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER')")
    public ResponseEntity<EmailTemplateResponse> updateEmailTemplate(@PathVariable Long id, @Valid @RequestBody EmailTemplateRequest request) {
        EmailTemplateResponse response = emailTemplateService.update(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER')")
    public ResponseEntity<Void> deleteEmailTemplate(@PathVariable Long id) {
        emailTemplateService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/preview")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECRUITER', 'HIRING_MANAGER')")
    public ResponseEntity<EmailPreviewResponse> previewTemplate(
            @PathVariable Long id,
            @RequestBody Map<String, String> mockData) {
            
        EmailPreviewResponse response = emailTemplateService.preview(id, mockData);
        return ResponseEntity.ok(response);
    }

}
