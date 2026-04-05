package com.duckie.backend.dto;

public record EmailPreviewResponse(
    String subject,
    String body
) {}