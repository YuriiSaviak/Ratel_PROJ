package com.ratelmind.backend.service;

import com.ratelmind.backend.dto.EventResultRequestDto;
import com.ratelmind.backend.dto.RoomStatsDto;
import com.ratelmind.backend.model.EventResult;
import com.ratelmind.backend.repo.EventResultRepository;
import com.ratelmind.backend.util.LevelConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomStatsService {

    private final EventResultRepository eventResultRepository;

    @Transactional
    public RoomStatsDto saveEventResultAndGetRoomStats(EventResultRequestDto dto) {
        String room = dto.roomCode().trim();
        String nick = dto.nickname().trim();

        // UPSERT: one nickname per room (update if exists)
        EventResult eventResult = eventResultRepository
                .findByRoomCodeAndNickname(room, nick)
                .orElseGet(() -> EventResult.builder()
                        .roomCode(room)
                        .nickname(nick)
                        .totalScore(0)
                        .level("Level 1")
                        .answersJson(null)
                        .build()
                );

        eventResult.setTotalScore(dto.totalScore());
        eventResult.setLevel(dto.level());
        eventResult.setAnswersJson(Optional.of(dto.answers()).orElse(List.of()));

        eventResultRepository.save(eventResult);

        return this.buildRoomStats(room, nick);
    }

    public RoomStatsDto buildRoomStats(String roomCode, String nickname) {
        List<EventResult> all = eventResultRepository.findByRoomCodeOrderByTotalScoreDesc(roomCode);
        if (all.isEmpty()) {
            return new RoomStatsDto(
                    roomCode,
                    0,
                    0,
                    0,
                    0,
                    0, 0, 0, 0, 0,
                    List.of(),
                    null
            );
        }

        int count = all.size();
        int min = all.stream().mapToInt(EventResult::getTotalScore).min().orElse(0);
        int max = all.stream().mapToInt(EventResult::getTotalScore).max().orElse(0);
        double avg = all.stream().mapToInt(EventResult::getTotalScore).average().orElse(0);

        int l1 = 0, l2 = 0, l3 = 0, l4 = 0, l5 = 0;
        List<RoomStatsDto.RankingItem> ranking = new ArrayList<>();

        all.sort(Comparator.comparingInt(EventResult::getTotalScore).reversed());

        int position = 1;
        RoomStatsDto.RankingItem current = null;

        for (EventResult r : all) {
            String lvl = r.getLevel();

            int idx = LevelConverter.levelIndex(lvl);
            if (idx == 1) l1++;
            else if (idx == 2) l2++;
            else if (idx == 3) l3++;
            else if (idx == 4) l4++;
            else if (idx == 5) l5++;

            RoomStatsDto.RankingItem item =
                    new RoomStatsDto.RankingItem(r.getNickname(), r.getTotalScore(), lvl, position);
            ranking.add(item);

            if (nickname != null && nickname.equals(r.getNickname()) && current == null) {
                current = item;
            }

            position++;
        }

        return new RoomStatsDto(
                roomCode,
                count,
                avg,
                min,
                max,
                l1, l2, l3, l4, l5,
                ranking,
                current
        );
    }

}
