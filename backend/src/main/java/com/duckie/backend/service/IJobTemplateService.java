package com.duckie.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.duckie.backend.dto.JobTemplateRequest;
import com.duckie.backend.dto.JobTemplateResponse;

public interface IJobTemplateService {
    Page<JobTemplateResponse> findAll(String search, Pageable pageable);
    JobTemplateResponse findById(Long id);
    JobTemplateResponse create(JobTemplateRequest request);
    JobTemplateResponse update(Long id, JobTemplateRequest request);
    JobTemplateResponse patchUpdate(Long id, JobTemplateRequest request);
    void delete(Long id);
}