package com.techsanca.finance.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Document(collection = "transacoes")
public class Transacao {
    @Id
    private String id;
    private LocalDate data;
    private BigDecimal valor;
    private String tipo; // RECEITA ou DESPESA
    private String categoriaId;
    private String descricao;
    private String usuarioId;
} 