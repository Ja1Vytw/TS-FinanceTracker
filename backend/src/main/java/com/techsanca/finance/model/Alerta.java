package com.techsanca.finance.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "alertas")
public class Alerta {
    @Id
    private String id;
    private String tipo;
    private Double valorLimite;
    private Boolean atingido;
    private String usuarioId;
} 