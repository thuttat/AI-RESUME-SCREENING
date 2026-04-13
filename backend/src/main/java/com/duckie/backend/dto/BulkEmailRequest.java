package com.duckie.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record BulkEmailRequest(
        @NotEmpty(message = "Select at least 1 candidate!")
        List<Long> applicationIds,

        @NotBlank(message = "Email subject can not be blank")
        String subject,

        @NotBlank(message = "Email body can not be blank")
        String body
) {
}
