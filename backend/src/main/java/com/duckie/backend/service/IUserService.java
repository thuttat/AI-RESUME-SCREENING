package com.duckie.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.duckie.backend.dto.UserRequest;
import com.duckie.backend.dto.UserResponse;

public interface IUserService {
    List<UserResponse> findAll();
    
    Page<UserResponse> findAll(Pageable pageable);
    
    String uploadAvatar(MultipartFile file);
    
    UserResponse findById(Long id);
    
    UserResponse create(UserRequest request);
    
    UserResponse update(Long id, UserRequest request);
    
    UserResponse patchUpdate(Long id, UserRequest request);
    
    void delete(Long id);
    
    byte[] exportUsersToCsv();
    
}