package com.duckie.backend.dto;

import java.util.List;

public record DashboardResponse(
    long totalJobPosting,
    long totalAiCv,
    List<MonthlyCVProjection> cvUploadedChart,
    List<TopUserProjection> topActiveUsers 
) {}