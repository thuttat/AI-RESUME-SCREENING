package com.duckie.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.duckie.backend.dto.JobTemplateRequest;
import com.duckie.backend.dto.JobTemplateResponse;
import com.duckie.backend.entity.JobTemplate;
import com.duckie.backend.exception.ResourceNotFoundException;
import com.duckie.backend.mapper.JobTemplateMapper;
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

    @Transactional(readOnly = true)
    public List<JobTemplateResponse> findAll() {  
        List<JobTemplate> templates = jobTemplateRepository.findAll();
        return templates.stream()
                .map(jobTemplateMapper::toResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public Page<JobTemplateResponse> findAll(String search, Pageable pageable) {
        Page<JobTemplate> page = jobTemplateRepository.findAllBySearch(search, pageable);
        return page.map(jobTemplateMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public JobTemplateResponse findById(Long id){
        JobTemplate template = jobTemplateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job template not found by Id: " + id));
        return jobTemplateMapper.toResponse(template);
    }

    @Transactional()
    public JobTemplateResponse create(JobTemplateRequest request) {
        JobTemplate template = JobTemplate.builder()
                .title(request.title())
                .description(request.description())
                .isActive(true)
                .build();
                
        template = jobTemplateRepository.save(template);
        logger.info("Created new job template with id: {}", template.getId());
        return jobTemplateMapper.toResponse(template);
    }

    @Transactional
    public JobTemplateResponse update(Long id, JobTemplateRequest request) {
        JobTemplate template = jobTemplateRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Job template not found by Id: " + id));

        template.setTitle(request.title());
        template.setDescription(request.description());

        template = jobTemplateRepository.save(template);
        return jobTemplateMapper.toResponse(template);
    }

    @Transactional()
    public JobTemplateResponse patchUpdate(Long id, JobTemplateRequest request){
        JobTemplate template = jobTemplateRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Job template not found by Id: " + id));

        if (request.title() != null && !request.title().isBlank()) { 
            template.setTitle(request.title());
        }
        if (request.description() != null && !request.description().isBlank()) { 
            template.setDescription(request.description());
        }

        template = jobTemplateRepository.save(template);
        return jobTemplateMapper.toResponse(template);
    }

    @Transactional()
    public void delete(Long id) {
        JobTemplate template = jobTemplateRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Job template not found by Id: " + id));        
        template.setIsActive(false);
        jobTemplateRepository.save(template);
        logger.info("Soft deleted job template with id: {}", id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<JobTemplate> getAllJobTemplates() {
        return jobTemplateRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<JobTemplate> searchTemplates(String keyword) {
        return jobTemplateRepository.findAllBySearch(keyword, Pageable.unpaged()).getContent();
    }

    @Override
    @Transactional(readOnly = true)
    public JobTemplate getJobTemplateById(Long id) {
        return jobTemplateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job template not found with id: " + id));
    }

    @Override
    @Transactional
    public JobTemplate createJobTemplate(JobTemplate jobTemplate) {
        jobTemplate.setIsActive(true);
        return jobTemplateRepository.save(jobTemplate);
    }

    @Override
    @Transactional
    public JobTemplate updateJobTemplate(Long id, JobTemplate updatedData) {
        JobTemplate existing = getJobTemplateById(id);
        existing.setTitle(updatedData.getTitle());
        existing.setDescription(updatedData.getDescription());
        return jobTemplateRepository.save(existing);
    }

    @Override
    @Transactional
    public void deleteJobTemplate(Long id) {
        JobTemplate template = getJobTemplateById(id);
        template.setIsActive(false);
        jobTemplateRepository.save(template);
        logger.info("Soft deleted job template with id: {}", id);
    }

    
}