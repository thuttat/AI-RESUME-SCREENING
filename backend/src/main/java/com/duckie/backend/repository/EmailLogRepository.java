package com.duckie.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.duckie.backend.entity.EmailLog;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmailLogRepository extends JpaRepository<EmailLog, Long> {
    List<EmailLog> findAllByOrderBySentAtDesc();

    @Query("SELECT e FROM EmailLog e WHERE e.application.jobPosting.createdBy.username = :username ORDER BY e.sentAt DESC")
    Page<EmailLog> findEmailLogsByRecruiter(@Param("username") String username, Pageable pageable);
}