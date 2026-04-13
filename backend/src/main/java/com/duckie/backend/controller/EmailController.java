package com.duckie.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.duckie.backend.dto.BulkEmailRequest;
import com.duckie.backend.service.ApplicationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/emails")
@RequiredArgsConstructor
public class EmailController {

    private final ApplicationService applicationService;

    @PostMapping("/send")
    @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN')")
    public ResponseEntity<String> sendEmails(@Valid @RequestBody BulkEmailRequest request) {
        applicationService.sendBulkCustomEmails(request);

        return ResponseEntity.ok("Đã đưa toàn bộ email vào hàng đợi thành công!");
    }
}