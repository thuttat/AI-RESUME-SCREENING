package com.duckie.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map; 

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.duckie.backend.dto.JobPostingRequest;
import com.duckie.backend.dto.JobPostingResponse;
import com.duckie.backend.entity.JobPosting;
import com.duckie.backend.entity.JobStatus;
import com.duckie.backend.entity.Status; 
import com.duckie.backend.entity.User;
import com.duckie.backend.exception.ResourceNotFoundException;
import com.duckie.backend.mapper.JobMapper;
import com.duckie.backend.repository.ApplicationRepository; 
import com.duckie.backend.repository.JobPostingRepository;
import com.duckie.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobPostingService {

    private final JobPostingRepository jobPostingRepository;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository; 
    private final JobMapper jobMapper;

    @Transactional
    public JobPostingResponse createJobPosting(JobPostingRequest request, String username) {
        User recruiter = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found!"));
        JobPosting newJob = jobMapper.toEntity(request, recruiter);
        return jobMapper.toResponse(jobPostingRepository.save(newJob));
    }

    @Transactional(readOnly = true)
    public List<JobPostingResponse> getJobsByRole(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found!"));
        List<JobPosting> jobs;
        if (user.getRole().name().equals("RECRUITER")) {
            jobs = jobPostingRepository.findByCreatedBy_Username(username);
        } else {
            jobs = jobPostingRepository.findByStatus(JobStatus.OPEN);
        }
        return jobs.stream().map(jobMapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<JobPostingResponse> getJobHistory() {
        return jobPostingRepository.findByStatus(JobStatus.CLOSE)
                .stream().map(jobMapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public Map<String, Long> getJobPipelineReport(Long jobId) {
        if (!jobPostingRepository.existsById(jobId)) {
            throw new ResourceNotFoundException("Job not found!");
        }

        Map<String, Long> report = new HashMap<>();
        report.put("PENDING", applicationRepository.countByJobPostingIdAndStatus(jobId, Status.PENDING));
        report.put("SHORTLIST", applicationRepository.countByJobPostingIdAndStatus(jobId, Status.SHORTLIST));
        report.put("REJECT", applicationRepository.countByJobPostingIdAndStatus(jobId, Status.REJECT));
        report.put("HIRED", applicationRepository.countByJobPostingIdAndStatus(jobId, Status.HIRED));
        report.put("SUCCESS", applicationRepository.countByJobPostingIdAndStatus(jobId, Status.SUCCESS));
        
        return report;
    }


    @Transactional(readOnly = true)
    public JobPostingResponse getJobById(Long jobId, String username) {
        JobPosting job = jobPostingRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found!"));
        return jobMapper.toResponse(job);
    }

    @Transactional
    public JobPostingResponse updateJob(Long jobId, JobPostingRequest request, String username) {
        JobPosting job = getJobIfAuthorized(jobId, username);
        job.setTitle(request.title());
        job.setDescription(request.description());
        job.setRequiredSkills(request.requiredSkills());
        return jobMapper.toResponse(jobPostingRepository.save(job));
    }

    @Transactional
    public void toggleJobStatus(Long jobId, String username) {
        JobPosting job = getJobIfAuthorized(jobId, username);
        job.setStatus(job.getStatus() == JobStatus.OPEN ? JobStatus.CLOSE : JobStatus.OPEN);
        jobPostingRepository.save(job);
    }

    @Transactional
    public void deleteJob(Long jobId, String username) {
        JobPosting job = getJobIfAuthorized(jobId, username);
        jobPostingRepository.delete(job);
    }

    private JobPosting getJobIfAuthorized(Long jobId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found!"));
        JobPosting job = jobPostingRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found!"));
        boolean isAdmin = user.getRole().name().equals("ADMIN");
        boolean isOwner = job.getCreatedBy().getUsername().equals(username);
        if (!isAdmin && !isOwner) {
            throw new ResourceNotFoundException("You do not have permission to modify this job!");
        }
        return job;
    }
}