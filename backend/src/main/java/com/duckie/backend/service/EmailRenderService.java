package com.duckie.backend.service;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class EmailRenderService {
    public String renderContent(String content, Map<String, String> variables) {
        if (content == null || variables == null) return content;
        
        String rendered = content;
        for (Map.Entry<String, String> entry : variables.entrySet()) {
            String placeholder = "\\{\\{" + entry.getKey() + "\\}\\}";
            rendered = rendered.replaceAll(placeholder, entry.getValue());
        }
        return rendered;
    }
}