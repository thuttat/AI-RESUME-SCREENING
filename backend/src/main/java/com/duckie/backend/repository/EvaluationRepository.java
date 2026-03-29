package com.duckie.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.duckie.backend.entity.Evaluation;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    List<Evaluation> findByApplicationId(Long applicationId);

    boolean existsByApplicationIdAndEvaluatorId(Long applicationId, Long evaluatorId);
}
