package com.duckie.backend.dto;

import com.duckie.backend.entity.Status;

public record ApplicationResponse(
    Long id,
    Long jobId,
    String jobTitle,
    String candidateName,
    String candidateEmail,
    String cvFileUrl,
    Status status
) {}