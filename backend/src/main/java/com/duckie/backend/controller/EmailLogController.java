package com.duckie.backend.controller;

import java.security.Principal;
import java.util.List;

import com.duckie.backend.dto.PaginationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.duckie.backend.dto.EmailLogResponse;
import com.duckie.backend.service.EmailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/email-logs")
@RequiredArgsConstructor
public class EmailLogController {

    private final EmailService emailService;


    @GetMapping
    @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN', 'HIRING_MANAGER')")
    public ResponseEntity<List<EmailLogResponse>> getAllLogs() {
        return ResponseEntity.ok(emailService.getAllEmailLogs());
    }

    @GetMapping("/history")
    @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN', 'HIRING_MANAGER')")
    public ResponseEntity<PaginationResponse<EmailLogResponse>> getAllEmailLogsByRecruiter(
            Principal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(emailService.getAllEmailLogsByRecruiter(principal.getName(), page, size));
    }
}