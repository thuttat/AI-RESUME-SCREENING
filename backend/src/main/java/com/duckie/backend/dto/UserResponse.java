package com.duckie.backend.dto;

import java.time.Instant;

import com.duckie.backend.model.Role;
import com.duckie.backend.model.UserStatus;

public record UserResponse( 
    Long id,
    String username,
    String email,
    Role role,
    UserStatus status,
    Instant createdAt,
    Instant updatedAt
){

}
