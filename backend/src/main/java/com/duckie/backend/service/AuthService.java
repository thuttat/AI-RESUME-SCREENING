package com.duckie.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.duckie.backend.config.JwtProperties;
import com.duckie.backend.dto.AuthResponse;
import com.duckie.backend.dto.LoginRequest;
import com.duckie.backend.dto.RegisterRequest;
import com.duckie.backend.dto.UserResponse;
import com.duckie.backend.entity.Role;
import com.duckie.backend.entity.User;
import com.duckie.backend.entity.UserStatus;
import com.duckie.backend.exception.DuplicateResourceException;
import com.duckie.backend.exception.ResourceNotFoundException;
import com.duckie.backend.repository.UserRepository;
import com.duckie.backend.security.JwtService;

@Service
public class AuthService {
    private static final Logger log=LoggerFactory.getLogger(AuthService.class);
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UserMapper userMapper;
    private final JwtProperties jwtProperties;

    public AuthService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        JwtService jwtService,
        AuthenticationManager authenticationManager,
        UserDetailsService userDetailsService,
        UserMapper userMapper,
        JwtProperties jwtProperties
    ){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
        this.jwtService=jwtService;
        this.authenticationManager=authenticationManager;
        this.userDetailsService=userDetailsService;
        this.userMapper=userMapper;
        this.jwtProperties=jwtProperties;
    }

    //register
    @Transactional
    public UserResponse register(RegisterRequest request){
        if(userRepository.existsByUsername(request.username())){
            throw new DuplicateResourceException("Username da ton tai!");
        }
        if(userRepository.existsByEmail(request.email())){
            throw new DuplicateResourceException("Email da ton tai!");
        }
        User user=User.builder().username(request.username())
            .email(request.email())
            .fullname(request.fullname())           
            .password(passwordEncoder.encode(request.password()))
            .role(request.role() != null ? request.role() : Role.USER)
            .status(UserStatus.ACTIVE)
            .build();
        user=userRepository.save(user);
        return userMapper.toResponse(user);
    }


    public AuthResponse login (LoginRequest request){
        User user=userRepository.findByUsername(request.usernameOrEmail())
            .or(()->userRepository.findByEmail(request.usernameOrEmail()))
            .orElseThrow(()->new BadCredentialsException("User not found"));
        
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), request.password())
            );

            var userDetails=userDetailsService.loadUserByUsername(user.getUsername());
            String accessToken=jwtService.generateAccessToken(userDetails);
            String refreshToken=jwtService.generateRefreshToken(userDetails);
            long expiresIn=jwtProperties.getAccessTokenExpiresMs()/1000;
            return AuthResponse.of(
                accessToken, 
                refreshToken,
                "Bearer", 
                expiresIn, 
                userMapper.toResponse(user));
    }

    public UserResponse getCurrentUser(Authentication authentication){
        if(authentication==null ||!authentication.isAuthenticated()){
            throw new ResourceNotFoundException("Chua dang nhap");
        }
        String username=authentication.getName();
        User user=userRepository.findByUsername(username)
            .orElseThrow(()->new ResourceNotFoundException("User",username));

        return userMapper.toResponse(user);

    }

}

