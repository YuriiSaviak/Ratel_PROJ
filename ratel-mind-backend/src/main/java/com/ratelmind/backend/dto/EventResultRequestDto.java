package com.ratelmind.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record EventResultRequestDto(
        @NotBlank String roomCode,
        @NotBlank String nickname,
        @NotNull @Min(48) @Max(240) Integer totalScore,
        @NotBlank String level,
        @NotNull @Size(min = 48, max = 48) List<@NotNull @Min(1) @Max(5) Integer> answers
) {}
