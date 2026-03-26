package com.duckie.backend.dto;

import com.duckie.backend.model.Role;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @NotBlank(message = "Username or Email can not be blank")
    String usernameOrEmail,

    @NotBlank(message = "Password can not be blank")
    @Size(min = 6, max = 100,message = "Password must be between 6 and 100 characters")
    String password,

    @Deprecated
    Role role
) {
    
}
