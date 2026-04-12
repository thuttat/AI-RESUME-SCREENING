package com.duckie.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.duckie.backend.entity.Evaluation;

public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {
    List<Evaluation> findByApplicationId(Long applicationId);

    boolean existsByApplicationIdAndEvaluatorId(Long applicationId, Long evaluatorId);

    List<Evaluation> findByApplicationIdIn(List<Long> applicationIds);

    @Query("SELECT AVG(e.rating) FROM Evaluation e WHERE e.application.id = :appId")
    Double getAverageRatingByApplication(Long appId);

    Optional<Evaluation> findByApplicationIdAndEvaluatorId(Long applicationId, Long evaluatorId);
}
