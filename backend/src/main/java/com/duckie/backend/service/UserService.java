package com.duckie.backend.service;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.duckie.backend.dto.UserPatchRequest;
import com.duckie.backend.dto.UserRequest;
import com.duckie.backend.dto.UserResponse;
import com.duckie.backend.entity.Role;
import com.duckie.backend.entity.User;
import com.duckie.backend.entity.UserStatus;
import com.duckie.backend.exception.DuplicateResourceException;
import com.duckie.backend.repository.UserRepository;

@Service
public class UserService implements IUserService {
    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> findAll() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(userMapper::toResponse)
                .collect(Collectors.toList());
    }
   
    @Transactional(readOnly = true)
    public Page<UserResponse> findAll(String search, Role role, Pageable pageable) {
        String roleParam = role != null ? role.name() : null;
        Page<User> page = userRepository.findAllBySearchAndRole(search, role, pageable);
        return page.map(userMapper::toResponse);
    }

    @Transactional
    public UserResponse findById(Long id){
        User user=userRepository.findById(id)
                .orElseThrow(()->new RuntimeException("User not found by Id: "+id));
        return userMapper.toResponse(user);
    }

    @Transactional()
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
                .password(passwordEncoder.encode(request.password()))
                .role(Role.USER)
                .status(UserStatus.ACTIVE)
                .build();
        user = userRepository.save(user);
        logger.info("Created new user with id: {}", user.getId());
        return userMapper.toResponse(user);
    }

    @Transactional()
    public UserResponse patchUpdate(Long id, UserRequest request){
        User user=userRepository.findById(id)
            .orElseThrow(()->new RuntimeException("User not found  by Id:"+id));

        if (request.email() != null && !request.email().isBlank()) { 
            user.setEmail(request.email());
        }
        if (request.password() != null && !request.password().isBlank()) { 
            user.setPassword(passwordEncoder.encode(request.password()));
        }
        if (request.role() != null) {
            user.setRole(request.role());
        }

        user = userRepository.save(user);
        return userMapper.toResponse(user);
    }

    @Transactional()
    public void delete(Long id) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found by Id: " + id));
    user.setStatus(UserStatus.UNACTIVE); 
    userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public byte[] exportUsersToCsv() {
        List<UserResponse> users = this.findAll();
        StringBuilder csvBuilder = new StringBuilder();

        csvBuilder.append("ID,Username,Họ và Tên,Email,Quyền hạn,Trạng thái\n");

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

    @Override
    public ResponseEntity<UserResponse> update(Long id, UserRequest request) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public ResponseEntity<UserResponse> patch(Long id, UserRequest request) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public ResponseEntity<UserResponse> patchUpdate(Long id, UserPatchRequest request) {
        throw new UnsupportedOperationException("Not supported yet.");
    }


    
}