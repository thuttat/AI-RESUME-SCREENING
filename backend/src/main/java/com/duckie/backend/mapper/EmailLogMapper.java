package com.duckie.backend.mapper;

import com.duckie.backend.dto.EmailLogResponse;
import com.duckie.backend.entity.EmailLog;
import org.springframework.stereotype.Component;

@Component
public class EmailLogMapper {

    public EmailLogResponse toResponse(EmailLog log) {
        String candidateName = "N/A";
        String candidateEmail = "N/A";
        Long appId = null;

        if (log.getApplication() != null) {
            appId = log.getApplication().getId();
            if (log.getApplication().getCV() != null) {
                candidateName = log.getApplication().getCV().getCandidateName();
                candidateEmail = log.getApplication().getCV().getCandidateEmail();
            }
        }

        return new EmailLogResponse(
            log.getId(),
            appId,
            candidateName,
            candidateEmail,
            log.getSubject(),
            log.getBody(),
            log.getSentAt(),
            log.getStatus() != null ? log.getStatus().name() : "UNKNOWN"
        );
    }
}