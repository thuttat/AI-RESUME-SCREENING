package com.duckie.backend.repository;

import com.duckie.backend.model.AIAnalysisResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AIAnalysisResultRepository extends JpaRepository<AIAnalysisResult, Long> {
    Optional<AIAnalysisResult> findByCvId(Long cvId);
}
