package com.duckie.backend.dto;


import com.duckie.backend.entity.Role;
import com.duckie.backend.entity.UserStatus;

public record UserResponse( 
    Long id,
    String fullname,
    String username,
    String avatar,
    String email,
    Role role,
    UserStatus status,
    String createdAt,
    String updatedAt
   
){

}
