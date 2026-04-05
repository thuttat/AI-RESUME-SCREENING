package com.duckie.backend.dto;

import com.duckie.backend.entity.Status;

import jakarta.validation.constraints.NotNull;

public record ApplicationStatusRequest(
    @NotNull(message = "Trạng thái không được để trống")
    Status status,
    
    String note
) {}