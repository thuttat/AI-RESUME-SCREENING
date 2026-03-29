package com.duckie.backend.repository;

import com.duckie.backend.entity.AIConfig;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AIConfigRepository extends JpaRepository<AIConfig, Long> {
    Optional<AIConfig> findByConfigKey(String configKey);

    boolean existsByConfigKey(String configKey);
}
