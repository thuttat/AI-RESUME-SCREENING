package com.duckie.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.duckie.backend.entity.EmailLog;

public interface EmailLogRepository extends JpaRepository<EmailLog, Long> {
    List<EmailLog> findAllByOrderBySentAtDesc();
}