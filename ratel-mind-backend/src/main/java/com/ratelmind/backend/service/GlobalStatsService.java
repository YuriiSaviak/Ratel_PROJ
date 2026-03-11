package com.ratelmind.backend.service;

import com.ratelmind.backend.dto.GlobalStatsDto;
import com.ratelmind.backend.dto.ResultRequestDto;
import com.ratelmind.backend.model.Result;
import com.ratelmind.backend.repo.ResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GlobalStatsService {

    private final ResultRepository resultRepository;

    @Transactional
    public GlobalStatsDto saveResultAndGetGlobalStats(ResultRequestDto dto) {
        Result result = Result.builder()
                .totalScore(dto.totalScore())
                .level(dto.level())
                .answersJson(Optional.of(dto.answers()).orElse(List.of()))
                .build();

        resultRepository.save(result);
        return this.buildGlobalStats(result.getTotalScore());
    }

    public GlobalStatsDto buildGlobalStats(int userScore) {
        return resultRepository.buildGlobalStats(userScore);
    }
}
