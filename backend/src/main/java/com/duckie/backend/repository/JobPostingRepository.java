package com.duckie.backend.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.duckie.backend.dto.TopUserProjection;
import com.duckie.backend.entity.JobPosting;
import com.duckie.backend.entity.JobStatus;

@Repository
public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {

    List<JobPosting> findByStatus(JobStatus status);

    List<JobPosting> findByCreatedBy_Username(String username);

    Optional<JobPosting> findByIdAndCreatedBy_Username(Long id, String username);

    @Query("SELECT u.id AS id, u.fullname AS name, u.role AS role, COUNT(j.id) AS activityCount, NULL AS avatar " +
           "FROM JobPosting j JOIN j.createdBy u " +
           "GROUP BY u.id, u.fullname, u.role ORDER BY activityCount DESC")
    Page<TopUserProjection> findTopUsersByJobCount(Pageable pageable);

    @Query("SELECT j FROM JobPosting j WHERE " +
           "(:search IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:status IS NULL OR j.status = :status)")
    Page<JobPosting> findAllBySearchAndStatus(@Param("search") String search, @Param("status") JobStatus status, Pageable pageable);

    long countByStatusAndCreatedByUsername(JobStatus status, String username);

    @Query("SELECT j.status as status, COUNT(j) as count FROM JobPosting j " +
            "WHERE j.createdBy.username = :username GROUP BY j.status")
    List<Map<String, Object>> getJobStatusDistributionByRecruiter(@Param("username") String username);
}