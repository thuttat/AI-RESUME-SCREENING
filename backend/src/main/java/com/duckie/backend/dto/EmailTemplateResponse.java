package com.duckie.backend.dto;

import java.time.Instant;

public record EmailTemplateResponse(
    Long id,
    String templateName,
    String subject,
    String body,
    Instant createdAt,
    Instant updatedAt
) {}