package com.duckie.backend.controller;

import com.duckie.backend.dto.BulkEmailRequest;
import com.duckie.backend.entity.Application;
import com.duckie.backend.service.ApplicationService;
import com.duckie.backend.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/emails")
@RequiredArgsConstructor
public class EmailController {
    private final EmailService emailService;
    private final ApplicationService applicationService;

    @PostMapping("/send")
    @PreAuthorize("hasAnyRole('RECRUITER', 'ADMIN')")
    public ResponseEntity<String> sendEmails(@Valid @RequestBody BulkEmailRequest request) {
        for (Long appId : request.applicationIds()) {
            Application app = applicationService.getApplicationById(appId);
            emailService.sendCustomNotificationEmail(app, request.subject(), request.body());
        }

        return ResponseEntity.ok("Đã đưa toàn bộ email vào hàng đợi thành công!");
    }
}
