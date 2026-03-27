package com.duckie.backend.repository;

import com.duckie.backend.model.JobPosting;
import com.duckie.backend.model.JobStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
    @Query("SELECT j FROM JobPosting j WHERE" +
            "(:search IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
            "(:status IS NULL OR j.status = :status)")
    Page<JobPosting> findAllBySearchAndStatus(@Param("search") String search, @Param("status") JobStatus status, Pageable pageable);

    Page<JobPosting> findByCreatedById(Long createdById, Pageable pageable);
}
