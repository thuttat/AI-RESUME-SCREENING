package com.duckie.backend.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
import com.duckie.backend.service.EmailTemplateMapper;
import com.duckie.backend.repository.EmailTemplateRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailTemplateService {

    private final EmailTemplateRepository emailTemplateRepository;
    private final EmailTemplateMapper emailTemplateMapper;
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

    @Transactional
    public EmailTemplateResponse create(EmailTemplateRequest request) {
        if (request.templateName() != null && !request.templateName().isBlank()) {
            if (emailTemplateRepository.findByTemplateName(request.templateName()).isPresent()) {
                throw new RuntimeException("Tên Template '" + request.templateName() + "' đã tồn tại!");
            }
        }

        EmailTemplate template = emailTemplateMapper.toEntity(request);
        EmailTemplate savedTemplate = emailTemplateRepository.save(template);
        
        return emailTemplateMapper.toResponse(savedTemplate);
    }

    @Transactional
    public EmailTemplateResponse update(Long id, EmailTemplateRequest request) {
        EmailTemplate template = emailTemplateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy mẫu Email ID: " + id));

        emailTemplateMapper.updateEntityFromRequest(request, template);

        EmailTemplate updatedTemplate = emailTemplateRepository.save(template);
        return emailTemplateMapper.toResponse(updatedTemplate);
    }

    @Transactional
    public void delete(Long id) {
        if (!emailTemplateRepository.existsById(id)) {
            throw new ResourceNotFoundException("Không tìm thấy mẫu Email ID: " + id);
        }
        emailTemplateRepository.deleteById(id);
    }
    @Transactional(readOnly = true)
    public EmailPreviewResponse preview(Long id, Map<String, String> mockData) {
        EmailTemplate template = emailTemplateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy mẫu Email ID: " + id));

        String previewSubject = template.getSubject();
        String previewBody = template.getBody();

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

        return new EmailPreviewResponse(previewSubject, previewBody);
    }
}