package com.duckie.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AIResponse(
        String candidateName,
        String candidateEmail,
        Double matchScore,
        String extractedSkills,
        String critique,

        @JsonSetter(nulls = Nulls.SKIP) Double yearsOfExperience
) {
    public AIResponse {
        if (yearsOfExperience == null) {
            yearsOfExperience = 0.0;
        }
    }
}
