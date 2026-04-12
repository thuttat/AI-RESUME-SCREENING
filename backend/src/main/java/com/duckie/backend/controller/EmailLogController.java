package com.duckie.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public ResponseEntity<List<EmailLogResponse>> getAllLogs() {
        return ResponseEntity.ok(emailService.getAllEmailLogs());
    }
}