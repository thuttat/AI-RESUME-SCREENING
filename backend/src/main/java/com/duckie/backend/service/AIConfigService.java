package com.duckie.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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

    public String testAiConnection(MultipartFile file) {
        String apiKey = aiConfigRepository.findByConfigKey("API_KEY")
                .map(AIConfig::getConfigValue)
                .orElseThrow(() -> new RuntimeException("Chưa cấu hình API Key!"));
                
        String model = aiConfigRepository.findByConfigKey("MODEL_NAME")
                .map(AIConfig::getConfigValue)
                .orElse("gpt-4o-mini"); 

        String extractedText = "Giả lập nội dung trích xuất từ file: " + file.getOriginalFilename();
        return aiService.testConnection(apiKey, model, extractedText);
    }
}