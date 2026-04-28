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
    private static final Logger logger = LoggerFactory.getLogger(EmailTemplateService.class); 

    private final EmailTemplateRepository emailTemplateRepository;
    private final EmailTemplateMapper emailTemplateMapper;
    private final EmailRenderService emailRenderService;

    public EmailTemplateService(EmailTemplateRepository emailTemplateRepository, 
                                EmailTemplateMapper emailTemplateMapper, 
                                EmailRenderService emailRenderService) {
        this.emailTemplateRepository = emailTemplateRepository;
        this.emailTemplateMapper = emailTemplateMapper;
        this.emailRenderService = emailRenderService;
    }


    @Override
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

    @Override
    @Transactional
    public EmailTemplateResponse create(EmailTemplateRequest request) {
        if (emailTemplateRepository.existsByType(request.type())) {
            throw new RuntimeException("Email template with type '" + request.type() + "' already exists.");
        }

        EmailTemplate template = EmailTemplate.builder()
                .type(request.type())
                .subject(request.subject())
                .body(request.body())
                .isActive(true)
                .build();
                
        template = emailTemplateRepository.save(template);
        logger.info("Created new email template with id: {} and type: {}", template.getId(), template.getType());
        return emailTemplateMapper.toResponse(template);
    }

    @Override
    @Transactional
    public EmailTemplateResponse update(Long id, EmailTemplateRequest request) {
        EmailTemplate template = emailTemplateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Email template not found by Id: " + id));
        
        if (!template.getType().equals(request.type()) && emailTemplateRepository.existsByType(request.type())) {
            throw new RuntimeException("Email template with type '" + request.type() + "' already exists.");
        }

        template.setType(request.type());
        template.setSubject(request.subject());
        template.setBody(request.body());
        
        template = emailTemplateRepository.save(template);
        logger.info("Updated email template with id: {}", template.getId());
        return emailTemplateMapper.toResponse(template);
    }

    @Override
    @Transactional
    public void delete(Long id) {
       EmailTemplate template = emailTemplateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Email template not found by Id: " + id));
        template.setIsActive(false);
        emailTemplateRepository.save(template);
        logger.info("Soft deleted email template with id: {}", id);
    }

    @Override
    @Transactional(readOnly = true)
    public EmailPreviewResponse preview(Long id, Map<String, String> variables) {
        EmailTemplate template = emailTemplateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Email template not found by Id: " + id));
        
       
        String renderedSubject = emailRenderService.renderContent(template.getSubject(), variables);
        String renderedBody = emailRenderService.renderContent(template.getBody(), variables);
        
        return new EmailPreviewResponse(renderedSubject, renderedBody);
    }    

   
    @Override
    @Transactional
    public EmailTemplate createEmailTemplate(EmailTemplate emailTemplate) {
        if (emailTemplate.getIsActive() == null) {
            emailTemplate.setIsActive(true);
        }
        return emailTemplateRepository.save(emailTemplate);
    }

    @Override
    @Transactional
    public EmailTemplate updateEmailTemplate(Long id, EmailTemplate emailTemplate) {
        EmailTemplate existing = emailTemplateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Email template not found by Id: " + id));
        
        existing.setType(emailTemplate.getType());
        existing.setSubject(emailTemplate.getSubject());
        existing.setBody(emailTemplate.getBody());
        existing.setIsActive(emailTemplate.getIsActive());
        
        return emailTemplateRepository.save(existing);
    }

    
}