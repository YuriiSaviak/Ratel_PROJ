package com.ratelmind.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ratelmind.backend.dto.EventResultRequestDto;
import com.ratelmind.backend.dto.RoomStatsDto;
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
public class RoomStatsController {

    private final RoomStatsService roomStatsService;

    @PostMapping("/event-results")
    public ResponseEntity<RoomStatsDto> saveEventResultAndGetRoomStats(@RequestBody @Valid EventResultRequestDto dto) throws JsonProcessingException {
        return ResponseEntity.ok(roomStatsService.saveEventResultAndGetRoomStats(dto));
    }

    @GetMapping("/rooms/{roomCode}/stats")
    public ResponseEntity<RoomStatsDto> getRoomStats(
            @PathVariable String roomCode,
            @RequestParam(value = "nickname", required = false) String nickname
    ) {
        return ResponseEntity.ok(roomStatsService.buildRoomStats(roomCode, nickname));
    }

}
