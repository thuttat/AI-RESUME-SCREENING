package com.duckie.backend.model;

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
public class EmailTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "template_name", nullable = false, length = 100)
    private String templateName;

    @Column(nullable = false)
    private String subject;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String body;

    public EmailTemplate() {}

    public int getId() { 
        return id; 
    }
    public void setId(int id) { 
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
        private int id;
        private String templateName;
        private String subject;
        private String body;

        public EmailTemplateBuilder id(int id) { 
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

        public EmailTemplate build() {
            EmailTemplate email = new EmailTemplate();
            email.setId(this.id);
            email.setTemplateName(this.templateName);
            email.setSubject(this.subject);
            email.setBody(this.body);
            return email;
        }
    }
}