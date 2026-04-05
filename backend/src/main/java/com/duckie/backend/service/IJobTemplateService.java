package com.duckie.backend.service;

import java.util.List;

import com.duckie.backend.entity.JobTemplate;

public interface IJobTemplateService {
    List<JobTemplate> getAllJobTemplates();
    List<JobTemplate> searchTemplates(String keyword);
    JobTemplate getJobTemplateById(Long id);
    JobTemplate createJobTemplate(JobTemplate jobTemplate);     
    JobTemplate updateJobTemplate(Long id, JobTemplate jobTemplate);
    void deleteJobTemplate(Long id);
}
    