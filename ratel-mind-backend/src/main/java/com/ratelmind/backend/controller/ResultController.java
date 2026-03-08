package com.ratelmind.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ratelmind.backend.dto.EventResultRequestDto;
import com.ratelmind.backend.dto.GlobalStatsDto;
import com.ratelmind.backend.dto.ResultRequestDto;
import com.ratelmind.backend.dto.RoomStatsDto;
import com.ratelmind.backend.model.EventResult;
import com.ratelmind.backend.model.Result;
import com.ratelmind.backend.repo.EventResultRepository;
import com.ratelmind.backend.repo.ResultRepository;
import com.ratelmind.backend.service.GlobalStatsService;
import com.ratelmind.backend.service.RoomStatsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ResultController {

    private final ResultRepository resultRepository;
    private final EventResultRepository eventResultRepository;

    private final RoomStatsService roomStatsService;
    private final GlobalStatsService globalStatsService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/ping")
    public String ping() {
        return "ok";
    }

    // =========================
    // Normal users: global stats
    // =========================

    @PostMapping("/results")
    public ResponseEntity<GlobalStatsDto> saveResultAndGetGlobalStats(
            @RequestBody @Valid ResultRequestDto dto
    ) throws JsonProcessingException {

        Result result = Result.builder()
                .totalScore(dto.totalScore())
                .level(dto.level())
                .answersJson(dto.answers() != null ? objectMapper.writeValueAsString(dto.answers()) : null)
                .build();
        resultRepository.save(result);

        return ResponseEntity.ok(globalStatsService.buildGlobalStats(dto.totalScore()));
    }

    @GetMapping("/stats/global")
    public ResponseEntity<GlobalStatsDto> getGlobalStats(
            @RequestParam("score") int score
    ) {
        return ResponseEntity.ok(globalStatsService.buildGlobalStats(score));
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
        eventResult.setAnswersJson(dto.answers() != null ? objectMapper.writeValueAsString(dto.answers()) : null);

        eventResultRepository.save(eventResult);

        return ResponseEntity.ok(roomStatsService.buildRoomStats(room, nick));
    }

    @GetMapping("/rooms/{roomCode}/stats")
    public ResponseEntity<RoomStatsDto> getRoomStats(
            @PathVariable String roomCode,
            @RequestParam(value = "nickname", required = false) String nickname
    ) {
        return ResponseEntity.ok(roomStatsService.buildRoomStats(roomCode, nickname));
    }
}
