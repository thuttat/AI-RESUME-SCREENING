package com.duckie.backend.entity;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;

@Entity
@Table(name = "email_template", indexes = {
    @Index(name = "idx_email_template_name", columnList = "template_name", unique = true)
})
public class EmailTemplate extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "template_name", nullable = false, length = 100)
    private String templateName;

    @Column(nullable = false)
    private String subject;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String body;

    public EmailTemplate() {}

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }
    public String getTemplateName() { 
        return templateName; 
    }
    public void setTemplateName(String templateName) { 
        this.templateName = templateName; 
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

    public static EmailTemplateBuilder builder() { 
        return new EmailTemplateBuilder(); 
    }

    public static final class EmailTemplateBuilder {
        private Long id;
        private String templateName;
        private String subject;
        private String body;
        private Instant createdAt;
        private Instant updatedAt;

        public EmailTemplateBuilder id(Long id) { 
            this.id = id; 
            return this; 
        }
        public EmailTemplateBuilder templateName(String templateName) { 
            this.templateName = templateName; 
            return this; 
        }
        public EmailTemplateBuilder subject(String subject) { 
            this.subject = subject; 
            return this; 
        }
        public EmailTemplateBuilder body(String body) { 
            this.body = body; 
            return this; 
        }
        public EmailTemplateBuilder createdAt(Instant createdAt) { 
            this.createdAt = createdAt; 
            return this; 
        }
        public EmailTemplateBuilder updatedAt(Instant updatedAt) { 
            this.updatedAt = updatedAt; 
            return this; 
        }

        public EmailTemplate build() {
            EmailTemplate email = new EmailTemplate();
            email.setId(this.id);
            email.setTemplateName(this.templateName);
            email.setSubject(this.subject);
            email.setBody(this.body);
            email.setCreatedAt(this.createdAt);
            email.setUpdatedAt(this.updatedAt);
            return email;
        }
    }
}