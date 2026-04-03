package com.duckie.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record JobTemplateRequest(
    @NotBlank(message = "Title can not be blank")
    String title,
    
    @NotBlank(message = "Description can not be blank")
    @Size(max = 300, message = "Description is too long. Please keep it concise and focus on requirements.")
    String description,

    @NotBlank(message = "Required skills can not be blank")
    String requiredSkills
) {}