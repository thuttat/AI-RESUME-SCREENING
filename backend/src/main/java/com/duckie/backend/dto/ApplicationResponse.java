package com.duckie.backend.dto;

import com.duckie.backend.entity.Status;

public record ApplicationResponse(
    Long id,
    Long jobId,
    String jobTitle,
    Status status,
    String candidateName,
    String candidateEmail,
    String cvFileUrl,
    java.time.Instant createdAt) {}