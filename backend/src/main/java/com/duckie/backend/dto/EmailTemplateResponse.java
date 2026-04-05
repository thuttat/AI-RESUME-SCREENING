package com.duckie.backend.dto;

import java.time.Instant;

public record EmailTemplateResponse(
    Long id,
    String templateName,
    String subject,
    String body,
    Boolean isActive,
    Instant createdAt,
    Instant updatedAt
) {}