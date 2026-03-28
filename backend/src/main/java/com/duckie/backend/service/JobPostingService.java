package com.duckie.backend.service;

import com.duckie.backend.dto.JobPostingRequest;
import com.duckie.backend.dto.JobPostingResponse;
import com.duckie.backend.exception.ResourceNotFoundException;
import com.duckie.backend.model.JobPosting;
import com.duckie.backend.model.JobStatus;
import com.duckie.backend.model.Status;
import com.duckie.backend.model.User;
import com.duckie.backend.repository.ApplicationRepository;
import com.duckie.backend.repository.JobPostingRepository;
import com.duckie.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JobPostingService {
    private final JobPostingRepository jobPostingRepository;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;

    @Transactional
    public JobPostingResponse createJobPosting(JobPostingRequest request, String username){
        User recruiter = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found!"));

        JobPosting newJob = JobPosting.builder()
                .title(request.title())
                .description(request.description())
                .requiredSkills(request.requiredSkills())
                .status(JobStatus.OPEN)
                .createdBy(recruiter)
                .build();
        JobPosting savedJob = jobPostingRepository.save(newJob);

        return new JobPostingResponse(
                savedJob.getId(),
                savedJob.getTitle(),
                savedJob.getDescription(),
                savedJob.getRequiredSkills(),
                savedJob.getStatus().name(),
                savedJob.getCreatedAt()
        );    }

    public Page<JobPosting> getJobsByRecruiter(Long recruiterId, Pageable pageable) {
        return jobPostingRepository.findByCreatedById(recruiterId, pageable);
    }

    public Map<String, Long> getJobPipelineReport(Long jobId) {
        Map<String, Long> pipeline = new HashMap<>();

        pipeline.put("PENDING", applicationRepository.countByJobPostingIdAndStatus(jobId, Status.PENDING));
        pipeline.put("HIRED", applicationRepository.countByJobPostingIdAndStatus(jobId, Status.HIRED));
        pipeline.put("SHORTLISTED", applicationRepository.countByJobPostingIdAndStatus(jobId, Status.SHORTLIST));
        pipeline.put("REJECTED", applicationRepository.countByJobPostingIdAndStatus(jobId, Status.REJECT));

        return pipeline;
    }

    @Transactional(readOnly = true)
    public List<JobPostingResponse> getOwnRecruiterJobs(String username) {
        List<JobPosting> jobs = jobPostingRepository.findByCreatedByUsername(username);

        return jobs.stream().map(job -> new JobPostingResponse(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getRequiredSkills(),
                job.getStatus().name(),
                job.getCreatedAt()
        )).toList();
    }

    @Transactional(readOnly = true)
    public JobPostingResponse getJobById(Long jobId, String username) {
        JobPosting job = jobPostingRepository.findByIdAndCreatedByUsername(jobId, username)
                .orElseThrow(() -> new ResourceNotFoundException("Job posting not found!"));

        return new JobPostingResponse(
                job.getId(), job.getTitle(), job.getDescription(),
                job.getRequiredSkills(), job.getStatus().name(), job.getCreatedAt()
        );
    }

    @Transactional
    public JobPostingResponse updateJob(Long jobId, JobPostingRequest request, String username) {
        JobPosting job = jobPostingRepository.findByIdAndCreatedByUsername(jobId, username)
                .orElseThrow(() -> new ResourceNotFoundException("Job posting not found!"));

        job.setTitle(request.title());
        job.setDescription(request.description());
        job.setRequiredSkills(request.requiredSkills());

        JobPosting updatedJob = jobPostingRepository.save(job);

        return new JobPostingResponse(
                updatedJob.getId(), updatedJob.getTitle(), updatedJob.getDescription(),
                updatedJob.getRequiredSkills(), updatedJob.getStatus().name(), updatedJob.getCreatedAt()
        );
    }

    @Transactional
    public void toggleJobStatus(Long jobId, String username) {
        JobPosting job = jobPostingRepository.findByIdAndCreatedByUsername(jobId, username)
                .orElseThrow(() -> new ResourceNotFoundException("Job posting not found!"));

        if (job.getStatus() == JobStatus.OPEN) {
            job.setStatus(JobStatus.CLOSE);
        } else {
            job.setStatus(JobStatus.OPEN);
        }
        jobPostingRepository.save(job);
    }

    @Transactional
    public void deleteJob(Long jobId, String username) {
        JobPosting job = jobPostingRepository.findByIdAndCreatedByUsername(jobId, username)
                .orElseThrow(() -> new ResourceNotFoundException("Job posting not found!"));
        jobPostingRepository.delete(job);
    }
}
