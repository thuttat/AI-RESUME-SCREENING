package com.duckie.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.duckie.backend.entity.JobTemplate;

public interface JobTemplateRepository extends JpaRepository<JobTemplate, Long> {
   @Query("SELECT jt FROM JobTemplate jt WHERE " +
           "jt.isActive = true AND " + 
           "(:search IS NULL OR LOWER(jt.title) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<JobTemplate> findAllBySearch(@Param("search") String search, Pageable pageable);
}

