package com.ratelmind.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.Range;

import java.util.List;

public record ResultRequestDto(
        @NotNull @Min(48) @Max(240) Integer totalScore,
        @Range(min = 1, max = 5) int level,
        @NotNull @Size(min = 48, max = 48) List<@NotNull @Min(1) @Max(5) Integer> answers
) {}
