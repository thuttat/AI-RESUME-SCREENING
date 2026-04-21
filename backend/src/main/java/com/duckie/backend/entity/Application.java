package com.duckie.backend.entity;

import java.time.Instant;
import java.util.List;

import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="application", indexes = {
    @Index(name = "idx_application_status", columnList = "status")
}) 
public class Application extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private JobPosting jobPosting;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cv_id", nullable = false)
    private CV cv;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable=false)
    private Status status; 

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Evaluation> evaluations;


    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EmailLog> emailLogs;

    @Column(name="note", columnDefinition = "TEXT")
    private String note;

    public Application(){}

    public Long getId(){ 
        return id; 
    }
    public void setId(Long id){ 
        this.id=id; 
    }
    public JobPosting getJobPosting(){ 
        
        return jobPosting; 
    }
    public void setJobPosting(JobPosting jobPosting){ 
        this.jobPosting = jobPosting; 
    }
    public CV getCV(){ 
        return cv; 
    }
    public void setCV(CV cv){ 
        this.cv = cv; 
    }
    public Status getStatus(){ 
        return status; 
    }
    public void setStatus(Status status){ 
        this.status = status; 
    }
    public List<Evaluation> getEvaluations() { 
        return evaluations; 
    }
    public void setEvaluations(List<Evaluation> evaluations) { 
        this.evaluations = evaluations; 
    }
    
    public List<EmailLog> getEmailLogs() { 
        return emailLogs; 
    }
    public void setEmailLogs(List<EmailLog> emailLogs) { 
        this.emailLogs = emailLogs; 
    }

    public static ApplicationBuilder builder() { 
        return new ApplicationBuilder(); 
    }
    public String getNote() {
        return note;
    }
    public void setNote(String note) {
        this.note = note;
    }

    public static final class ApplicationBuilder{
        private Long id;
        private JobPosting jobPosting;
        private CV cv;
        private Status status; 
        private Instant createdAt;
        private Instant updatedAt;
        private List<Evaluation> evaluations;
        private List<EmailLog> emailLogs; 
        private String note;

        public ApplicationBuilder id(Long id){ 
            this.id = id; 
            return this; 
        }
        public ApplicationBuilder jobPosting(JobPosting jobPosting){ 
            this.jobPosting=jobPosting; 
            return this; 
        }
        public ApplicationBuilder cv(CV cv){ 
            this.cv = cv; 
            return this; 
        }
        public ApplicationBuilder status(Status status){ 
            this.status = status; 
            return this; 
        }
        public ApplicationBuilder createdAt(Instant createdAt){ 
            this.createdAt = createdAt; 
            return this; }
        public ApplicationBuilder updatedAt(Instant updatedAt){ 
            this.updatedAt = updatedAt; 
            return this; }
        public ApplicationBuilder evaluations(List<Evaluation> evaluations){ 
            this.evaluations = evaluations; 
            return this; }
        public ApplicationBuilder emailLogs(List<EmailLog> emailLogs){ 
            this.emailLogs = emailLogs; 
            return this; }
        public ApplicationBuilder note(String note) {
            this.note = note;
            return this;
        }

        public Application build(){
            Application application = new Application();
            application.setId(this.id);
            application.setJobPosting(this.jobPosting);
            application.setCV(this.cv);
            application.setStatus(this.status);
            application.setCreatedAt(this.createdAt);
            application.setUpdatedAt(this.updatedAt);
            application.setEvaluations(this.evaluations);
            application.setEmailLogs(this.emailLogs);
            application.setNote(this.note); 
            return application;
        }
    }
}