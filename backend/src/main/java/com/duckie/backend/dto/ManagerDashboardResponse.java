package com.duckie.backend.dto;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ManagerDashboardResponse {
    private long totalJobsManaged;
    private long pendingEvaluations;
    private long shortlistedCount;
    private long hiredCount;

    private List<ApplicationResponse> recentActivities;
    private Map<String, Long> statsChart;
}