package com.duckie.backend.dto;

import com.duckie.backend.entity.Status;
import java.time.Instant;

public record ApplicationResponse(
        Long id,
        Long jobId,
        String jobTitle,
        Status status,
        String candidateName,
        String candidateEmail,
        String cvFileUrl,
        Instant createdAt,
        Double matchScore,
        String critique,
        String extractedSkills,
        Double yearsOfExperience
) {}