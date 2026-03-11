package com.ratelmind.backend.dto;

public record GlobalStatsDto(
        long totalParticipants,
        double averageScore,
        int minScore,
        int maxScore,
        double percentile,
        long level1Count,
        long level2Count,
        long level3Count,
        long level4Count,
        long level5Count
) {}
