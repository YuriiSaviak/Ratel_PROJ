package com.ratelmind.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "event_results",
        uniqueConstraints = @UniqueConstraint(columnNames = {"room_code", "nickname"})
)
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
    private LocalDateTime createdAt = LocalDateTime.now();

    public EventResult() {}

    public EventResult(String roomCode, String nickname, int totalScore, String level, String answersJson) {
        this.roomCode = roomCode;
        this.nickname = nickname;
        this.totalScore = totalScore;
        this.level = level;
        this.answersJson = answersJson;
    }

    public Long getId() { return id; }

    public String getRoomCode() { return roomCode; }
    public void setRoomCode(String roomCode) { this.roomCode = roomCode; }

    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }

    public int getTotalScore() { return totalScore; }
    public void setTotalScore(int totalScore) { this.totalScore = totalScore; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getAnswersJson() { return answersJson; }
    public void setAnswersJson(String answersJson) { this.answersJson = answersJson; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
