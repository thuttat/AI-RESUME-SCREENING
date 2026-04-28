package com.duckie.backend.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.duckie.backend.security.CustomAccessDeniedHandler;
import com.duckie.backend.security.JwtAuthenticationEntryPoint;
import com.duckie.backend.security.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/public/**", "/api/auth/**", "/error", "/h2-console/**").permitAll()

                        .requestMatchers("/api/recruiter/**").hasAnyRole("RECRUITER", "ADMIN")
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .requestMatchers("/api/users/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/api/job-templates/**").hasRole("ADMIN")
                        .requestMatchers("/api/admin/dashboard").hasRole("ADMIN")
                        .requestMatchers("/api/ai-config/**").hasRole("ADMIN")

                        .requestMatchers("/api/reports/**").hasRole("RECRUITER")
                        .requestMatchers("/api/email-logs/**").hasAnyRole("RECRUITER", "ADMIN", "HIRING_MANAGER")
                        .requestMatchers("/api/emails/send").hasAnyRole("RECRUITER", "ADMIN")
                        .requestMatchers("/api/email-templates/**").hasAnyRole("ADMIN", "HIRING_MANAGER", "RECRUITER")
                        .requestMatchers("/api/jobs/**").hasAnyRole("ADMIN", "HIRING_MANAGER", "RECRUITER")
                        .requestMatchers("/api/cvs/upload").hasAnyRole("ADMIN", "RECRUITER")
                        .requestMatchers("/api/applications/**").hasAnyRole("ADMIN", "HIRING_MANAGER", "RECRUITER")
                        .requestMatchers("/api/evaluations/**").hasAnyRole("HIRING_MANAGER", "ADMIN")

                        .anyRequest().authenticated()
                )
                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                        .accessDeniedHandler(customAccessDeniedHandler))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        // Cho phép hiển thị H2 console trong iframe
        http.headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "x-auth-token"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}