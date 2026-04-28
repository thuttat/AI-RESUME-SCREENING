package com.duckie.backend.service;

import org.springframework.stereotype.Component;

import com.duckie.backend.dto.EmailTemplateResponse;
import com.duckie.backend.entity.EmailTemplate;

@Component
public class EmailTemplateMapper {
    public EmailTemplateResponse toResponse(EmailTemplate template){
        if(template == null) return null;
        return new EmailTemplateResponse(
            template.getId(),
            template.getType(),
            template.getSubject(),
            template.getBody(),
            template.getIsActive(),
            template.getCreatedAt(),
            template.getUpdatedAt()
        );
    }
}
