package com.duckie.backend.dto;

import java.time.Instant;

public record JobTemplateResponse(
    Long id,
    String title,
    String description,
    Boolean isActive,
    Long createdById,
    Instant createdAt,
    Instant updatedAt
) {}