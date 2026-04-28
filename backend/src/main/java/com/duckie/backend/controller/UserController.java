package com.duckie.backend.controller;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.duckie.backend.dto.UserPatchRequest;
import com.duckie.backend.dto.UserRequest;
import com.duckie.backend.dto.UserResponse;
import com.duckie.backend.service.IUserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> findAllUser() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HIRING_MANAGER', 'RECRUITER')")
    public ResponseEntity<UserResponse> findUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest request) {
        return ResponseEntity.ok(userService.create(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest request) {
        return userService.update(id, request);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> patchUser(@PathVariable Long id, @RequestBody UserPatchRequest request) {
        return userService.patchUpdate(id, request);
    }

    @PostMapping(value = "/upload-avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> uploadAvatar(@RequestParam("file") MultipartFile file) {
        String avatarUrl = userService.uploadAvatar(file);
        return ResponseEntity.ok(avatarUrl);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/export")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<byte[]> exportUsers() {
        byte[] csvData = userService.exportUsersToCsv();
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=users_export.csv");
        headers.setContentType(MediaType.parseMediaType("text/csv"));
        return ResponseEntity.ok()
                .headers(headers)
                .body(csvData);
    }
}