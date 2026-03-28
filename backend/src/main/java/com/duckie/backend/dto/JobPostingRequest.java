package com.duckie.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record JobPostingRequest(
        @NotBlank(message = "Job title cannot be blank")
        @Size(min = 5, max = 200, message = "Job title must be between 5 and 200 characters")
        String title,

        @NotBlank(message = "Job description cannot be blank")
        String description,

        @NotBlank(message = "Required skills cannot be blank")
        String requiredSkills
) {}
