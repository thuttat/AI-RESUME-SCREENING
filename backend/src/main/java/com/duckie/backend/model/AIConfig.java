package com.duckie.backend.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "ai_config", indexes = {
    @Index(name = "idx_config_key", columnList = "config_key", unique = true)
})
public class AIConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "config_key", nullable = false, length = 50)
    private String configKey;

    @Column(name = "config_value", nullable = false)
    private String configValue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by")
    private User updatedBy;

    @Column(name = "updated_at")
    private Instant updatedAt;

    public AIConfig() {}

    @PrePersist
    protected void onCreate() {
        if (updatedAt == null) updatedAt = Instant.now();
    }

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }
    public String getConfigKey() { 
        return configKey; 
    }
    public void setConfigKey(String configKey) { 
        this.configKey = configKey; 
    }
    public String getConfigValue() { 
        return configValue; 
    }
    public void setConfigValue(String configValue) { 
        this.configValue = configValue; 
    }
    public User getUpdatedBy() { 
        return updatedBy; 
    }
    public void setUpdatedBy(User updatedBy) { 
        this.updatedBy = updatedBy; 
    }
    public Instant getUpdatedAt() { 
        return updatedAt; 
    }
    public void setUpdatedAt(Instant updatedAt) {
         this.updatedAt = updatedAt; 
        }

    public static AIConfigBuilder builder() { 
        return new AIConfigBuilder(); 
    }

    public static final class AIConfigBuilder {
        private Long id;
        private String configKey;
        private String configValue;
        private User updatedBy;
        private Instant updatedAt;

        public AIConfigBuilder id(Long id) { 
            this.id = id; 
            return this; 
        }
        public AIConfigBuilder configKey(String configKey) { 
            this.configKey = configKey; 
            return this; 
        }
        public AIConfigBuilder configValue(String configValue) { 
            this.configValue = configValue;
            return this; 
        }
        public AIConfigBuilder updatedBy(User updatedBy) { 
            this.updatedBy = updatedBy; 
            return this; 
        }
        public AIConfigBuilder updatedAt(Instant updatedAt) { 
            this.updatedAt = updatedAt; 
            return this; 
        }

        public AIConfig build() {
            AIConfig config = new AIConfig();
            config.setId(this.id);
            config.setConfigKey(this.configKey);
            config.setConfigValue(this.configValue);
            config.setUpdatedBy(this.updatedBy);
            config.setUpdatedAt(this.updatedAt);
            return config;
        }
    }
}