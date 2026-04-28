package com.duckie.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.duckie.backend.entity.EmailTemplate;

public interface EmailTemplateRepository extends JpaRepository<EmailTemplate, Long> {
    Optional<EmailTemplate> findByType(String type);

    boolean existsByType(String type);

    boolean existsByTypeAndIdNot(String type, Long id);

    @Query("SELECT e FROM EmailTemplate e WHERE e.isActive = true AND " +
           "(:search IS NULL OR LOWER(e.type) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(e.subject) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<EmailTemplate> findAllBySearch(@Param("search") String search, Pageable pageable);
}