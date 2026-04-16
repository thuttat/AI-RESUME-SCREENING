package com.duckie.backend.mapper;

import com.duckie.backend.dto.EmailTemplateRequest;
import com.duckie.backend.dto.EmailTemplateResponse;
import com.duckie.backend.entity.EmailTemplate;
import org.springframework.stereotype.Component;

@Component
public class EmailTemplateMapper {

    public EmailTemplateResponse toResponse(EmailTemplate entity) {
        if (entity == null) {
            return null;
        }
        return new EmailTemplateResponse(
            entity.getId(),
            entity.getTemplateName(),
            entity.getSubject(),
            entity.getBody(),
            entity.getUpdatedAt()
        );
    }

    public EmailTemplate toEntity(EmailTemplateRequest request) {
        if (request == null) {
            return null;
        }
        EmailTemplate entity = new EmailTemplate();
        entity.setTemplateName(request.templateName());
        entity.setSubject(request.subject());
        entity.setBody(request.body());
        return entity;
    }

    public void updateEntityFromRequest(EmailTemplateRequest request, EmailTemplate entity) {
        if (request == null || entity == null) {
            return;
        }
        
        if (request.templateName() != null && !request.templateName().isBlank()) {
            entity.setTemplateName(request.templateName());
        }
        
        if (request.subject() != null && !request.subject().isBlank()) {
            entity.setSubject(request.subject());
        }
        
        if (request.body() != null && !request.body().isBlank()) {
            entity.setBody(request.body());
        }
    }
}