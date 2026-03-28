package com.duckie.backend.dto;

import java.time.Instant;

public record JobPostingResponse(
        Long id,
        String title,
        String description,
        String requiredSkills,
        String status,
        Instant createdAt
) {
}
