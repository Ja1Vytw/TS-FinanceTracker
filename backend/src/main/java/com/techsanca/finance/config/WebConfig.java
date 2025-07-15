package com.techsanca.finance.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Permite CORS apenas para o domínio do frontend em produção
                registry.addMapping("/api/**")
                        .allowedOrigins(
                            "https://ts-finance-tracker.vercel.app", // Frontend em produção
                            "http://localhost:5173" // Frontend local (Vite)
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true); // Permite envio de cookies/autenticação
            }
        };
    }
} 