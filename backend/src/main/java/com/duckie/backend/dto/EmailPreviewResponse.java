package com.duckie.backend.dto;

public record EmailPreviewResponse(
    String subjectPreview,
    String bodyPreview
) {}