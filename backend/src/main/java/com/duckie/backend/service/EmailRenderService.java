package com.duckie.backend.service;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class EmailRenderService {
    public String renderContent(String rawContent, Map<String,String> variables) {
        if (rawContent == null || rawContent.isBlank() || variables == null || variables.isEmpty()) {
            return rawContent;
        }
        String renderedContent = rawContent;
        
        for (Map.Entry<String, String> entry : variables.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue() != null ? entry.getValue() : ""; 
            renderedContent = renderedContent.replace(key, value);
        }
        return renderedContent;
    }
}
