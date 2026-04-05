package com.duckie.backend.service;

import java.util.Map;

import com.duckie.backend.dto.EmailPreviewResponse;
import com.duckie.backend.dto.EmailTemplateResponse;
import com.duckie.backend.dto.PaginationResponse;
import com.duckie.backend.entity.EmailTemplate;

public interface IEmailTemplateService {
    PaginationResponse<EmailTemplateResponse> findAllEmailTemplate(String search, int page, int size);
    EmailTemplate createEmailTemplate(EmailTemplate emailTemplate);
    EmailTemplate updateEmailTemplate(Long id, EmailTemplate emailTemplate);
    void deleteEmailTemplate(Long id);
    EmailPreviewResponse preview(Long id, Map<String, String> variables);
}
