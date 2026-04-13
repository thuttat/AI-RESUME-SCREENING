package com.duckie.backend.service;

import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.duckie.backend.dto.AIResponse;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.duckie.backend.entity.AIAnalysisResult;
import com.duckie.backend.entity.Application;
import com.duckie.backend.entity.CV;
import com.duckie.backend.entity.JobPosting;
import com.duckie.backend.entity.Status;
import com.duckie.backend.entity.User;
import com.duckie.backend.exception.DuplicateResourceException;
import com.duckie.backend.exception.ResourceNotFoundException;
import com.duckie.backend.repository.AIAnalysisResultRepository;
import com.duckie.backend.repository.ApplicationRepository;
import com.duckie.backend.repository.CVRepository;
import com.duckie.backend.repository.JobPostingRepository;
import com.duckie.backend.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CVProcessingService {

    private final CVRepository cvRepository;
    private final JobPostingRepository jobPostingRepository;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;
    private final CloudinaryService cloudinaryService;
    private final AIAnalysisResultRepository aiAnalysisResultRepository;
    private final AIAnalysisMapper aiAnalysisMapper;

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${openai.api.key}")
    private String openAIApiKey;
    
    private static final String OPEN_API_URL = "https://api.openai.com/v1/chat/completions";

    private static final List<String> NOISE_KEYWORDS = List.of(
            "references", "referees", "references available upon request", "reference",
            "hobbies", "interests", "personal interests", "interests and hobbies",
            "extracurricular activities", "pastimes",
            "declaration", "i hereby declare", "signature", "disclaimer",
            "expected salary", "salary expectation",
            "notice period", "availability",
            "additional information", "other information",

            "tài liệu tham khảo", "người tham chiếu", "thông tin tham chiếu", "người chứng nhận",
            "sở thích", "sở thích cá nhân", "hoạt động ngoại khóa", "hoạt động xã hội",
            "lời cam đoan", "tôi xin cam đoan", "cam kết", "chữ ký",
            "mức lương mong muốn", "mức lương yêu cầu",
            "thời gian bắt đầu làm việc", "thời gian nhận việc",
            "thông tin bổ sung", "thông tin khác"
    );

    @Transactional
    public List<Application> uploadBulkCVs(Long jobId, List<MultipartFile> files) {
        JobPosting jobPosting = getJobPostingById(jobId);
        User recruiter = getRecruiter();

        List<Application> savedApplications = new ArrayList<>();

        for (MultipartFile file: files) {
            try {
                String fileUrl = cloudinaryService.uploadFile(file);
                CV cv = aiAnalysisMapper.toNewCV(recruiter, fileUrl);
                cv = cvRepository.save(cv);

                Application application = createNewApplication(jobPosting, cv);
                savedApplications.add(application);
            } catch (Exception e) {
                throw new RuntimeException("Execution error: " + e.getMessage());
            }
        }
        return savedApplications;
    }

    @Transactional
    public AIAnalysisResult parseCVWithAI(Long applicationId) throws Exception {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found!"));

        if (application.getStatus() == Status.SUCCESS) {
            throw new IllegalStateException("This CV has already been scored by AI! It cannot be re-parsed.");
        }

        CV cv = application.getCV();
        JobPosting jobPosting = application.getJobPosting();

        String extractedText = extractTextFromPdfUrl(cv.getCvFileUrl());

        String emailLocal = extractEmailLocally(extractedText);
        String nameLocal = extractNameLocally(extractedText);

        preventDuplicateApplication(extractedText, jobPosting, cv, application);

        AIResponse parsedData = fetchAndParseAIResult(extractedText, jobPosting);

        return updateAndSaveResult(parsedData, cv, application, nameLocal, emailLocal);
    }

    public String extractTextFromPdfUrl(String pdfUrl) {
        try {
            URL url = new URI(pdfUrl).toURL();
            try (InputStream in = url.openStream();
                 PDDocument document = Loader.loadPDF(in.readAllBytes())) {
                PDFTextStripper stripper = new PDFTextStripper();
                return stripper.getText(document);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error extract file: " + e);
        }
    }

    private String extractEmailLocally(String text) {
        Matcher m = Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}").matcher(text);
        return m.find() ? m.group() : null;
    }

    private String extractNameLocally(String text) {
        String head = text.substring(0, Math.min(300, text.length()));
        String[] lines = head.split("\\n");
        for (String line : lines) {
            String trimmed = line.trim();
            if (trimmed.split("\\s+").length >= 2
                    && trimmed.split("\\s+").length <= 5
                    && !trimmed.contains("@")
                    && !trimmed.matches(".*\\d{9,}.*")) {
                return trimmed;
            }
        }
        return null;
    }

    private String extractScoringContent(String cleanedText) {
        String lower = cleanedText.toLowerCase();
        int endIndex = cleanedText.length();

        for (String noiseKey : NOISE_KEYWORDS) {
            int idx = lower.lastIndexOf(noiseKey);
            if (idx > cleanedText.length() / 2) {
                endIndex = Math.min(endIndex, idx);
            }
        }

        String trimmed = cleanedText.substring(0, endIndex).trim();
        return trimmed.length() > 2500 ? trimmed.substring(0, 2500) : trimmed;
    }

    private JobPosting getJobPostingById(Long jobId) {
        return jobPostingRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job Posting not found!"));
    }

    private User getRecruiter() {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User not found!"));
    }

    private Application createNewApplication(JobPosting jobPosting, CV cv) {
        Application application = Application.builder()
                .jobPosting(jobPosting)
                .cv(cv)
                .status(Status.PENDING)
                .build();
        return applicationRepository.save(application);
    }

    private boolean checkDuplicateApplication(String email, Long jobId, Long currentCvId) {
        return applicationRepository.existsDuplicateByEmailForJob(email, jobId, currentCvId);
    }

    private void preventDuplicateApplication(String extractedText, JobPosting jobPosting, CV cv, Application application) {
        String emailFromText = extractEmailLocally(extractedText);

        if (emailFromText != null && checkDuplicateApplication(emailFromText, jobPosting.getId(), cv.getId())) {
            applicationRepository.delete(application);
            cvRepository.delete(cv);
            throw new DuplicateResourceException(emailFromText + " already applied for this job!");
        }
    }

    private String cleanCVText(String rawText) {
        if (rawText == null) return "";
        String noLinks = rawText.replaceAll("https?://\\S+\\s?", "");
        String noExtraSpaces = noLinks.replaceAll("\\s+", " ");
        String cleaned = noExtraSpaces.replaceAll("[^\\p{L}\\p{N}\\p{Punct}\\s]", "");
        return cleaned.trim();
    }

    private AIResponse fetchAndParseAIResult(String rawCvText, JobPosting jobPosting) throws Exception {
        String processedText = extractScoringContent(cleanCVText(rawCvText));

        String systemPrompt = String.format("""
            You are a STRICT Technical Recruiter AI. Return ONLY valid JSON:
            {
                "critique": string (1-2 sentences: what this CV lacks or overclaims),
                "candidateName": string,
                "candidateEmail": string,
                "matchScore": number (0-100, must be consistent with critique),
                "extractedSkills": "s1, s2",
                "yearsOfExperience": decimal (0.0 if unknown)
            }
            SCORING RULES:
            1. Skills listed without project/work proof = 0 value.
            2. Missing core required skills = score < 50, always.
            3. Score MUST reflect critique — if critique is harsh, score must be low.
            JOB: %s | %s | Req Skills: %s
            """,
                jobPosting.getTitle(),
                jobPosting.getDescription(),
                jobPosting.getRequiredSkills());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openAIApiKey);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-4o-mini");
        requestBody.put("temperature", 0.0);
        requestBody.put("max_tokens", 500); // Tăng nhẹ để critique không bị cắt ngang
        requestBody.put("response_format", Map.of("type", "json_object"));
        requestBody.put("messages", List.of(
                Map.of("role", "system", "content", systemPrompt),
                Map.of("role", "user", "content", "CV Content:\n" + processedText)
        ));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(OPEN_API_URL, entity, Map.class);

        if (response.getStatusCode() != HttpStatus.OK || response.getBody() == null)
            throw new RuntimeException("Error from OpenAI: " + response.getStatusCode());

        List<?> choices = (List<?>) response.getBody().get("choices");
        Map<?, ?> message = (Map<?, ?>) ((Map<?, ?>) choices.get(0)).get("message");
        String jsonResponse = (String) message.get("content");

        return new ObjectMapper().readValue(jsonResponse, AIResponse.class);
    }

    private AIAnalysisResult updateAndSaveResult(AIResponse parsedData, CV cv, Application application, String knownName, String knownEmail) throws Exception {
        cv = aiAnalysisMapper.updateCvFromAI(cv, parsedData, knownName, knownEmail);
        cvRepository.save(cv);

        application.setStatus(Status.SUCCESS);
        applicationRepository.save(application);

        Map<String, Object> rawJsonMap = new HashMap<>();
        rawJsonMap.put("score", parsedData.matchScore());
        rawJsonMap.put("skills", parsedData.extractedSkills());
        rawJsonMap.put("critique", parsedData.critique());

        ObjectMapper mapper = new ObjectMapper();
        String rawJsonString = mapper.writeValueAsString(rawJsonMap);

        AIAnalysisResult result = aiAnalysisMapper.toEntity(parsedData, cv, rawJsonString);

        return aiAnalysisResultRepository.save(result);
    }
}