package com.duckie.backend.dto;

import jakarta.validation.constraints.NotNull;

public record ApplicationRequest(
    @NotNull(message = "Job ID is required")
    Long jobId,
    
    @NotNull(message = "CV ID is required")
    Long cvId
) {}