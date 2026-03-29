package com.ratelmind.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record EmailFormDto(

        @NotBlank
        String name,

        String surname,

        @Email
        String email,

        @Pattern(regexp = "^\\+?[0-9]{7,15}$")
        String phoneNumber,

        @Size(min = 20, max = 1000)
        String message

) {
}
