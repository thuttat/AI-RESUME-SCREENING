package com.duckie.backend.dto;

import java.time.Instant;

public record EmailLogResponse(
    Long id,
    Long applicationId,
    String candidateName,
    String candidateEmail, 
    String subject,
    String body,
    Instant sentAt,
    String status
) {
}