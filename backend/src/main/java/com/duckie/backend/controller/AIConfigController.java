package com.duckie.backend.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.duckie.backend.dto.AIConfigRequest;
import com.duckie.backend.dto.AIConfigResponse;
import com.duckie.backend.service.AIConfigService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ai-config")
@RequiredArgsConstructor
public class AIConfigController {
    private final AIConfigService aiConfigService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AIConfigResponse>> getAllConfigs() {
        return ResponseEntity.ok(aiConfigService.getAllConfigs());
    }

    @PostMapping("/test")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> testAiConfig(@RequestParam("file") MultipartFile file) {        
        String result = aiConfigService.testAiConnection(file);
        return ResponseEntity.ok(result);
    }


    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AIConfigResponse> updateConfig(@Valid @RequestBody AIConfigRequest request, Principal principal) {
        return ResponseEntity.ok(aiConfigService.updateConfig(request, principal.getName()));
    }

    
    
}