package com.duckie.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


// import com.duckie.backend.security.CustomAccessDeniedHandler;
// import com.duckie.backend.security.JwtAuthenticationEntryPoint;
// import com.duckie.backend.security.JwtAuthenticationFilter;
// import com.duckie.backend.security.JwtService;
// import com.duckie.backend.security.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    
    // private final JwtAuthenticationFilter jwtAuthenticationFilter;
    // private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    // private final CustomAccessDeniedHandler customAccessDeniedHandler;

    // public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
    //         JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
    //         CustomAccessDeniedHandler customAccessDeniedHandler) {
    //     this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    //     this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
    //     this.customAccessDeniedHandler = customAccessDeniedHandler;
    // }

    // @Bean
    // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    //     http.csrf(csrf -> csrf.disable())
    //             .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    //             .authorizeHttpRequests(auth -> auth
    //                     .requestMatchers("/public/**").permitAll()
    //                     .requestMatchers("/api/auth/**").permitAll()
    //                     .requestMatchers("/h2-console/**").permitAll()
    //                     .requestMatchers("/api/admin/**").hasRole("ADMIN")
    //                     .requestMatchers("/api/users/**").hasAnyRole("USER", "ADMIN") 
    //                     .anyRequest().authenticated()
    //             )
    //             .exceptionHandling(exceptions -> exceptions
    //                     .authenticationEntryPoint(jwtAuthenticationEntryPoint)
    //                     .accessDeniedHandler(customAccessDeniedHandler))
    //             .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    //     http.headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));

    //     return http.build();
    // }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() 
            );
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    // @Bean
    // public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    //     return authConfig.getAuthenticationManager();
    // }

    // @Bean
    // public JwtAuthenticationFilter jwtAuthenticationFilter(JwtService jwtService, UserDetailsServiceImpl userDetailsService) {
    //     return new JwtAuthenticationFilter(jwtService, userDetailsService);
    // }
}