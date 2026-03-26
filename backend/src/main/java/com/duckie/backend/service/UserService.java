package com.duckie.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.duckie.backend.dto.UserPatchRequest;
import com.duckie.backend.dto.UserRequest;
import com.duckie.backend.dto.UserResponse;
import com.duckie.backend.model.Role;
import com.duckie.backend.model.User;
import com.duckie.backend.repository.UserRepository;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }


    @Transactional(readOnly = true)
    public Page<UserResponse> findAll(String search, Role role, Pageable pageable) {
        Page<User> page = userRepository.findAllBySearchAndRole(search, role, pageable);
        return page.map(userMapper::toResponse);
    }


    @Transactional(readOnly = true)
    public UserResponse findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id)); 
        return userMapper.toResponse(user);
    }
    
  
    @Transactional
    public UserResponse create(UserRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .username(request.username())
                .email(request.email())
                .password(passwordEncoder.encode(request.password())) 
                .role(Role.USER)
                .build();
                
        user = userRepository.save(user);
        logger.info("Created new user with id: {}", user.getId());
        return userMapper.toResponse(user);
    }

    @Transactional
    public UserResponse update(Long id, UserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (userRepository.existsByUsernameAndIdNot(request.username(), id)) {
            throw new RuntimeException("Username already exists for another user");
        }
        if (userRepository.existsByEmailAndIdNot(request.email(), id)) {
            throw new RuntimeException("Email already exists for another user");
        }

        user.setUsername(request.username());
        user.setEmail(request.email());
        
        if (request.password() != null && !request.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.password()));
        }

        user = userRepository.save(user);
        logger.info("Updated user completely with id: {}", user.getId());
        return userMapper.toResponse(user);
    }

    @Transactional
    public UserResponse patchUpdate(Long id, UserPatchRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (request.username() != null && !request.username().isBlank()) {
            if (userRepository.existsByUsernameAndIdNot(request.username(), id)) {
                throw new RuntimeException("Username already exists");
            }
            user.setUsername(request.username());
        }

        if (request.email() != null && !request.email().isBlank()) {
            if (userRepository.existsByEmailAndIdNot(request.email(), id)) {
                throw new RuntimeException("Email already exists");
            }
            user.setEmail(request.email());
        }

        if (request.password() != null && !request.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.password()));
        }

        if (request.role() != null) {
            user.setRole(request.role());
        }
        
        if (request.status() != null) {
            user.setStatus(request.status());
        }

        user = userRepository.save(user);
        logger.info("Patched user with id: {}", user.getId());
        return userMapper.toResponse(user);
    }

    @Transactional
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
        logger.info("Deleted user with id: {}", id);
    }
}