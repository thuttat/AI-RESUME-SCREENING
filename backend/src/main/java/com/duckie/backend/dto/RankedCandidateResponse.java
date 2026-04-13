package com.duckie.backend.dto;

import com.duckie.backend.entity.Status;

public record RankedCandidateResponse (
    Long applicationId,
    Long jobId,
    Status status,
    String candidateName,
    String candidateEmail,
    String cvFileUrl,

    Double matchScore,
    String extractedSkills,
    Double yearsOfExperience,
    String critique,
    Boolean hasSentEmail
) {}
