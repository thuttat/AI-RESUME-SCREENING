package com.duckie.backend.dto;

import java.time.Instant;

public record CVUploadResponse(
    Long id,
    String candidateName,
    String candidateEmail,
    String cvFileUrl,
    Long uploadedById,
    Instant createdAt
) {}