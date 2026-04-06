package com.duckie.backend.dto;

public interface TopUserProjection {
    Long getId();
    String getName();
    String getRole();
    Long getActivityCount();
    String getAvatar();
}