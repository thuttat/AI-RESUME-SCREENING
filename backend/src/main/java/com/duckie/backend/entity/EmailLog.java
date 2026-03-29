package com.duckie.backend.entity;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "email_log")
public class EmailLog extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    @Column(nullable = false)
    private String subject;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String body;

    @Column(name = "sent_at")
    private Instant sentAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EmailStatus status;

    public EmailLog() {}

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }
    public Application getApplication() { 
        return application; 
    }
    public void setApplication(Application application) { 
        this.application = application; 
    }
    public String getSubject() { 
        return subject; 
    }
    public void setSubject(String subject) { 
        this.subject = subject; 
    }
    public String getBody() { 
        return body; 
    }
    public void setBody(String body) { 
        this.body = body; 
    }
    public Instant getSentAt() { 
        return sentAt; 
    }
    public void setSentAt(Instant sentAt) { 
        this.sentAt = sentAt; 
    }
    public EmailStatus getStatus() { 
        return status; 
    }
    public void setStatus(EmailStatus status) { 
        this.status = status; 
    }

    public static EmailLogBuilder builder() {
        return new EmailLogBuilder();
    }

    public static final class EmailLogBuilder {
        private Long id;
        private Application application;
        private String subject;
        private String body;
        private Instant sentAt;
        private EmailStatus status;
        private Instant createdAt;
        private Instant updatedAt;

        public EmailLogBuilder id(Long id) { 
            this.id = id; 
            return this; 
        }
        public EmailLogBuilder application(Application application) { 
            this.application = application; 
            return this;
        }
        public EmailLogBuilder subject(String subject) { 
            this.subject = subject; 
            return this; 
        }
        public EmailLogBuilder body(String body) { 
            this.body = body; 
            return this; 
        }
        public EmailLogBuilder sentAt(Instant sentAt) { 
            this.sentAt = sentAt; 
            return this; 
        }
        public EmailLogBuilder status(EmailStatus status) { 
            this.status = status; 
            return this; 
        }
        public EmailLogBuilder createdAt(Instant createdAt) { 
            this.createdAt = createdAt; 
            return this; }
        public EmailLogBuilder updatedAt(Instant updatedAt) { 
            this.updatedAt = updatedAt; 
            return this; }

        public EmailLog build() {
            EmailLog emailLog = new EmailLog();
            emailLog.setId(this.id);
            emailLog.setApplication(this.application);
            emailLog.setSubject(this.subject);
            emailLog.setBody(this.body);
            emailLog.setSentAt(this.sentAt);
            emailLog.setStatus(this.status);
            emailLog.setCreatedAt(this.createdAt);
            emailLog.setUpdatedAt(this.updatedAt);
            return emailLog;
        }
    }
}
