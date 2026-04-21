package com.duckie.backend.mapper;

import org.springframework.stereotype.Component;

import com.duckie.backend.dto.JobPostingRequest;
import com.duckie.backend.dto.JobPostingResponse;
import com.duckie.backend.entity.JobPosting;
import com.duckie.backend.entity.JobStatus;
import com.duckie.backend.entity.User;

@Component
public class JobMapper {

    public JobPosting toEntity(JobPostingRequest request, User recruiter) {
        if (request == null) return null;

        return JobPosting.builder()
                .title(request.title())
                .description(request.description())
                .requiredSkills(request.requiredSkills())
                .status(JobStatus.OPEN) 
                .createdBy(recruiter)
                .build();
    }

    public JobPostingResponse toResponse(JobPosting job) {
        if (job == null) return null;

        return new JobPostingResponse(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getRequiredSkills(),
                job.getStatus(),
                job.getCreatedBy() != null ? job.getCreatedBy().getId() : null,
                job.getCreatedAt(),
                job.getUpdatedAt(),
                job.getApplications() != null ? job.getApplications().size() : 0
        );
    }

    public JobPostingResponse toResponse(JobPosting job, long validApplicantCount) {
        if (job == null) return null;

        return new JobPostingResponse(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getRequiredSkills(),
                job.getStatus(),
                job.getCreatedBy() != null ? job.getCreatedBy().getId() : null,
                job.getCreatedAt(),
                job.getUpdatedAt(),
                (int) validApplicantCount
        );
    }
}