package com.duckie.backend.dto;

import java.time.Instant;

public record EvaluationResponse(
    Long id,
    Long applicationId,
    Long evaluatorId,
    int rating,
    String feedback,
    Instant createdAt,
    Instant updatedAt
) {}