package com.duckie.backend.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.duckie.backend.dto.EmailPreviewResponse;
import com.duckie.backend.dto.EmailTemplateRequest;
import com.duckie.backend.dto.EmailTemplateResponse;
import com.duckie.backend.dto.PaginationResponse;
import com.duckie.backend.entity.EmailTemplate;
import com.duckie.backend.exception.ResourceNotFoundException;
import com.duckie.backend.mapper.EmailTemplateMapper;
import com.duckie.backend.repository.EmailTemplateRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailTemplateService implements IEmailTemplateService {

    private static final Logger logger = LoggerFactory.getLogger(EmailTemplateService.class);

    private final EmailTemplateRepository emailTemplateRepository;
    private final EmailTemplateMapper emailTemplateMapper;
    private final EmailRenderService emailRenderService;

    @Override
    @Transactional(readOnly = true)
    public PaginationResponse<EmailTemplateResponse> findAll(String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<EmailTemplate> templatePage = emailTemplateRepository.searchTemplates(search, pageable);
        List<EmailTemplateResponse> content = templatePage.getContent().stream()
                .map(emailTemplateMapper::toResponse)
                .collect(Collectors.toList());
        return PaginationResponse.<EmailTemplateResponse>builder()
                .content(content)
                .pageNo(templatePage.getNumber())
                .pageSize(templatePage.getSize())
                .totalElements(templatePage.getTotalElements())
                .totalPages(templatePage.getTotalPages())
                .last(templatePage.isLast())
                .build();
    }

    @Override
    @Transactional
    public EmailTemplateResponse create(EmailTemplateRequest request) {
        if (request.templateName() != null && !request.templateName().isBlank()) {
            if (emailTemplateRepository.existsByTemplateName(request.templateName())) {
                throw new RuntimeException("This email '" + request.templateName() + "' already exist!");
            }
        }

        EmailTemplate template = emailTemplateMapper.toEntity(request);
        EmailTemplate savedTemplate = emailTemplateRepository.save(template);

        logger.info("Created new email template with id: {} and type: {}", savedTemplate.getId(), savedTemplate.getType());
        return emailTemplateMapper.toResponse(savedTemplate);
    }

    @Override
    @Transactional
    public EmailTemplateResponse update(Long id, EmailTemplateRequest request) {
        EmailTemplate template = emailTemplateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find Email ID: " + id));

        if (request.templateName() != null && !request.templateName().isBlank()
                && !request.templateName().equals(template.getTemplateName())) {
            if (emailTemplateRepository.existsByTemplateName(request.templateName())) {
                throw new RuntimeException("This Template '" + request.templateName() + "' already exist!");
            }
        }

        emailTemplateMapper.updateEntityFromRequest(request, template);

        EmailTemplate updatedTemplate = emailTemplateRepository.save(template);
        logger.info("Updated email template with id: {}", updatedTemplate.getId());
        return emailTemplateMapper.toResponse(updatedTemplate);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmailTemplate template = emailTemplateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("cannot find this Email ID: " + id));

        template.setIsActive(false);
        emailTemplateRepository.save(template);
        logger.info("Soft deleted email template with id: {}", id);
    }

    @Override
    @Transactional(readOnly = true)
    public EmailPreviewResponse preview(Long id, Map<String, String> mockData) {
        EmailTemplate template = emailTemplateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find this Email ID: " + id));

        String previewSubject = template.getSubject();
        String previewBody = template.getBody();

        if (emailRenderService != null) {
            previewSubject = emailRenderService.renderContent(previewSubject, mockData);
            previewBody = emailRenderService.renderContent(previewBody, mockData);
        } else {
            if (mockData != null && !mockData.isEmpty()) {
                for (Map.Entry<String, String> entry : mockData.entrySet()) {
                    String placeholder = "[" + entry.getKey() + "]";
                    if (previewSubject != null) {
                        previewSubject = previewSubject.replace(placeholder, entry.getValue());
                    }
                    if (previewBody != null) {
                        previewBody = previewBody.replace(placeholder, entry.getValue());
                    }
                }
            }
        }

        return new EmailPreviewResponse(previewSubject, previewBody);
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
                .orElseThrow(() -> new ResourceNotFoundException("cannot find this Email ID: " + id));

        existing.setTemplateName(emailTemplate.getTemplateName());
        existing.setType(emailTemplate.getType());
        existing.setSubject(emailTemplate.getSubject());
        existing.setBody(emailTemplate.getBody());
        existing.setIsActive(emailTemplate.getIsActive());

        return emailTemplateRepository.save(existing);
    }
}