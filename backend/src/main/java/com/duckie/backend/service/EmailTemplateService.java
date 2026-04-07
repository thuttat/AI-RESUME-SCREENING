package com.duckie.backend.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.duckie.backend.dto.EmailPreviewResponse;
import com.duckie.backend.dto.EmailTemplateRequest;
import com.duckie.backend.dto.EmailTemplateResponse;
import com.duckie.backend.dto.PaginationResponse;
import com.duckie.backend.entity.EmailTemplate;
import com.duckie.backend.repository.EmailTemplateRepository;

@Service
public class EmailTemplateService implements IEmailTemplateService {
    private static final Logger logger=LoggerFactory.getLogger(EmailTemplateService.class); 

    private final EmailTemplateRepository emailTemplateRepository;

    private final EmailTemplateMapper emailTemplateMapper;

    private final EmailRenderService emailRenderService;

    public EmailTemplateService(EmailTemplateRepository emailTemplateRepository, EmailTemplateMapper emailTemplateMapper, EmailRenderService emailRenderService) {
        this.emailTemplateRepository = emailTemplateRepository;
        this.emailTemplateMapper = emailTemplateMapper;
        this.emailRenderService = emailRenderService;
    }

    @Transactional(readOnly = true)
    public PaginationResponse<EmailTemplateResponse> findAll(String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<EmailTemplate> pageResult = emailTemplateRepository.findAllBySearch(search, pageable);

        List<EmailTemplateResponse> content = pageResult.getContent().stream()
                .map(emailTemplateMapper::toResponse)
                .collect(Collectors.toList());

        return PaginationResponse.<EmailTemplateResponse>builder()
                .content(content)
                .pageNo(pageResult.getNumber())
                .pageSize(pageResult.getSize())
                .totalElements(pageResult.getTotalElements())
                .totalPages(pageResult.getTotalPages())
                .last(pageResult.isLast())
                .build();
    }

    @Transactional
    public EmailTemplateResponse create(EmailTemplateRequest request) {
        EmailTemplate template = EmailTemplate.builder()
                .templateName(request.templateName())
                .subject(request.subject())
                .body(request.body())
                .isActive(true)
                .build();
                
        template = emailTemplateRepository.save(template);
        logger.info("Created new email template with id: {}", template.getId());
        return emailTemplateMapper.toResponse(template);
    }

    @Transactional
    public EmailTemplateResponse update(Long id, EmailTemplateRequest request) {
        EmailTemplate template = emailTemplateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Email template not found by Id: " + id));
        template.setTemplateName(request.templateName());
        template.setSubject(request.subject());
        template.setBody(request.body());
        
        template = emailTemplateRepository.save(template);
        logger.info("Updated email template with id: {}", template.getId());
        return emailTemplateMapper.toResponse(template);
    }

    @Transactional
    public void delete(Long id) {
       EmailTemplate template = emailTemplateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Email template not found by Id: " + id));
        
        template.setIsActive(false);
        emailTemplateRepository.save(template);
        logger.info("Deleted email template with id: {}", id);
    }

    @Transactional(readOnly = true)
    public EmailPreviewResponse preview(Long id, Map<String, String> variables) {
        EmailTemplate template = emailTemplateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Email template not found by Id: " + id));
        String renderedSubject = emailRenderService.renderContent(template.getSubject(), variables);
        String renderedBody = emailRenderService.renderContent(template.getBody(), variables);
        return new EmailPreviewResponse(renderedSubject, renderedBody);
    }    


    @Override
    public EmailTemplate createEmailTemplate(EmailTemplate emailTemplate) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public EmailTemplate updateEmailTemplate(Long id, EmailTemplate emailTemplate) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void deleteEmailTemplate(Long id) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public PaginationResponse<EmailTemplateResponse> findAllEmailTemplate(String search, int page, int size) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
    
}
