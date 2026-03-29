package com.duckie.backend.entity;

import java.time.Instant;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cv", indexes = {
    @Index(name = "idx_cv_email", columnList = "candidate_email")
})
public class CV extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by", nullable=false) 
    private User uploadedBy; 

    @Column(name="candidate_name", nullable=false)
    private String candidateName;

    @Column(name="cv_file_url", updatable=false)
    private String cvFileUrl;

    @Column(name="candidate_email", nullable=false)
    private String candidateEmail;

    @OneToOne(mappedBy = "cv", cascade = CascadeType.ALL)
    private AIAnalysisResult aiAnalysisResult;

    public CV(){}

    public Long getId(){ 
        return id; 
    }
    public void setId(Long id){ 
        this.id=id; 
    }
    public User getUploadedBy(){ 
        return uploadedBy; 
    }
    public void setUploadedBy(User uploadedBy){ 
        this.uploadedBy=uploadedBy; 
    }
    public String getCandidateName(){ 
        return candidateName; 
    }
    public void setCandidateName(String candidateName){ 
        this.candidateName = candidateName; 
    }
    public String getCandidateEmail(){ 
        return candidateEmail; 
    }
    public void setCandidateEmail(String candidateEmail){ 
        this.candidateEmail = candidateEmail; 
    }
    public String getCvFileUrl(){ 
        return cvFileUrl; 
    }
    public void setCvFileUrl(String cvFileUrl){ 
        this.cvFileUrl=cvFileUrl; 
    }
    public AIAnalysisResult getAiAnalysisResult() { 
        return aiAnalysisResult; 
    }
    public void setAiAnalysisResult(AIAnalysisResult aiAnalysisResult) { 
        this.aiAnalysisResult = aiAnalysisResult; 
    }

    public static CVBuilder builder() { 
        return new CVBuilder(); 
    }

    public static final class CVBuilder{
        private Long id;
        private User uploadedBy;
        private String candidateName;
        private String cvFileUrl;
        private String candidateEmail;
        private Instant createdAt;
        private Instant updatedAt;
        private AIAnalysisResult aiAnalysisResult;

        public CVBuilder id(Long id){ 
            this.id = id; 
            return this; 
        }
        public CVBuilder uploadedBy(User uploadedBy){ 
            this.uploadedBy = uploadedBy; 
            return this; 
        }
        public CVBuilder candidateName(String candidateName){ 
            this.candidateName = candidateName; 
            return this; 
        }
        public CVBuilder cvFileUrl(String cvFileUrl){ 
            this.cvFileUrl = cvFileUrl; 
            return this; 
        }
        public CVBuilder candidateEmail(String candidateEmail){ 
            this.candidateEmail = candidateEmail; 
            return this; 
        }
        public CVBuilder createdAt(Instant createdAt){ 
            this.createdAt = createdAt; 
            return this; 
        }        
        public CVBuilder updatedAt(Instant updatedAt){ 
            this.updatedAt = updatedAt; 
            return this; 
        }        
        public CVBuilder aiAnalysisResult(AIAnalysisResult aiAnalysisResult){ 
            this.aiAnalysisResult = aiAnalysisResult; 
            return this; 
        }   
       
        public CV build(){
            CV cv = new CV();
            cv.setId(this.id);
            cv.setUploadedBy(this.uploadedBy);
            cv.setCandidateName(this.candidateName);
            cv.setCandidateEmail(this.candidateEmail);
            cv.setCvFileUrl(this.cvFileUrl);
            cv.setCreatedAt(this.createdAt);
            cv.setUpdatedAt(this.updatedAt);
            cv.setAiAnalysisResult(this.aiAnalysisResult);
            return cv;
        }
    }
}