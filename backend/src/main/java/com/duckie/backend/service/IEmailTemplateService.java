package com.duckie.backend.service;

import java.util.Map;
import com.duckie.backend.dto.EmailPreviewResponse;
import com.duckie.backend.dto.EmailTemplateRequest; 
import com.duckie.backend.dto.EmailTemplateResponse;
import com.duckie.backend.dto.PaginationResponse;
import com.duckie.backend.entity.EmailTemplate;

public interface IEmailTemplateService {
    PaginationResponse<EmailTemplateResponse> findAll(String search, int page, int size);
    
    EmailTemplateResponse create(EmailTemplateRequest request);
    
    EmailTemplateResponse update(Long id, EmailTemplateRequest request);
    
    void delete(Long id);
    
    EmailPreviewResponse preview(Long id, Map<String, String> variables);

   
    EmailTemplate createEmailTemplate(EmailTemplate emailTemplate);
    EmailTemplate updateEmailTemplate(Long id, EmailTemplate emailTemplate);
}