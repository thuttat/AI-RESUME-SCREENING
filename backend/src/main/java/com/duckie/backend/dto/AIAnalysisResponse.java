package com.duckie.backend.dto;

public record AIAnalysisResponse(
    Long id,
    String candidateName,
    String candidateEmail,
    double matchScore,
    String extractedSkills,
    double yearsOfExperience
) {}
