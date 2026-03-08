package com.ratelmind.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "results")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
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
    @CreationTimestamp
    private Instant createdAt;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Result result = (Result) o;
        return Objects.equals(id, result.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
