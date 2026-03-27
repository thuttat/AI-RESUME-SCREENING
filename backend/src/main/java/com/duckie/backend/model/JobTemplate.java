package com.duckie.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "job_template")
public class JobTemplate  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    public JobTemplate() {}

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }
    public String getTitle() { 
        return title; 
    }
    public void setTitle(String title) { 
        this.title = title; 
    }
    public String getDescription() { 
        return description;
     }
    public void setDescription(String description) { 
        this.description = description; 
    }
    public User getCreatedBy() {
        return createdBy; 
    }
    public void setCreatedBy(User createdBy) { 
        this.createdBy = createdBy; 
    }

    public static JobTemplateBuilder builder() { 
        return new JobTemplateBuilder(); }

    public static final class JobTemplateBuilder {
        private Long id;
        private String title;
        private String description;
        private User createdBy;

        public JobTemplateBuilder id(Long id) { 
            this.id = id; 
            return this; 
        }
        public JobTemplateBuilder title(String title) { 
            this.title = title; 
            return this; 
        }
        public JobTemplateBuilder description(String description) { 
            this.description = description; 
            return this;
         }
        public JobTemplateBuilder createdBy(User createdBy) { 
            this.createdBy = createdBy; 
            return this; 
        }

        public JobTemplate build() {
            JobTemplate template = new JobTemplate();
            template.setId(this.id);
            template.setTitle(this.title);
            template.setDescription(this.description);
            template.setCreatedBy(this.createdBy);
            return template;
        }
    }
}