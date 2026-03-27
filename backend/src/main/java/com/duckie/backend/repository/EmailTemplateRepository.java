package com.duckie.backend.repository;

import com.duckie.backend.model.EmailTemplate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface EmailTemplateRepository extends JpaRepository<EmailTemplate, Long> {
    Optional<EmailTemplate> findByTemplateName(String templateName);

    boolean existsByTemplateName(String templateName);
    boolean existsByTemplateNameAndIdNot(String templateName, Long id);

    @Query("SELECT e FROM EmailTemplate e WHERE "+
            ":search IS NULL OR LOWER(e.templateName) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<EmailTemplate> findAllBySearch(@Param("search") String search, Pageable pageable);
}
