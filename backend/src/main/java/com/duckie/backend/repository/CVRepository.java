package com.duckie.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.duckie.backend.entity.CV;

@Repository
public interface CVRepository extends JpaRepository<CV, Long> {

    Page<CV> findByUploadedById(Long uploadedById, Pageable pageable);

    @Query("SELECT c FROM CV c WHERE " +
            "(:search IS NULL OR LOWER(c.candidateName) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<CV> findAllBySearch(@Param("search") String search, Pageable pageable);
}