package com.duckie.backend.dto;

public record ApplicationResponse(
    Long applicationId,
    Long jobId,
    String jobTitle,
    String candidateName,
    String candidateEmail,
    String cvFileUrl,
    String status
) {}
