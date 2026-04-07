package com.duckie.backend.dto;
import java.util.List;

public record DashboardResponse(
    long totalJobPosting,
    long totalAiCv,
    long totalNormalCv, 
    long activeUsers,  
    List<MonthlyCVProjection> cvUploadedChart,
    List<TopUserProjection> topActiveUsers 
) {}

