package com.duckie.backend.service;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.duckie.backend.entity.AIAnalysisResult;
import com.duckie.backend.entity.CV;
import com.duckie.backend.entity.JobPosting;
import com.duckie.backend.repository.AIAnalysisResultRepository;

import lombok.RequiredArgsConstructor;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
public class AIService {
    
    private final AIAnalysisResultRepository aiAnalysisResultRepository;
    private final RestTemplate restTemplate = new RestTemplate(); 
    private final ObjectMapper objectMapper;

    public AIAnalysisResult analysisResult(CV cv, JobPosting jobPosting, String extractedText) {
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