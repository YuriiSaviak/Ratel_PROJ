package com.ratelmind.backend.controller;

import com.ratelmind.backend.dto.EmailFormDto;
import com.ratelmind.backend.service.EmailFormsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email-forms")
@RequiredArgsConstructor
public class EmailFormController {

    private final EmailFormsService emailFormsService;

    @PostMapping
    public ResponseEntity<Void> sendForm(@RequestBody @Valid EmailFormDto emailFormDto) {
        emailFormsService.sendForm(emailFormDto);
        return ResponseEntity.ok().build();
    }

}
