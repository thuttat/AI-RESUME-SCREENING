package com.duckie.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record EmailTemplateRequest(
        String templateName,

        String type,

        @NotBlank(message = "The email title can not be blank")
        String subject,

        @NotBlank(message = "The content an not be blank")
        String body
) {}