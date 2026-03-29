package com.ratelmind.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record EmailFormDto(

        @Email
        String email,

        @Size(min = 20, max = 1000)
        String message

) {
}
