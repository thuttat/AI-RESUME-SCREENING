package com.duckie.backend.service;

import org.slf4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.duckie.backend.dto.JobTemplateRequest;
import com.duckie.backend.dto.JobTemplateResponse;
import com.duckie.backend.entity.JobTemplate;
import com.duckie.backend.repository.JobTemplateRepository;

@Service
public class JobTemplateService implements IJobTemplateService {
    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(JobTemplateService.class);

    private final JobTemplateRepository jobTemplateRepository;
    private final JobTemplateMapper jobTemplateMapper;

    public JobTemplateService(JobTemplateRepository jobTemplateRepository, JobTemplateMapper jobTemplateMapper) {
        this.jobTemplateRepository = jobTemplateRepository;
        this.jobTemplateMapper = jobTemplateMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<JobTemplateResponse> findAll(String search, Pageable pageable) {
        Page<JobTemplate> page = jobTemplateRepository.findAllBySearch(search, pageable);
        return page.map(jobTemplateMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public JobTemplateResponse findById(Long id) {
        JobTemplate template = jobTemplateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job template not found by Id: " + id));
        return jobTemplateMapper.toResponse(template);
    }

    @Override
    @Transactional
    public JobTemplateResponse create(JobTemplateRequest request) {
        JobTemplate template = JobTemplate.builder()
                .title(request.title())
                .department(request.department()) 
                .description(request.description())
                .requirements(request.requirements()) 
                .isActive(true)
                .build();
                
        template = jobTemplateRepository.save(template);
        logger.info("Created new job template: {} (ID: {})", template.getTitle(), template.getId());
        return jobTemplateMapper.toResponse(template);
    }

    @Override
    @Transactional
    public JobTemplateResponse update(Long id, JobTemplateRequest request) {
        JobTemplate template = jobTemplateRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Job template not found by Id: " + id));

        template.setTitle(request.title());
        template.setDepartment(request.department()); 
        template.setDescription(request.description());
        template.setRequirements(request.requirements()); 
        
        if (request.isActive() != null) {
            template.setIsActive(request.isActive());
        }

        template = jobTemplateRepository.save(template);
        return jobTemplateMapper.toResponse(template);
    }

    @Override
    @Transactional
    public JobTemplateResponse patchUpdate(Long id, JobTemplateRequest request) {
        JobTemplate template = jobTemplateRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Job template not found by Id: " + id));
        if (request.title() != null && !request.title().isBlank()) { 
            template.setTitle(request.title());
        }
        if (request.department() != null && !request.department().isBlank()) { 
            template.setDepartment(request.department());
        }
        if (request.description() != null && !request.description().isBlank()) { 
            template.setDescription(request.description());
        }
        if (request.requirements() != null && !request.requirements().isBlank()) { 
            template.setRequirements(request.requirements());
        }
        if (request.isActive() != null) {
            template.setIsActive(request.isActive());
        }

        template = jobTemplateRepository.save(template);
        return jobTemplateMapper.toResponse(template);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        JobTemplate template = jobTemplateRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Job template not found by Id: " + id));        
        template.setIsActive(false);
        jobTemplateRepository.save(template);
        logger.info("Soft deleted job template with id: {}", id);
    }

    
}