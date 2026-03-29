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
@Table(name="application", indexes = {
    @Index(name = "idx_application_status", columnList = "status")
}) 
public class Application {
    
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

 
    @Column(name="applied_at", updatable=false)
    private Instant appliedAt;

    public Application(){}

    public Application(
        Long id, 
        JobPosting jobPosting,
        CV cv,
        Status status,
        Instant appliedAt){
            this.id=id;
            this.jobPosting=jobPosting;
            this.cv = cv;
            this.status = status;
            this.appliedAt=appliedAt;
        }


    @PrePersist
    protected void onCreate(){
        Instant now = Instant.now();
        if(this.appliedAt==null){
            this.appliedAt = now;
        }
    }
    //getter||setter
    public Long getID(){
        return id;
    }
    public void setID(Long id){
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

    public Instant getAppliedAt(){
        return appliedAt;
    }
    public void setAppliedAt(Instant appliedAt){
        this.appliedAt=appliedAt;
    }
    public static ApplicationBuilder builder() { 
        return new ApplicationBuilder(); 
    }

    public static final class ApplicationBuilder{
        private Long id;
        private JobPosting jobPosting;
        private CV cv;
        private Status status; 
        private Instant appliedAt;

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
        public ApplicationBuilder appliedAt(Instant appliedAt){
            this.appliedAt = appliedAt;
            return this;
        }
        public Application build(){
            Application application = new Application();
            application.setID(this.id);
            application.setJobPosting(this.jobPosting);
            application.setCV(this.cv);
            application.setStatus(this.status);
            application.setAppliedAt(this.appliedAt);
            return application;
        }
        
    }
    

}
