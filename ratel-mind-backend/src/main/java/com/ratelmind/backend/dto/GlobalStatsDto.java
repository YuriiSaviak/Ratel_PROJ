package com.ratelmind.backend.dto;

public record GlobalStatsDto(
        long totalParticipants,
        double averageScore,
        int minScore,
        int maxScore,
        double percentile,
        int level1Count,
        int level2Count,
        int level3Count,
        int level4Count,
        int level5Count
) {}
