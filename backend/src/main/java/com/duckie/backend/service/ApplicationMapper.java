package com.duckie.backend.service; 

import com.duckie.backend.dto.RankedCandidateResponse;
import com.duckie.backend.entity.AIAnalysisResult;
import org.springframework.stereotype.Component;

import com.duckie.backend.dto.ApplicationResponse;
import com.duckie.backend.entity.Application;

@Component
public class ApplicationMapper {

    public ApplicationResponse toResponse(Application application) {
        if (application == null) return null;

        return new ApplicationResponse(
            application.getId(),
            application.getJobPosting() != null ? application.getJobPosting().getId() : null,
            application.getJobPosting() != null ? application.getJobPosting().getTitle() : null,
            application.getStatus(),
            application.getCV() != null ? application.getCV().getCandidateName() : null,
            application.getCV() != null ? application.getCV().getCandidateEmail() : null,
            application.getCV() != null ? application.getCV().getCvFileUrl() : null
        );
    }

    public RankedCandidateResponse toRankedResponse(Application application) {
        if (application == null) return null;

        AIAnalysisResult aiAnalysisResult = application.getCV() != null ? application.getCV().getAiAnalysisResult() : null;

        return new RankedCandidateResponse(
                application.getId(),
                application.getJobPosting() != null ? application.getJobPosting().getId() : null,
                application.getStatus(),
                application.getCV() != null ? application.getCV().getCandidateName() : null,
                application.getCV() != null ? application.getCV().getCandidateEmail() : null,
                application.getCV() != null ? application.getCV().getCvFileUrl() : null,
                aiAnalysisResult != null ? aiAnalysisResult.getMatchScore() : null,
                aiAnalysisResult != null ? aiAnalysisResult.getExtractedSkills() : null,
                aiAnalysisResult != null ? aiAnalysisResult.getYearsOfExperience() : null,
                aiAnalysisResult != null ? aiAnalysisResult.getCritique() : null
        );
    }
}