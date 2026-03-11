package com.ratelmind.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.Range;

import java.util.List;

public record EventResultRequestDto(
        @NotBlank String roomCode,
        @NotBlank String nickname,
        @NotNull @Range(min = 48, max = 240) Integer totalScore,
        @NotBlank String level,
        @NotNull @Size(min = 48, max = 48) List<@NotNull @Range(min = 1, max = 5) Integer> answers
) {}
