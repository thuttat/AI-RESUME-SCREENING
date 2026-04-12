package com.duckie.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.duckie.backend.dto.EvaluationRequest;
import com.duckie.backend.dto.EvaluationResponse;
import com.duckie.backend.entity.Application;
import com.duckie.backend.entity.Evaluation;
import com.duckie.backend.entity.User;
import com.duckie.backend.repository.ApplicationRepository;
import com.duckie.backend.repository.EvaluationRepository;
import com.duckie.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EvaluationService {

    private final EvaluationRepository evaluationRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final EvaluationMapper evaluationMapper;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Chưa đăng nhập hoặc phiên làm việc hết hạn");
        }
        
        String username = authentication.getName();
        
        return userRepository.findByUsername(username)
                .orElseGet(() -> userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng: " + username)));
    }

        @Transactional
        public EvaluationResponse createEvaluation(Long applicationId, EvaluationRequest request) {
            User evaluator = getCurrentUser();
            Application application = applicationRepository.findById(applicationId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy hồ sơ"));

            Evaluation evaluation = evaluationRepository
                    .findByApplicationIdAndEvaluatorId(applicationId, evaluator.getId())
                    .orElse(new Evaluation()); 

            evaluation.setApplication(application);
            evaluation.setEvaluator(evaluator);
            evaluation.setRating(request.rating());
            evaluation.setFeedback(request.feedback());

            Evaluation saved = evaluationRepository.save(evaluation);
            return evaluationMapper.toResponse(saved);
        }

    @Transactional(readOnly = true)
    public List<EvaluationResponse> getEvaluationsByApplication(Long applicationId) {
        return evaluationRepository.findByApplicationId(applicationId)
                .stream()
                .map(evaluationMapper::toResponse)
                .collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public List<EvaluationResponse> getEvaluationsForComparison(List<Long> applicationIds) {
        return evaluationRepository.findByApplicationIdIn(applicationIds)
                .stream()
                .map(evaluationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public EvaluationResponse updateEvaluation(Long evaluationId, EvaluationRequest request) {
        Evaluation evaluation = evaluationRepository.findById(evaluationId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đánh giá ID: " + evaluationId));

        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!evaluation.getEvaluator().getUsername().equals(currentUsername)) {
            throw new RuntimeException("Bạn không có quyền chỉnh sửa đánh giá của người khác.");
        }

        evaluation.setRating(request.rating());
        evaluation.setFeedback(request.feedback());
        
        Evaluation updated = evaluationRepository.save(evaluation);
        return evaluationMapper.toResponse(updated);
    }

    @Transactional
    public void deleteEvaluation(Long evaluationId) {
        Evaluation evaluation = evaluationRepository.findById(evaluationId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đánh giá ID: " + evaluationId));

        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        
        boolean isAdmin = SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin && !evaluation.getEvaluator().getUsername().equals(currentUsername)) {
            throw new RuntimeException("Bạn không có quyền xóa đánh giá này.");
        }

        evaluationRepository.delete(evaluation);
    }

}