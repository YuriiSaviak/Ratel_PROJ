package com.ratelmind.backend.controller;

import com.ratelmind.backend.dto.GlobalStatsDto;
import com.ratelmind.backend.dto.ResultRequestDto;
import com.ratelmind.backend.service.GlobalStatsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ResultsController {

    private final GlobalStatsService globalStatsService;

    @PostMapping("/results")
    public ResponseEntity<GlobalStatsDto> saveResultAndGetGlobalStats(@RequestBody @Valid ResultRequestDto dto) {
        return ResponseEntity.ok(globalStatsService.saveResultAndGetGlobalStats(dto));
    }

    @GetMapping("/stats/global")
    public ResponseEntity<GlobalStatsDto> getGlobalStats(@RequestParam("score") int score) {
        return ResponseEntity.ok(globalStatsService.buildGlobalStats(score));
    }

}
