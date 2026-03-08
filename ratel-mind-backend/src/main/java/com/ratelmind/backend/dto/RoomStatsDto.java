package com.ratelmind.backend.dto;

import java.util.List;

public record RoomStatsDto(
        String roomCode,
        int participantCount,
        double averageScore,
        int minScore,
        int maxScore,
        int level1Count,
        int level2Count,
        int level3Count,
        int level4Count,
        int level5Count,
        List<RankingItem> ranking,
        RankingItem currentUser
) {
    public record RankingItem(
            String nickname,
            int totalScore,
            String level,
            int position
    ) {}
}
