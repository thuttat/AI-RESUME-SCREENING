package com.duckie.backend.repository;

import java.util.List; 
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.duckie.backend.entity.CV;
import com.duckie.backend.dto.MonthlyCVProjection; 

@Repository
public interface CVRepository extends JpaRepository<CV, Long> {
    long count();
    long countByAiAnalysisResultIsNotNull();
    
    Page<CV> findByUploadedById(Long uploadedById, Pageable pageable);

    @Query("SELECT c FROM CV c WHERE " +
            "(:search IS NULL OR LOWER(c.candidateName) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<CV> findAllBySearch(@Param("search") String search, Pageable pageable);

    
    @Query("SELECT MONTH(c.createdAt) AS month, " +
           "COUNT(c.id) AS totalCount, " +
           "SUM(CASE WHEN c.aiAnalysisResult IS NOT NULL THEN 1 ELSE 0 END) AS aiCount, " +
           "SUM(CASE WHEN c.aiAnalysisResult IS NULL THEN 1 ELSE 0 END) AS normalCount " +
           "FROM CV c " +
           "WHERE YEAR(c.createdAt) = :year " +
           "GROUP BY MONTH(c.createdAt) " +
           "ORDER BY month")
    List<MonthlyCVProjection> getMonthlyCvStatistics(@Param("year") int year);
}