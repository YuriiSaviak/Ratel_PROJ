package com.ratelmind.backend.service;

import com.ratelmind.backend.dto.GlobalStatsDto;
import com.ratelmind.backend.dto.ResultRequestDto;
import com.ratelmind.backend.model.Result;
import com.ratelmind.backend.repo.ResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class GlobalStatsService {

    private final ResultRepository resultRepository;

    @Transactional
    public GlobalStatsDto saveResultAndGetGlobalStats(ResultRequestDto dto) {
        Result result = Result.builder()
                .totalScore(dto.totalScore())
                .level(dto.level())
                .answersJson(dto.answers())
                .build();
        log.info("Saving result with total score {} and level {}", dto.totalScore(), dto.level());

        resultRepository.save(result);
        return this.buildGlobalStats(result.getTotalScore());
    }

    public GlobalStatsDto buildGlobalStats(int userScore) {
        log.info("Building global stats for score {}", userScore);
        return resultRepository.buildGlobalStats(userScore);
    }
}
