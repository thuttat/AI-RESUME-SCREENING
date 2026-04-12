package com.duckie.backend.controller;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.duckie.backend.dto.EmailPreviewResponse;
import com.duckie.backend.dto.EmailTemplateRequest;
import com.duckie.backend.dto.EmailTemplateResponse;
import com.duckie.backend.dto.PaginationResponse;
import com.duckie.backend.service.EmailTemplateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/email-templates")
@RequiredArgsConstructor 
public class EmailTemplateController {
    
    private final EmailTemplateService emailTemplateService;    

    @GetMapping
    public ResponseEntity<PaginationResponse<EmailTemplateResponse>> getAllTemplates(
            @RequestParam(required = false) String search, 
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
            
        return ResponseEntity.ok(emailTemplateService.findAll(search, page, size));
    }

    @PostMapping
    public ResponseEntity<EmailTemplateResponse> createEmailTemplate(@Valid @RequestBody EmailTemplateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(emailTemplateService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmailTemplateResponse> updateEmailTemplate(
            @PathVariable Long id, 
            @Valid @RequestBody EmailTemplateRequest request) {
        return ResponseEntity.ok(emailTemplateService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmailTemplate(@PathVariable Long id) {
        emailTemplateService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/preview")
    public ResponseEntity<EmailPreviewResponse> previewTemplate(
            @PathVariable Long id,
            @RequestBody Map<String, String> mockData) {
            
        return ResponseEntity.ok(emailTemplateService.preview(id, mockData));
    }
}