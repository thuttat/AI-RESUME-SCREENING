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
import com.duckie.backend.repository.UserRepository; 

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final JobPostingRepository jobPostingRepository;
    private final CVRepository cvRepository;
    private final UserRepository userRepository; 

    @Transactional(readOnly = true)
    public DashboardResponse getDashboardMetrics() {
        long totalJobs = jobPostingRepository.count();
        long totalCvs = cvRepository.count();
        long totalAiCvs = cvRepository.countByAiAnalysisResultIsNotNull();
        long totalNormalCvs = totalCvs - totalAiCvs; 
        long activeUsers = userRepository.count(); 

        int currentYear = Year.now().getValue();
        List<MonthlyCVProjection> chartData = cvRepository.getMonthlyCvStatistics(currentYear);

        Pageable topFive = PageRequest.of(0, 5);
        List<TopUserProjection> topUsers = jobPostingRepository.findTopUsersByJobCount(topFive).getContent();

        return new DashboardResponse(
            totalJobs,
            totalAiCvs,
            totalNormalCvs, 
            activeUsers,   
            chartData,
            topUsers
        );
    }
}