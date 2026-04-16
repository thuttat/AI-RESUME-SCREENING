package com.duckie.backend.mapper;

import org.springframework.stereotype.Component;

import com.duckie.backend.dto.AIConfigResponse;
import com.duckie.backend.entity.AIConfig;

@Component
public class AIConfigMapper {

    public AIConfigResponse toResponse(AIConfig config) {
        if (config == null) {
            return null;
        }

        Long updatedById = (config.getUpdatedBy() != null) ? config.getUpdatedBy().getId() : null;

        return new AIConfigResponse(
                config.getId(),
                config.getConfigKey(),
                config.getConfigValue(),
                updatedById,
                config.getCreatedAt(),
                config.getUpdatedAt()
        );
    }
}