package com.techsanca.finance.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

@RestController
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        // Endpoint simples para health check do Render
        return ResponseEntity.ok("OK");
    }
} 