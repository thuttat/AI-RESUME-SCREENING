package com.duckie.backend.dto;

public interface MonthlyCVProjection {
    Integer getMonth();        
    Long getTotalCount();      
    Long getAiCount();         
    Long getNormalCount();
}
