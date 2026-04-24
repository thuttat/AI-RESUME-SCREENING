package com.duckie.backend.service;

import java.time.Year;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.duckie.backend.dto.*;
import com.duckie.backend.entity.JobStatus;
import com.duckie.backend.entity.Status;
import com.duckie.backend.repository.ApplicationRepository;
import com.duckie.backend.mapper.ApplicationMapper; // Đảm bảo có mapper này
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;

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

    @Transactional(readOnly = true)
    public RecruiterDashboardResponse getRecruiterDashboardStats(String username) {
        long activeJobs = jobPostingRepository.countByStatusAndCreatedByUsername(JobStatus.OPEN, username);
        long totalCandidates = applicationRepository.countByRecruiterAndStatusNot(username, Status.PENDING);
        long shortlisted = applicationRepository.countByRecruiterAndStatus(username, Status.SHORTLIST);
        long success = applicationRepository.countByRecruiterAndStatus(username, Status.SUCCESS);

        List<RecruiterDashboardResponse.MonthlyData> monthlyData = applicationRepository.findMonthlyStatsByRecruiter(username)
                .stream()
                .map(m -> new RecruiterDashboardResponse.MonthlyData((String)m.get("month"), (Long)m.get("applications")))
                .toList();

        List<RecruiterDashboardResponse.PieData> pieData = jobPostingRepository.getJobStatusDistributionByRecruiter(username)
                .stream()
                .map(m -> {
                    String status = m.get("status").toString();
                    return new RecruiterDashboardResponse.PieData(status, (Long)m.get("count"), status.equals("OPEN") ? "#4f46e5" : "#6b7280");
                })
                .toList();

        List<RecruiterDashboardResponse.RecentActivity> activities = applicationRepository
                .findTop5ByJobPostingCreatedByUsernameOrderByCreatedAtDesc(username)
                .stream()
                .map(app -> new RecruiterDashboardResponse.RecentActivity(
                        "New application received",
                        app.getCV().getCandidateName() + " applied for " + app.getJobPosting().getTitle(),
                        app.getCreatedAt()
                ))
                .toList();

        return new RecruiterDashboardResponse(activeJobs, totalCandidates, shortlisted, success, monthlyData, pieData, activities);
    }

    @Transactional(readOnly = true)
    public ManagerDashboardResponse getManagerDashboardStats() {
        List<ApplicationResponse> recentApps = applicationRepository.findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(applicationMapper::toResponse)
                .collect(Collectors.toList());

        Map<String, Long> chartData = applicationRepository.countApplicationsByJobTitle()
                .stream()
                .collect(Collectors.toMap(
                        obj -> (String) obj[0],
                        obj -> (Long) obj[1]
                ));
        return ManagerDashboardResponse.builder()
                .totalJobsManaged(jobPostingRepository.count())
                .pendingEvaluations(applicationRepository.countByStatus(Status.PENDING))
                .shortlistedCount(applicationRepository.countByStatus(Status.SHORTLIST))
                .hiredCount(applicationRepository.countByStatus(Status.HIRED))
                .recentActivities(recentApps)
                .statsChart(chartData)
                .build();
    }
}