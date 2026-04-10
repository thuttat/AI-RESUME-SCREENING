package com.duckie.backend.dto;

import com.duckie.backend.entity.Status;

public record EmailRecipientResponse(
        Long applicationId,
        String candidateName,
        String candidateEmail,
        Status status,
        Boolean hasSentEmail
) {
}
