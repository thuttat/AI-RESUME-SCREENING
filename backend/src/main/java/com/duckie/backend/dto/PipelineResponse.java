package com.duckie.backend.dto;

public record PipelineResponse(
        long totalApplications,
        long pendingCount,
        long aiProcessedCount,
        long shortlistedCount,
        long rejectedCount
) {
}
