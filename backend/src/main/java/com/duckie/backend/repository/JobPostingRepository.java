package com.duckie.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.duckie.backend.dto.TopUserProjection;
import com.duckie.backend.entity.JobPosting;
import com.duckie.backend.entity.JobStatus;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
    
    @Query("SELECT j FROM JobPosting j WHERE " +
            "(:search IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
            "(:status IS NULL OR j.status = :status)")
    Page<JobPosting> findAllBySearchAndStatus(@Param("search") String search, @Param("status") JobStatus status, Pageable pageable);

    Page<JobPosting> findByCreatedById(Long createdById, Pageable pageable);

    List<JobPosting> findByCreatedBy_Username(String username);

    Optional<JobPosting> findByIdAndCreatedBy_Username(Long id, String username);


    Long countByStatus(JobStatus status);  
    @Query("SELECT j.createdBy.username AS username, COUNT(j) AS totalPosts " +
           "FROM JobPosting j " +
           "GROUP BY j.createdBy.username " +
           "ORDER BY totalPosts DESC")
    Page<TopUserProjection> findTopUsersByJobCount(Pageable pageable);
}