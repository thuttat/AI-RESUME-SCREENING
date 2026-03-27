package com.duckie.backend.repository;

import com.duckie.backend.model.CV;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CVRepository extends JpaRepository<CV, Long> {
    Page<CV> findByUserId(Long userId, Pageable pageable);

    @Query("SELECT c FROM CV c WHERE " +
            "(:search IS NULL OR c.fileName LIKE %:search%)")
    Page<CV> findAllBySearch(@Param("search") String search, Pageable pageable);
}
