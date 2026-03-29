package com.duckie.backend.dto;

import java.time.Instant;

public record AIConfigResponse(
    Long id,
    String configKey,
    String configValue,
    Long updatedById,
    Instant createdAt,
    Instant updatedAt
) {}