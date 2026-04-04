package com.duckie.backend.dto;


public record AIAnalysisResponse(
    Long id,
    String candidateName,
    String candidateEmail,
    Double matchScore,
    String extractedSkills,
    Double yearsOfExperience,
    String critique
) {}