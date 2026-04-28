package com.duckie.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.duckie.backend.dto.JobTemplateRequest;
import com.duckie.backend.dto.JobTemplateResponse;
import com.duckie.backend.entity.JobTemplate;

public interface IJobTemplateService {
    Page<JobTemplateResponse> findAll(String search, Pageable pageable);
    JobTemplateResponse findById(Long id);
    JobTemplateResponse create(JobTemplateRequest request);
    JobTemplateResponse update(Long id, JobTemplateRequest request);
    JobTemplateResponse patchUpdate(Long id, JobTemplateRequest request);
    void delete(Long id);

    List<JobTemplate> getAllJobTemplates();
    List<JobTemplate> searchTemplates(String keyword);
    JobTemplate getJobTemplateById(Long id);
    JobTemplate createJobTemplate(JobTemplate jobTemplate);
    JobTemplate updateJobTemplate(Long id, JobTemplate updatedData);
    void deleteJobTemplate(Long id);
}