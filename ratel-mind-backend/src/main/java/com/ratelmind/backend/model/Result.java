package com.ratelmind.backend.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "results")
public class Result {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "total_score", nullable = false)
    private int totalScore;

    @Column(nullable = false)
    private String level;

    @Column(name = "answers_json", columnDefinition = "text")
    private String answersJson;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt = Instant.now();

    public Result() {
    }

    public Result(int totalScore, String level, String answersJson) {
        this.totalScore = totalScore;
        this.level = level;
        this.answersJson = answersJson;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public int getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getAnswersJson() {
        return answersJson;
    }

    public void setAnswersJson(String answersJson) {
        this.answersJson = answersJson;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
