package com.duckie.backend.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.duckie.backend.dto.UserPatchRequest;
import com.duckie.backend.dto.UserRequest;
import com.duckie.backend.dto.UserResponse;

public interface IUserService {
    List<UserResponse> findAll();
    UserResponse findById(Long id);
    UserResponse create(UserRequest request);
    ResponseEntity<UserResponse> update(Long id, UserRequest request);
    ResponseEntity<UserResponse> patch(Long id, UserRequest request);
    ResponseEntity<UserResponse> patchUpdate(Long id, UserPatchRequest request);
    void delete(Long id);
    byte[] exportUsersToCsv();
}
