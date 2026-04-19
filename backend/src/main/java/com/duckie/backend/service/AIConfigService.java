package com.duckie.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.duckie.backend.dto.AIConfigRequest;
import com.duckie.backend.dto.AIConfigResponse;
import com.duckie.backend.entity.AIConfig;
import com.duckie.backend.repository.AIConfigRepository;
import com.duckie.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AIConfigService {

    private final AIConfigRepository aiConfigRepository;
    private final AIConfigMapper aiConfigMapper; 
    private final UserRepository userRepository;
    private final AIService aiService;

    @Transactional(readOnly = true)
    public List<AIConfigResponse> getAllConfigs() {
        return aiConfigRepository.findAll().stream()
                .map(aiConfigMapper::toResponse) 
                .collect(Collectors.toList());
    }

   
    @Transactional
    public AIConfigResponse updateConfig(AIConfigRequest request, String username) {
        AIConfig config = aiConfigRepository.findByConfigKey(request.configKey())
                .orElse(AIConfig.builder().configKey(request.configKey()).build());

        config.setConfigValue(request.configValue());

        userRepository.findByUsername(username).ifPresent(admin -> {
            config.setUpdatedBy(admin);
        });

        AIConfig savedConfig = aiConfigRepository.save(config);
        
        return aiConfigMapper.toResponse(savedConfig);
    }

    
}