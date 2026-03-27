package com.duckie.backend.repository;

import com.duckie.backend.model.JobTemplate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JobTemplateRepository extends JpaRepository<JobTemplate, Long> {
    @Query("SELECT jt FROM JobTemplate jt WHERE "+
            ":search IS NULL OR LOWER(jt.title) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<JobTemplate> findAllBySearch(@Param("search") String search, Pageable pageable);
}
