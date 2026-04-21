package com.duckie.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.duckie.backend.entity.Application;
import com.duckie.backend.entity.Status;

import java.util.List;
import java.util.Map;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

        boolean existsByCvIdAndJobPostingId(Long id, Long jobPostingId);

        @Query("SELECT a FROM Application a WHERE " +
                "(:jobId IS NULL OR a.jobPosting.id = :jobId) AND " +
                "(:status IS NULL OR a.status = :status)")
        Page<Application> findByJobPostingIdAndStatus(@Param("jobId") Long jobId, @Param("status") Status status,
                        Pageable pageable);

        @Query("SELECT a FROM Application a " +
                        "JOIN a.cv c " +
                        "JOIN c.aiAnalysisResult ai " +
                        "WHERE a.jobPosting.id = :jobId " +
                        "ORDER BY ai.matchScore DESC")
        Page<Application> findRankedApplicationByJobId(@Param("jobId") Long jobId, Pageable pageable);

        long countByJobPostingIdAndStatus(Long jobPostingId, Status status);

        long countByJobPostingId(Long jobPostingId);

        @Query("SELECT COUNT(a) FROM Application a WHERE a.jobPosting.createdBy.username = :username AND a.status = :status")
        long countByRecruiterAndStatus(@Param("username") String username, @Param("status") Status status);

        @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Application a " +
                        "WHERE a.cv.candidateEmail = :email AND a.jobPosting.id = :jobId AND a.cv.id != :currentCvId")
        boolean existsDuplicateByEmailForJob(@Param("email") String email,
                        @Param("jobId") Long jobId,
                        @Param("currentCvId") Long currentCvId);
        Page<Application> findByJobPostingId(Long jobId, Pageable pageable);

        @Query("SELECT FUNCTION('MONTHNAME', a.createdAt) as month, COUNT(a) as applications " +
                "FROM Application a WHERE a.jobPosting.createdBy.username = :username " +
                "GROUP BY FUNCTION('MONTHNAME', a.createdAt), MONTH(a.createdAt) " +
                "ORDER BY MONTH(a.createdAt) ASC")
        List<Map<String, Object>> findMonthlyStatsByRecruiter(@Param("username") String username);

        List<Application> findTop5ByJobPostingCreatedByUsernameOrderByCreatedAtDesc(String username);

        @Query("SELECT COUNT(a) FROM Application a WHERE a.jobPosting.createdBy.username = :username AND a.status != :status")
        long countByRecruiterAndStatusNot(@Param("username") String username, @Param("status") Status status);

        @Query("SELECT COUNT(a) FROM Application a WHERE a.jobPosting.id = :jobId AND a.status != :status")
        long countByJobPostingIdAndStatusNot(@Param("jobId") Long jobId, @Param("status") Status status);
}