package com.duckie.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record JobPostingRequest(
    @NotBlank(message = "Title can not be blank")
    String title,
    
    @NotBlank(message = "Description can not be blank")
    String description,
    
    String requiredSkills
) {}