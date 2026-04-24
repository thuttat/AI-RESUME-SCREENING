package com.duckie.backend.controller;

import com.duckie.backend.dto.EvaluationRequest;
import com.duckie.backend.dto.EvaluationResponse;
import com.duckie.backend.service.EvaluationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import org.junit.jupiter.api.Test;
import com.duckie.backend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EvaluationController.class)
class EvaluationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private JwtService jwtService;

    @MockitoBean
    private EvaluationService evaluationService;

    @Test
    @WithMockUser(roles = "HIRING_MANAGER")
    void create_ShouldReturn201() throws Exception {
        EvaluationRequest request = new EvaluationRequest(1L,5, "Excellent candidate");

        EvaluationResponse response = new EvaluationResponse(
                1L, 100L, "John Manager", 5, "Excellent candidate", Instant.now()
        );

        when(evaluationService.createEvaluation(eq(100L), any(EvaluationRequest.class)))
                .thenReturn(response);

        mockMvc.perform(post("/api/applications/100/evaluations")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.rating").value(5));
    }

    @Test
    @WithMockUser(roles = "HIRING_MANAGER")
    void compare_ShouldReturnList() throws Exception {
        EvaluationResponse response = new EvaluationResponse(
                1L, 100L, "John Manager", 4, "Good", Instant.now()
        );

        when(evaluationService.getEvaluationsForComparison(List.of(1L, 2L)))
                .thenReturn(List.of(response));

        mockMvc.perform(get("/api/applications/comparison")
                        .param("ids", "1,2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    @WithMockUser(roles = "HIRING_MANAGER")
    void delete_ShouldReturn204() throws Exception {
        mockMvc.perform(delete("/api/evaluations/1")
                .with(csrf()))
                .andExpect(status().isNoContent());
    }
}