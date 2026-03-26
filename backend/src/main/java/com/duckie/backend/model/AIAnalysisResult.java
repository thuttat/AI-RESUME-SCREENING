package com.duckie.backend.model;

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
public class AIAnalysisResult{

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
        return extractedSkills; }
    public void setExtractedSkills(String extractedSkills) { 
        this.extractedSkills = extractedSkills; 
    }
    public Double getYearsOfExperience() { 
        return yearsOfExperience; 
    }
    public void setYearsOfExperience(Double yearsOfExperience) { 
        this.yearsOfExperience = yearsOfExperience; 
    }
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
        private String rawJsonResponse;

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
        public AIAnalysisResultBuilder rawJsonResponse(String rawJsonResponse) { 
            this.rawJsonResponse = rawJsonResponse; 
            return this; 
        }

        public AIAnalysisResult build() {
            AIAnalysisResult result = new AIAnalysisResult();
            result.setId(this.id);
            result.setCv(this.cv);
            result.setMatchScore(this.matchScore);
            result.setExtractedSkills(this.extractedSkills);
            result.setYearsOfExperience(this.yearsOfExperience);
            result.setRawJsonResponse(this.rawJsonResponse);
            return result;
        }
    }
}