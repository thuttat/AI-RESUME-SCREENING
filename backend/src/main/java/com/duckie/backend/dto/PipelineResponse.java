package com.duckie.backend.dto;

public record PipelineResponse(
        long totalApplications,
        long aiProcessedCount,
        long shortlistedCount,
        long rejectedCount,
        long hiredCount
) {
}
