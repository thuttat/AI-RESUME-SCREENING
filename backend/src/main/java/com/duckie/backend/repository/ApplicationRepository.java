package com.duckie.backend.repository;

import com.duckie.backend.model.Application;
import com.duckie.backend.model.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    boolean existsByCvIdAndJobPostingId(Long id, Long jobPostingId);

    @Query("SELECT a FROM Application a WHERE " +
            "a.jobPosting.id = :jobId AND " +
            "(:status IS NULL OR a.status = :status)")
    Page<Application> findByJobPostingIdAndStatus(@Param("jobId") Long jobId, @Param("status") Status status, Pageable pageable);

    @Query("SELECT a FROM Application a " +
            "LEFT JOIN AIAnalysisResult ai ON a.cv.id = ai.cv.id " +
            "ORDER BY ai.matchScore DESC")
    Page<Application> findRankedApplicationByJobId(@Param("jobId") Long jobId, Pageable pageable);

    long countByJobPostingIdAndStatus(Long jobPostingId, Status status);

    @Query("SELECT COUNT(a) > 0 FROM Application a " +
            "WHERE a.jobPosting.id = :jobId " +
            "AND a.cv.id != :currentCvId " +
            "AND LOWER(a.cv.candidateEmail) = LOWER(:email)")
    boolean existsDuplicateByEmailForJob(@Param("email") String email,
                                         @Param("jobId") Long jobId,
                                         @Param("currentCvId") Long currentCvId);
}
