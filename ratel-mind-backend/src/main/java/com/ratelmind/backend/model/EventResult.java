package com.ratelmind.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(
        name = "event_results",
        uniqueConstraints = @UniqueConstraint(columnNames = {"room_code", "nickname"})
)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="room_code", nullable = false)
    private String roomCode;

    @Column(nullable = false)
    private String nickname;

    @Column(name="total_score", nullable = false)
    private int totalScore;

    @Column(nullable = false)
    private String level;

    @Column(name="answers_json")
    private String answersJson;

    @Column(name="created_at", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        EventResult that = (EventResult) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
