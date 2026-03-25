package com.duckie.backend.model;

import java.util.List;
import java.util.Map;

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
@Table(name="application")
public class AIAnalysisResult {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
   
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cv_id", nullable = false)
    private CV cv;

    @Column(name = "match_score", nullable=false)
    private Float matchScore; 

 
    @Column(name="extracted_skills", updatable=false)
    private List<String>extractedSkills;

    @Column(name="year_of_experience",nullable=false)
    private Integer yearOfEx;

    @Column(name="raw_json_response",nullable=false)
    private Map<String,Object> rawJsonRes;

    public AIAnalysisResult(){}

    public AIAnalysisResult(
        Long id, 
        CV cv,
        Float matchScore,
        List<String> extractedSkills,
        Integer yearOfEx,
        Map<String,Object> rawJsonRes
        ){
            this.id=id;
            this.cv = cv;
            this.matchScore=matchScore;
            this.extractedSkills = extractedSkills;
            this.yearOfEx=yearOfEx;
            this.rawJsonRes=rawJsonRes;
        }


    //getter||setter
    public Long getID(){
        return id;
    }
    public void setID(Long id){
        this.id=id;
    }

    public CV getCV(){
        return cv;
    }
    public void setCV(CV cv){
        this.cv = cv;
    }

    public Float getMatchScore(){
        return matchScore;
    }
    public void setMatchScore(Float matchScore){
        this.matchScore = matchScore;
    }

    public List<String> getExtractedSkills(){
        return extractedSkills;
    }
    public void setExtractedSkills(List<String> extractedSkills){
        this.extractedSkills=extractedSkills;
    }
    public Integer getYearOfEx(){
        return yearOfEx;
    }
    public void setYearOfEx(Integer yearOfEx){
        this.yearOfEx=yearOfEx;
    }
    public Map<String,Object> getRawJsonRes(){
        return rawJsonRes;
    }
    public void setRawJsonRes(Map<String,Object> rawJsonRes){
        this.rawJsonRes=rawJsonRes;
    }

    public static final class AIAnalysisResultBuilder{
        private Long id;
        private CV cv;
        private Float matchScore;
        private List<String> extractedSkills;
        private Integer yearOfEx;
        private Map<String,Object> rawJsonRes;

        public AIAnalysisResultBuilder id(Long id){
            this.id = id;
            return this;
        }
        public AIAnalysisResultBuilder cv(CV cv){
            this.cv = cv;
            return this;
        }
        public AIAnalysisResultBuilder matchScore(Float matchScore){
            this.matchScore = matchScore;
            return this;
        }
        public AIAnalysisResultBuilder extractedSkills(List<String> extractedSkills){
            this.extractedSkills = extractedSkills;
            return this;
        }
        public AIAnalysisResultBuilder yearOfEx(Integer yearOfEx){
            this.yearOfEx = yearOfEx;
            return this;
        }
        public AIAnalysisResultBuilder rawJsonRes(Map<String,Object> rawJsonRes){
            this.rawJsonRes = rawJsonRes;
            return this;
        }        
        public AIAnalysisResult build(){
            AIAnalysisResult analysisResult = new AIAnalysisResult();
            analysisResult.setID(this.id);
            analysisResult.setCV(this.cv);
            analysisResult.setMatchScore(this.matchScore);
            analysisResult.setExtractedSkills(this.extractedSkills);
            analysisResult.setYearOfEx(this.yearOfEx);
            analysisResult.setRawJsonRes(this.rawJsonRes);
            return analysisResult;
        }
        
    }
    

}
