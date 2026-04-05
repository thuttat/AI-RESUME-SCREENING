package com.duckie.backend.dto;

import java.time.Instant;

public record EvaluationResponse(
    Long id,
    Long applicationId,
    String evaluatorName,
    int rating,
    String feedback,
    Instant createdAt
) {}