package com.duckie.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record EmailTemplateRequest(
        @NotBlank(message = "Type can not be blank")
        String type,

        @NotBlank(message = "Tiêu đề email (subject) không được để trống")
        String subject,

        @NotBlank(message = "Nội dung email (body) không được để trống")
        String body
) {}