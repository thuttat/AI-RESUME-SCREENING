package com.duckie.backend.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "evaluation")
public class Evaluation{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "evaluator_id", nullable = false)
    private User evaluator;

    @Column(nullable = false)
    private int rating;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    @Column(name = "created_at")
    private Instant createdAt;

    public Evaluation() {}

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = Instant.now();
    }

    public int getId() { 
        return id; 
    }
    public void setId(int id) { 
        this.id = id; 
    }
    public Application getApplication() { 
        return application; 
    }
    public void setApplication(Application application) { 
        this.application = application; 
    }
    public User getEvaluator() { 
        return evaluator; 
    }
    public void setEvaluator(User evaluator) { 
        this.evaluator = evaluator; 
    }
    public int getRating() { 
        return rating; 
    }
    public void setRating(int rating) { 
        this.rating = rating; 
    }
    public String getFeedback() { 
        return feedback; 
    }
    public void setFeedback(String feedback) { 
        this.feedback = feedback; 
    }
    public Instant getCreatedAt() { 
        return createdAt; 
    }
    public void setCreatedAt(Instant createdAt) { 
        this.createdAt = createdAt; 
    }

    public static EvaluationBuilder builder() { 
        return new EvaluationBuilder(); 
    }

    public static final class EvaluationBuilder {
        private int id;
        private Application application;
        private User evaluator;
        private int rating;
        private String feedback;
        private Instant createdAt;

        public EvaluationBuilder id(int id) { 
            this.id = id; 
            return this; 
        }
        public EvaluationBuilder application(Application application) { 
            this.application = application; 
            return this; 
        }
        public EvaluationBuilder evaluator(User evaluator) { 
            this.evaluator = evaluator; 
            return this; 
        }
        public EvaluationBuilder rating(int rating) { 
            this.rating = rating; 
            return this; 
        }
        public EvaluationBuilder feedback(String feedback) { 
            this.feedback = feedback; 
            return this; 
        }
        public EvaluationBuilder createdAt(Instant createdAt) { 
            this.createdAt = createdAt; 
            return this; 
        }

        public Evaluation build() {
            Evaluation eval = new Evaluation();
            eval.setId(this.id);
            eval.setApplication(this.application);
            eval.setEvaluator(this.evaluator);
            eval.setRating(this.rating);
            eval.setFeedback(this.feedback);
            eval.setCreatedAt(this.createdAt);
            return eval;
        }
    }
}