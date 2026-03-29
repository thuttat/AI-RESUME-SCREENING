package com.duckie.backend.dto;

import java.time.Instant;

import com.duckie.backend.entity.JobStatus; 

public record JobPostingResponse(
    Long id,
    String title,
    String description,
    String requiredSkills,
    JobStatus status,
    Long createdById, 
    Instant createdAt,
    Instant updatedAt
) {}