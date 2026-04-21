package com.duckie.backend.mapper;

import org.springframework.stereotype.Component;

import com.duckie.backend.dto.AIResponse;
import com.duckie.backend.entity.AIAnalysisResult;
import com.duckie.backend.entity.Application;
import com.duckie.backend.entity.CV;
import com.duckie.backend.entity.JobPosting;
import com.duckie.backend.entity.Status;
import com.duckie.backend.entity.User;

@Component
public class AIAnalysisMapper {
    public CV toNewCV(User recruiter, String fileUrl) {
        return CV.builder()
                .uploadedBy(recruiter)
                .cvFileUrl(fileUrl)
                .candidateName("Waiting for update...")
                .candidateEmail("Waiting for update...")
                .build();
    }

    public Application toNewApplication(JobPosting jobPosting, CV cv) {
        return Application.builder()
                .jobPosting(jobPosting)
                .cv(cv)
                .status(Status.PENDING)
                .build();
    }

    public AIAnalysisResult toEntity(AIResponse parsedData, CV cv, String rawJsonString) {
        return AIAnalysisResult.builder()
                .cv(cv)
                .matchScore(parsedData.matchScore())
                .extractedSkills(parsedData.extractedSkills())
                .yearsOfExperience(parsedData.yearsOfExperience())
                .rawJsonResponse(rawJsonString)
                .critique(parsedData.critique())
                .build();
    }

    public CV updateCvFromAI(CV cv, AIResponse parsedData, String knownName, String knownEmail) {
        String finalName = (knownName != null && !knownName.isBlank()) ? knownName : parsedData.candidateName();
        String finalEmail = (knownEmail != null && !knownEmail.isBlank()) ? knownEmail : parsedData.candidateEmail();

        cv.setCandidateName(finalName);
        cv.setCandidateEmail(finalEmail);
        return cv;
    }
}
