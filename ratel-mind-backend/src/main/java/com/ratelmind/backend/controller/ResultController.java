package com.ratelmind.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ratelmind.backend.dto.*;
import com.ratelmind.backend.model.EventResult;
import com.ratelmind.backend.model.Result;
import com.ratelmind.backend.repo.EventResultRepository;
import com.ratelmind.backend.repo.ResultRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ResultController {

    private final ResultRepository resultRepository;
    private final EventResultRepository eventResultRepository;
    private final ObjectMapper objectMapper;

    public ResultController(ResultRepository resultRepository,
                            EventResultRepository eventResultRepository,
                            ObjectMapper objectMapper) {
        this.resultRepository = resultRepository;
        this.eventResultRepository = eventResultRepository;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/ping")
    public String ping() {
        return "ok";
    }

    // =========================
    // Helpers
    // =========================

    // Accepts: "Level 3" OR "Level III" OR "Level III (something)"
    private int levelIndex(String lvl) {
        if (lvl == null) return 0;
        String s = lvl.trim();

        // Arabic
        if (s.startsWith("Level 1")) return 1;
        if (s.startsWith("Level 2")) return 2;
        if (s.startsWith("Level 3")) return 3;
        if (s.startsWith("Level 4")) return 4;
        if (s.startsWith("Level 5")) return 5;

        // Roman
        if (s.startsWith("Level II")) return 2;
        if (s.startsWith("Level III")) return 3;
        if (s.startsWith("Level IV")) return 4;
        if (s.startsWith("Level V")) return 5;

        // "Level I" but NOT II/III/IV
        if (s.startsWith("Level I")) return 1;

        return 0;
    }

    // =========================
    // Normal users: global stats
    // =========================

    @PostMapping("/results")
    public ResponseEntity<GlobalStatsDto> saveResultAndGetGlobalStats(
            @RequestBody @Valid ResultRequestDto dto
    ) throws JsonProcessingException {

        Result result = new Result(
                dto.totalScore(),
                dto.level(),
                dto.answers() != null ? objectMapper.writeValueAsString(dto.answers()) : null
        );
        resultRepository.save(result);

        return ResponseEntity.ok(buildGlobalStats(dto.totalScore()));
    }

    @GetMapping("/stats/global")
    public ResponseEntity<GlobalStatsDto> getGlobalStats(
            @RequestParam("score") int score
    ) {
        return ResponseEntity.ok(buildGlobalStats(score));
    }

    private GlobalStatsDto buildGlobalStats(int userScore) {
        List<Result> all = resultRepository.findAll();
        if (all.isEmpty()) {
            return new GlobalStatsDto(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }

        long total = all.size();
        int min = all.stream().mapToInt(Result::getTotalScore).min().orElse(0);
        int max = all.stream().mapToInt(Result::getTotalScore).max().orElse(0);
        double avg = all.stream().mapToInt(Result::getTotalScore).average().orElse(0);

        long belowOrEqual = all.stream().filter(r -> r.getTotalScore() <= userScore).count();
        double percentile = (belowOrEqual * 100.0) / total;

        int l1 = 0, l2 = 0, l3 = 0, l4 = 0, l5 = 0;

        for (Result r : all) {
            int idx = levelIndex(r.getLevel());
            if (idx == 1) l1++;
            else if (idx == 2) l2++;
            else if (idx == 3) l3++;
            else if (idx == 4) l4++;
            else if (idx == 5) l5++;
        }

        return new GlobalStatsDto(
                total,
                avg,
                min,
                max,
                percentile,
                l1, l2, l3, l4, l5
        );
    }

    // =========================
    // Event rooms: room stats
    // =========================

    @PostMapping("/event-results")
    public ResponseEntity<RoomStatsDto> saveEventResultAndGetRoomStats(
            @RequestBody @Valid EventResultRequestDto dto
    ) throws JsonProcessingException {

        String room = dto.roomCode().trim();
        String nick = dto.nickname().trim();

        // UPSERT: one nickname per room (update if exists)
        EventResult eventResult = eventResultRepository
                .findByRoomCodeAndNickname(room, nick)
                .orElseGet(() -> new EventResult(room, nick, 0, "Level 1", null));

        eventResult.setTotalScore(dto.totalScore());
        eventResult.setLevel(dto.level());
        eventResult.setAnswersJson(dto.answers() != null ? objectMapper.writeValueAsString(dto.answers()) : null);

        eventResultRepository.save(eventResult);

        return ResponseEntity.ok(buildRoomStats(room, nick));
    }

    @GetMapping("/rooms/{roomCode}/stats")
    public ResponseEntity<RoomStatsDto> getRoomStats(
            @PathVariable String roomCode,
            @RequestParam(value = "nickname", required = false) String nickname
    ) {
        return ResponseEntity.ok(buildRoomStats(roomCode, nickname));
    }

    private RoomStatsDto buildRoomStats(String roomCode, String nickname) {
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

            int idx = levelIndex(lvl);
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
