package com.duckie.backend.dto;

import java.time.Instant;

import com.duckie.backend.entity.EmailStatus;

public record EmailLogResponse(
    Long id,
    Long applicationId,
    String candidateName,
    String candidateEmail, 
    String subject,
    String body,
    Instant sentAt,
    EmailStatus status
) {
}