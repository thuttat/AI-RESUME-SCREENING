package com.duckie.backend.service;

import com.duckie.backend.model.AIAnalysisResult;
import com.duckie.backend.model.CV;
import com.duckie.backend.model.JobPosting;
import com.duckie.backend.repository.AIAnalysisResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AIService {
    private final AIAnalysisResultRepository aiAnalysisResultRepository;

    public AIAnalysisResult analysisResult(CV cv, JobPosting jobPosting, String extractedText) {
        // mock response data from AI
        double matchScore = 86;
        String extractedSkills = "Java, Spring Boot, PostgreSQL, React";
        double yearsOfExp = 3;
        String rawJson = "{ \"score\": 86, \"skills\": [\"Java\", \"Spring\"] }";

        AIAnalysisResult aiResult = AIAnalysisResult.builder()
                .cv(cv)
                .matchScore(matchScore)
                .extractedSkills(extractedSkills)
                .yearsOfExperience(yearsOfExp)
                .rawJsonResponse(rawJson)
                .build();

        return aiAnalysisResultRepository.save(aiResult);
    }
}
