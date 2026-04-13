package com.duckie.backend.service;

import org.springframework.stereotype.Component;

import com.duckie.backend.dto.EvaluationRequest;
import com.duckie.backend.dto.EvaluationResponse;
import com.duckie.backend.entity.Application;
import com.duckie.backend.entity.Evaluation;
import com.duckie.backend.entity.User;

@Component
public class EvaluationMapper {
    public Evaluation toEntity(EvaluationRequest request, Application app, User evaluator) {
            return Evaluation.builder()
                    .application(app)
                    .evaluator(evaluator)
                    .rating(request.rating())
                    .feedback(request.feedback())
                    .build();
    }

    public EvaluationResponse toResponse(Evaluation entity) {
        if (entity == null) {
            return null;
        }

        return new EvaluationResponse(
            entity.getId(),
            entity.getApplication().getId(),    
            entity.getEvaluator().getFullname(), 
            entity.getRating(),
            entity.getFeedback(),
            entity.getCreatedAt()               
        );
    }
}