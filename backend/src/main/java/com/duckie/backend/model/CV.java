package com.duckie.backend.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;





@Entity
@Table(name = "cv", indexes = {
    @Index(name = "idx_cv_email", columnList = "candidate_email")
})
public class CV {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name = "uploaded_by", nullable=false)
    private User uploadedBy; 

    @Column(name="candidate_name", nullable=false)
    private String candidateName;

    @Column(name="cv_file_url", updatable=false)
    private String cvFileUrl;

    @Column(name="candidate_email", nullable=false)
    private String candidateEmail;

    @Column(name="uploaded_at",updatable=false)
    private Instant uploadedAt;



    public CV(){}

    public CV(
        Long id,
        User uploadedBy,
        String candidateName,
        String cvFileUrl,
        String candidateEmail,
        Instant uploadedAt
        )
        
        {
            this.id=id;
            this.uploadedBy=uploadedBy;
            this.candidateName=candidateName;
            this.cvFileUrl=cvFileUrl;
            this.candidateEmail=candidateEmail;
            this.uploadedAt=uploadedAt;

        }

    @PrePersist
    protected void onCreate(){
        Instant now = Instant.now();
        if(this.uploadedAt==null){
            this.uploadedAt = now;
        }
    }        

    //getter||setter
    public Long getID(){
        return id;
    }
    public void setID(Long id){
        this.id=id;
    }

    public User getUpLoadedBy(){
        return uploadedBy;
    }
    public void setUpLoadedBy(User uploadedBy){
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
    public void setCVFileURL(String cvFileUrl){
        this.cvFileUrl=cvFileUrl;
    }
    public Instant getUploadedAt(){
        return uploadedAt;
    }
    public void setUloadedAt(Instant uploadedAt){
        this.uploadedAt = uploadedAt;
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
        private Instant uploadedAt;

        public CVBuilder id(Long id){
            this.id = id;
            return this;
        }
        public CVBuilder configKey(User uploadedBy){
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
        public CVBuilder uploadedAt(Instant uploadedAt){
            this.uploadedAt = uploadedAt;
            return this;
        }        
       
        public CV build(){
            CV cv = new CV();
            cv.setID(this.id);
            cv.setUpLoadedBy(this.uploadedBy);
            cv.setCandidateName(this.candidateName);
            cv.setCandidateEmail(this.candidateEmail);
            cv.setCVFileURL(this.cvFileUrl);
            cv.setUloadedAt(this.uploadedAt);
            return cv;
        }
        
    }
    

}
