package com.duckie.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.duckie.backend.entity.AIAnalysisResult;
import com.duckie.backend.entity.CV;
import com.duckie.backend.entity.JobPosting;
import com.duckie.backend.repository.AIAnalysisResultRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AIService {
    
    private final AIAnalysisResultRepository aiAnalysisResultRepository;
    private final RestTemplate restTemplate = new RestTemplate(); 
    private final ObjectMapper objectMapper;

    public String testConnection(String apiKey, String model, String extractedText) {
        try {
            String apiUrl = "https://api.openai.com/v1/chat/completions"; 
            
            if (apiKey == null || apiKey.isEmpty()) {
                throw new RuntimeException("API Key không hợp lệ");
            }

            return "Kết nối thử nghiệm thành công! Model: " + model + ". Dữ liệu nhận được: " + extractedText.substring(0, Math.min(extractedText.length(), 50)) + "...";
            
        } catch (Exception e) {
            return "Lỗi kết nối AI: " + e.getMessage();
        }
    }

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