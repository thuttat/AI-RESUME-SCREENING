package com.duckie.backend.dto;

import java.time.Instant;
import java.util.List;

public record RecruiterDashboardResponse(
        long activeJobs,
        long totalCandidates,
        long shortlistedCount,
        long pendingReviewCount,
        List<MonthlyData> monthlyApplications,
        List<PieData> jobStatusDistribution,
        List<RecentActivity> recentActivities
) {
    public record MonthlyData(
            String month,
            long applications
    ) {}

    public record PieData(
            String name,
            long value,
            String color
    ) {}

    public record RecentActivity(
            String action,
            String targetName,
            Instant timestamp
    ) {}
}
