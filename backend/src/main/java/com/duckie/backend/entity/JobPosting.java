package com.duckie.backend.entity;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "job_posting", indexes = {
    @Index(name = "idx_job_status", columnList = "status")
})
public class JobPosting{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "required_skills", columnDefinition = "TEXT")
    private String requiredSkills;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private JobStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @Column(name = "created_at")
    private Instant createdAt;

    public JobPosting() {}

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = Instant.now();
    }

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }
    public String getTitle() { 
        return title; 
    }
    public void setTitle(String title) { 
        this.title = title; 
    }
    public String getDescription() { 
        return description; 
    }
    public void setDescription(String description) { 
        this.description = description; 
    }
    public String getRequiredSkills() { 
        return requiredSkills; 
    }
    public void setRequiredSkills(String requiredSkills) { 
        this.requiredSkills = requiredSkills; 
    }
    public JobStatus getStatus() { 
        return status; 
    }
    public void setStatus(JobStatus status) { 
        this.status = status; 
    }
    public User getCreatedBy() { 
        return createdBy; 
    }
    public void setCreatedBy(User createdBy) { 
        this.createdBy = createdBy; 
    }
    public Instant getCreatedAt() { 
        return createdAt; 
    }
    public void setCreatedAt(Instant createdAt) { 
        this.createdAt = createdAt; 
    }

    public static JobPostingBuilder builder() { 
        return new JobPostingBuilder(); 
    }

    public static final class JobPostingBuilder {
        private Long id;
        private String title;
        private String description;
        private String requiredSkills;
        private JobStatus status;
        private User createdBy;
        private Instant createdAt;

        public JobPostingBuilder id(Long id) { 
            this.id = id; 
            return this; 
        }
        public JobPostingBuilder title(String title) { 
            this.title = title; 
            return this; 
        }
        public JobPostingBuilder description(String description) { 
            this.description = description; 
            return this; 
        }
        public JobPostingBuilder requiredSkills(String requiredSkills) { 
            this.requiredSkills = requiredSkills; 
            return this; }
        public JobPostingBuilder status(JobStatus status) { 
            this.status = status; 
            return this; 
        }
        public JobPostingBuilder createdBy(User createdBy) { 
            this.createdBy = createdBy; 
            return this; 
        }
        public JobPostingBuilder createdAt(Instant createdAt) { 
            this.createdAt = createdAt; 
            return this; 
        }

        public JobPosting build() {
            JobPosting jobPosting = new JobPosting();
            jobPosting.setId(this.id);
            jobPosting.setTitle(this.title);
            jobPosting.setDescription(this.description);
            jobPosting.setRequiredSkills(this.requiredSkills);
            jobPosting.setStatus(this.status);
            jobPosting.setCreatedBy(this.createdBy);
            jobPosting.setCreatedAt(this.createdAt);
            return jobPosting;
        }
    }
}