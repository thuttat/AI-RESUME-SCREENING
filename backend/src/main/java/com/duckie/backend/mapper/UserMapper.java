package com.duckie.backend.mapper;

import org.springframework.stereotype.Component;

import com.duckie.backend.dto.UserResponse;
import com.duckie.backend.entity.User;

@Component
public class UserMapper {
    public UserResponse toResponse(User user){
        if(user == null) return null;
        return new UserResponse(
            user.getId(),
            user.getFullname(),
            user.getUsername(),
            user.getEmail(),
            user.getRole(),
            user.getStatus(),
            user.getCreatedAt() != null ? user.getCreatedAt().toString() : null,
            user.getUpdatedAt() != null ? user.getUpdatedAt().toString() : null
        );
    }
}