package com.duckie.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record EmailTemplateRequest(
    @NotBlank(message = "Type can not be blank")
    String type,
    
    @NotBlank(message = "Subject can not be blank")
    String subject,
    
    @NotBlank(message = "Body can not be blank")
    String body
) {}