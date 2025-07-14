package com.techsanca.finance.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller para verificação de saúde da aplicação
 * Usado para monitoramento e health checks
 */
@RestController
public class HealthController {
    
    /**
     * Endpoint de health check
     * Retorna OK se a aplicação estiver funcionando
     */
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }
    
    /**
     * Endpoint de status detalhado
     * Retorna informações sobre o status da aplicação
     */
    @GetMapping("/status")
    public ResponseEntity<Object> status() {
        return ResponseEntity.ok(new StatusResponse(
            "Sistema de Controle Financeiro",
            "1.0.0",
            "online",
            System.currentTimeMillis()
        ));
    }
    
    /**
     * Classe interna para resposta de status
     */
    public static class StatusResponse {
        private String name;
        private String version;
        private String status;
        private long timestamp;
        
        public StatusResponse(String name, String version, String status, long timestamp) {
            this.name = name;
            this.version = version;
            this.status = status;
            this.timestamp = timestamp;
        }
        
        // Getters
        public String getName() { return name; }
        public String getVersion() { return version; }
        public String getStatus() { return status; }
        public long getTimestamp() { return timestamp; }
    }
} 