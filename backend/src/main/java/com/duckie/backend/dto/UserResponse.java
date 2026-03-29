package com.duckie.backend.dto;

import java.time.Instant;

import com.duckie.backend.entity.Role;
import com.duckie.backend.entity.UserStatus;

public record UserResponse( 
    Long id,
    String fullname,
    String username,
    String email,
    Role role,
    UserStatus status,
    Instant createdAt,
    Instant updatedAt
){

}
