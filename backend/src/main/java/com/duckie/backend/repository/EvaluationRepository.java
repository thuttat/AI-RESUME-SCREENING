package com.duckie.backend.repository;

import com.duckie.backend.model.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    List<Evaluation> findByApplicationId(Long applicationId);

    boolean existsByApplicationIdAndEvaluatorId(Long applicationId, Long evaluatorId);
}
