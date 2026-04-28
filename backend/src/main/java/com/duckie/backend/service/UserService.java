package com.duckie.backend.service;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.duckie.backend.dto.UserRequest;
import com.duckie.backend.dto.UserResponse;
import com.duckie.backend.entity.Role;
import com.duckie.backend.entity.User;
import com.duckie.backend.entity.UserStatus;
import com.duckie.backend.exception.DuplicateResourceException;
import com.duckie.backend.exception.ResourceNotFoundException;
import com.duckie.backend.mapper.UserMapper;
import com.duckie.backend.repository.UserRepository;

@Service
public class UserService implements IUserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final CloudinaryService cloudinaryService;

    public UserService(UserRepository userRepository,
                       UserMapper userMapper,
                       PasswordEncoder passwordEncoder,
                       CloudinaryService cloudinaryService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.cloudinaryService = cloudinaryService;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> findAll() {
        return userRepository.findAll().stream()
                .map(userMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserResponse> findAll(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(userMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public Page<UserResponse> findAll(String search, Role role, Pageable pageable) {
        Page<User> page = userRepository.findAllBySearchAndRole(search, role, pageable);
        return page.map(userMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return userMapper.toResponse(user);
    }

    @Override
    public String uploadAvatar(MultipartFile file) {
        try {
            return cloudinaryService.uploadFile(file);
        } catch (Exception e) {
            throw new RuntimeException("Could not upload avatar: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public UserResponse create(UserRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new DuplicateResourceException("Username already exists");
        }
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateResourceException("Email already exists");
        }

        User user = User.builder()
                .username(request.username())
                .fullname(request.fullname())
                .email(request.email())
                .avatar(request.avatar())
                .password(passwordEncoder.encode(request.password()))
                .role(request.role() != null ? request.role() : Role.USER)
                .status(UserStatus.ACTIVE)
                .build();

        user = userRepository.save(user);
        logger.info("Created new user with id: {}", user.getId());
        return userMapper.toResponse(user);
    }

    @Override
    @Transactional
    public UserResponse update(Long id, UserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        if (userRepository.existsByEmailAndIdNot(request.email(), id)) {
            throw new DuplicateResourceException("Email already exists: " + request.email());
        }

        user.setFullname(request.fullname());
        user.setEmail(request.email());
        user.setUsername(request.username());
        user.setAvatar(request.avatar());

        if (request.role() != null) {
            user.setRole(request.role());
        }

        if (request.password() != null && !request.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.password()));
        }

        User savedUser = userRepository.save(user);
        logger.info("Updated user with id: {}", savedUser.getId());
        return userMapper.toResponse(savedUser);
    }

    @Override
    @Transactional
    public UserResponse patchUpdate(Long id, UserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        if (request.username() != null && !request.username().isBlank()) {
            user.setUsername(request.username());
        }
        if (request.fullname() != null && !request.fullname().isBlank()) {
            user.setFullname(request.fullname());
        }
        if (request.email() != null && !request.email().isBlank()) {
            if (userRepository.existsByEmailAndIdNot(request.email(), id)) {
                throw new DuplicateResourceException("Email already exists");
            }
            user.setEmail(request.email());
        }
        if (request.avatar() != null) {
            user.setAvatar(request.avatar());
        }
        if (request.role() != null) {
            user.setRole(request.role());
        }
        if (request.password() != null && !request.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.password()));
        }
        if (request.status() != null) {
            user.setStatus(request.status());
        }

        User savedUser = userRepository.save(user);
        logger.info("Patch updated user with id: {}", savedUser.getId());
        return userMapper.toResponse(savedUser);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        user.setStatus(UserStatus.UNACTIVE);
        userRepository.save(user);
        logger.info("User with id {} has been deactivated", id);
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] exportUsersToCsv() {
        List<UserResponse> users = this.findAll();
        StringBuilder csvBuilder = new StringBuilder();

        csvBuilder.append("ID,Username,Full Name,Email,Role,Status\n");

        for (UserResponse user : users) {
            csvBuilder.append(user.id()).append(",")
                    .append("\"").append(user.username() != null ? user.username() : "").append("\",")
                    .append("\"").append(user.fullname() != null ? user.fullname() : "").append("\",")
                    .append("\"").append(user.email() != null ? user.email() : "").append("\",")
                    .append(user.role() != null ? user.role().name() : "").append(",")
                    .append(user.status() != null ? user.status().name() : "").append("\n");
        }

        byte[] csvBytes = csvBuilder.toString().getBytes(StandardCharsets.UTF_8);
        byte[] bom = {(byte) 0xEF, (byte) 0xBB, (byte) 0xBF};
        byte[] finalCsvData = new byte[bom.length + csvBytes.length];
        System.arraycopy(bom, 0, finalCsvData, 0, bom.length);
        System.arraycopy(csvBytes, 0, finalCsvData, bom.length, csvBytes.length);
        return finalCsvData;
    }
}