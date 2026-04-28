package com.duckie.backend.service;

import org.springframework.stereotype.Component;

import com.duckie.backend.dto.JobTemplateResponse;
import com.duckie.backend.entity.JobTemplate;

@Component
public class JobTemplateMapper {
    public JobTemplateResponse toResponse(JobTemplate template){
        if(template == null) return null;
        return new JobTemplateResponse(
            template.getId(),
            template.getTitle(),
            template.getDepartment(),
            template.getDescription(),
            template.getRequirements(),
            template.getIsActive(),
            template.getCreatedById(),
            template.getCreatedAt(),
            template.getUpdatedAt()
        );
    }
}


