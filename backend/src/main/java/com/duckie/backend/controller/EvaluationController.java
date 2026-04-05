package com.duckie.backend.controller;

import java.util.List;

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

import com.duckie.backend.dto.EvaluationRequest;
import com.duckie.backend.dto.EvaluationResponse;
import com.duckie.backend.service.EvaluationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EvaluationController {

    private final EvaluationService evaluationService;

    @GetMapping("/applications/comparison")
    @PreAuthorize("hasAnyRole('HIRING_MANAGER', 'RECRUITER', 'ADMIN')")
    public ResponseEntity<List<EvaluationResponse>> compare(@RequestParam List<Long> ids) {
        return ResponseEntity.ok(evaluationService.getEvaluationsForComparison(ids));
    }

    @PostMapping("/applications/{applicationId}/evaluations")
    @PreAuthorize("hasAnyRole('HIRING_MANAGER', 'RECRUITER', 'ADMIN')")
    public ResponseEntity<EvaluationResponse> create(
            @PathVariable Long applicationId, 
            @Valid @RequestBody EvaluationRequest request) { 
        
        return new ResponseEntity<>(evaluationService.createEvaluation(applicationId, request), HttpStatus.CREATED);
    }
    
    @GetMapping("/applications/{applicationId}/evaluations")
    @PreAuthorize("hasAnyRole('HIRING_MANAGER', 'RECRUITER', 'ADMIN')")
    public ResponseEntity<List<EvaluationResponse>> getByApp(@PathVariable Long applicationId) {
        return ResponseEntity.ok(evaluationService.getEvaluationsByApplication(applicationId));
    }

    @PutMapping("/evaluations/{evaluationId}")
    @PreAuthorize("hasAnyRole('HIRING_MANAGER', 'ADMIN')")
    public ResponseEntity<EvaluationResponse> update(
            @PathVariable Long evaluationId, 
            @Valid @RequestBody EvaluationRequest request) {
        return ResponseEntity.ok(evaluationService.updateEvaluation(evaluationId, request));
    }

    @DeleteMapping("/evaluations/{evaluationId}")
    @PreAuthorize("hasAnyRole('HIRING_MANAGER', 'ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long evaluationId) {
        evaluationService.deleteEvaluation(evaluationId);
        return ResponseEntity.noContent().build();
    }
}