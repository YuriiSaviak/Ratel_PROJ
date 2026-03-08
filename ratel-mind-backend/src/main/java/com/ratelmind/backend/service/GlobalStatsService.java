package com.ratelmind.backend.service;

import com.ratelmind.backend.dto.GlobalStatsDto;
import com.ratelmind.backend.model.Result;
import com.ratelmind.backend.repo.ResultRepository;
import com.ratelmind.backend.util.LevelConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GlobalStatsService {

    private final ResultRepository resultRepository;

    public GlobalStatsDto buildGlobalStats(int userScore) {
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
            int idx = LevelConverter.levelIndex(r.getLevel());
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
}
