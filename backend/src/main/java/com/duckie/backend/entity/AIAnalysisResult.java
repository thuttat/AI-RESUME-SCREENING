package com.duckie.backend.entity;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ai_analysis_result")
public class AIAnalysisResult extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cv_id", unique = true, nullable = false)
    private CV cv;

    @Column(name = "match_score")
    private Double matchScore;

    @Column(name = "extracted_skills", columnDefinition = "TEXT")
    private String extractedSkills;

    @Column(name = "years_of_experience")
    private Double yearsOfExperience;

    @Column(columnDefinition = "TEXT")
    private String critique; // a thêm trường này để hiển thị phần đánh giá chi tiết của AI

    @Column(name = "raw_json_response", columnDefinition = "TEXT")
    private String rawJsonResponse;

    public AIAnalysisResult() {}

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }
    public CV getCv() { 
        return cv; 
    }
    public void setCv(CV cv) { 
        this.cv = cv; 
    }
    public Double getMatchScore() { 
        return matchScore; 
    }
    public void setMatchScore(Double matchScore) { 
        this.matchScore = matchScore; 
    }
    public String getExtractedSkills() { 
        return extractedSkills; 
    }
    public void setExtractedSkills(String extractedSkills) { 
        this.extractedSkills = extractedSkills; 
    }
    public Double getYearsOfExperience() { 
        return yearsOfExperience; 
    
    }
    public void setYearsOfExperience(Double yearsOfExperience) { 
        this.yearsOfExperience = yearsOfExperience; 
    }
    public String getCritique() { return critique; }
    public void setCritique(String critique) { this.critique = critique; }
    public String getRawJsonResponse() { 
        return rawJsonResponse; 
    }
    public void setRawJsonResponse(String rawJsonResponse) { 
        this.rawJsonResponse = rawJsonResponse; 
    }

    public static AIAnalysisResultBuilder builder() { 
        return new AIAnalysisResultBuilder(); 
    }

    public static final class AIAnalysisResultBuilder {
        private Long id;
        private CV cv;
        private Double matchScore;
        private String extractedSkills;
        private Double yearsOfExperience;
        private String critique;
        private String rawJsonResponse;
        private Instant createdAt;
        private Instant updatedAt;

        public AIAnalysisResultBuilder id(Long id) { 
            this.id = id; 
            return this; 
        }
        public AIAnalysisResultBuilder cv(CV cv) { 
            this.cv = cv; 
            return this; 
        }
        public AIAnalysisResultBuilder matchScore(Double matchScore) { 
            this.matchScore = matchScore; 
            return this; 
        }
        public AIAnalysisResultBuilder extractedSkills(String extractedSkills) { 
            this.extractedSkills = extractedSkills; 
            return this; 
        }
        public AIAnalysisResultBuilder yearsOfExperience(Double yearsOfExperience) { 
            this.yearsOfExperience = yearsOfExperience; 
            return this; 
        }
        public AIAnalysisResultBuilder critique(String critique) {
            this.critique = critique;
            return this;
        }
        public AIAnalysisResultBuilder rawJsonResponse(String rawJsonResponse) { 
            this.rawJsonResponse = rawJsonResponse; 
            return this; 
        }
        public AIAnalysisResultBuilder createdAt(Instant createdAt) { 
            this.createdAt = createdAt; 
            return this; 
        }
        public AIAnalysisResultBuilder updatedAt(Instant updatedAt) { 
            this.updatedAt = updatedAt; 
            return this; 
        }

        public AIAnalysisResult build() {
            AIAnalysisResult result = new AIAnalysisResult();
            result.setId(this.id);
            result.setCv(this.cv);
            result.setMatchScore(this.matchScore);
            result.setExtractedSkills(this.extractedSkills);
            result.setYearsOfExperience(this.yearsOfExperience);
            result.setCritique(this.critique);
            result.setRawJsonResponse(this.rawJsonResponse);
            result.setCreatedAt(this.createdAt);
            result.setUpdatedAt(this.updatedAt);
            return result;
        }
    }
}