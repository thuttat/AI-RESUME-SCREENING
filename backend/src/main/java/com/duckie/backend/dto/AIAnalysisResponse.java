package com.duckie.backend.dto;

public record AIAnalysisResponse(
        Double matchScore,
        String extractedSkills,
        Double yearsOfExperience,
        String rawJsonResponse) {
}