package com.duckie.backend.service;

import com.duckie.backend.dto.JobReportResponse;
import com.duckie.backend.dto.PipelineResponse;
import com.duckie.backend.entity.JobPosting;
import com.duckie.backend.entity.Status;
import com.duckie.backend.repository.AIAnalysisResultRepository;
import com.duckie.backend.repository.ApplicationRepository;
import com.duckie.backend.repository.JobPostingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ApplicationRepository applicationRepository;
    private final JobPostingRepository jobPostingRepository;
    private final AIAnalysisResultRepository aiAnalysisResultRepository;

    public PipelineResponse getPipelineMetrics(String username) {
        long totalApplications = applicationRepository.countByRecruiter(username);
        long pendingCount = applicationRepository.countByRecruiterAndStatus(username, Status.PENDING);
        long aiProcessedCount = applicationRepository.countByRecruiterAndStatus(username, Status.SUCCESS);
        long shortlistedCount = applicationRepository.countByRecruiterAndStatus(username, Status.SHORTLIST);
        long rejectedCount = applicationRepository.countByRecruiterAndStatus(username, Status.REJECT);

        return new PipelineResponse(
            totalApplications,
            pendingCount,
            aiProcessedCount,
            shortlistedCount,
            rejectedCount
        );
    }

    public JobReportResponse getJobDetailedMetrics(Long jobId) {
        String jobTitle = jobPostingRepository.findById(jobId)
                .map(JobPosting::getTitle)
                .orElseThrow(() -> new RuntimeException("Job not found!"));

        long totalCandidates = applicationRepository.countByJobPostingId(jobId);
        long shortlistCount = applicationRepository.countByJobPostingIdAndStatus(jobId, Status.SHORTLIST);
        long rejectCount = applicationRepository.countByJobPostingIdAndStatus(jobId, Status.REJECT);
        Double avgScore = aiAnalysisResultRepository.findAverageScoreByJobId(jobId);
        double safeAvgScore = (avgScore != null) ? Math.round(avgScore * 10.0) / 10.0 : 0.0;

        List<String> rawSkills = aiAnalysisResultRepository.findSkillsByJobId(jobId);
        Map<String, Long> topSkills = analyzeSkillDistribution(rawSkills);

        return new JobReportResponse(
                jobTitle, totalCandidates, safeAvgScore, shortlistCount, rejectCount, topSkills
        );
    }

    private Map<String, Long> analyzeSkillDistribution(List<String> rawSkillsList) {
        if (rawSkillsList == null || rawSkillsList.isEmpty()) {
            return new HashMap<>();
        }

        Map<String, Long> frequencyMap = new HashMap<>();

        for (String rawSkills : rawSkillsList) {
            if (rawSkills == null || rawSkills.isBlank()) continue;

            String[] skills = rawSkills.split(",");
            for (String skill : skills) {
                String cleanSkill = skill.trim().toUpperCase();
                if (!cleanSkill.isBlank()) {
                    frequencyMap.put(cleanSkill, frequencyMap.getOrDefault(cleanSkill, 0L) + 1);
                }
            }
        }

        return frequencyMap.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));
    }
}
