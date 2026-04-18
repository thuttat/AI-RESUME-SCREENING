package com.duckie.backend.dto;

import java.util.Map;

public record JobReportResponse(
        String jobTitle,
        long totalCandidates,
        double averageMatchScore,
        long shortlistCount,
        long rejectCount,
        Map<String, Long> skillDistribution
) {
}
