package com.duckie.backend.service;

import java.time.Year;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.duckie.backend.dto.DashboardResponse;
import com.duckie.backend.dto.MonthlyCVProjection;
import com.duckie.backend.dto.TopUserProjection;
import com.duckie.backend.repository.CVRepository;
import com.duckie.backend.repository.JobPostingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final JobPostingRepository jobPostingRepository;
    private final CVRepository cvRepository;

    @Transactional(readOnly = true)
    public DashboardResponse getDashboardMetrics() {
        long totalJobs = jobPostingRepository.count();

        long totalAiCvs = cvRepository.countByAiAnalysisResultIsNotNull();

        int currentYear = Year.now().getValue();
        List<MonthlyCVProjection> chartData = cvRepository.getMonthlyCvStatistics(currentYear);

        Pageable topFive = PageRequest.of(0, 5);
        List<TopUserProjection> topUsers = jobPostingRepository.findTopUsersByJobCount(topFive).getContent();

        return new DashboardResponse(
            totalJobs,
            totalAiCvs,
            chartData,
            topUsers
        );
    }
}