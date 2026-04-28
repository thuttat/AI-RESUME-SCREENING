package com.duckie.backend.dto;

import com.duckie.backend.entity.Role;
import com.duckie.backend.entity.UserStatus;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRequest (
        @NotBlank(message = "Fullname can not be blank")
        @Size(min = 3, max = 100)
        String fullname,

        @NotBlank(message = "Username can not be blank")
        @Size(min = 3, max = 50)
        String username,

        @NotBlank(message = "Email can not be blank")
        @Email(message = "Email is invalid")
        String email,

        @NotBlank(message = "Password can not be blank")
        @Size(min = 6, max = 100,message = "Password must be between 6 and 100 characters")
        String password,

        String avatar,
                
        @Deprecated
        Role role,
        @Deprecated
        UserStatus status
){}
