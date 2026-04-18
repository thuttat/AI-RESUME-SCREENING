package com.duckie.backend.repository;

import com.duckie.backend.entity.AIAnalysisResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AIAnalysisResultRepository extends JpaRepository<AIAnalysisResult, Long> {
    Optional<AIAnalysisResult> findByCvId(Long cvId);

    // Tinh diem tb cua 1 job
    @Query("SELECT AVG(aar.matchScore) FROM AIAnalysisResult aar JOIN Application app ON app.cv = aar.cv WHERE app.jobPosting.id = :jobId")
    Double findAverageScoreByJobId(@Param("jobId") Long jobId);

    // Lay tat ca ky nang cua 1 job
    @Query("SELECT aar.extractedSkills FROM AIAnalysisResult aar JOIN Application app ON app.cv = aar.cv WHERE app.jobPosting.id = :jobId AND aar.extractedSkills IS NOT NULL")
    List<String> findSkillsByJobId(@Param("jobId") Long jobId);
}
