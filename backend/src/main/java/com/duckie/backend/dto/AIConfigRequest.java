package com.duckie.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record AIConfigRequest(
    @NotBlank(message = "Config key can not be blank")
    String configKey,
    
    @NotBlank(message = "Config value can not be blank")
    String configValue
) {}