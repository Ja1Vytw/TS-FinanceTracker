package com.techsanca.finance.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "categorias")
public class Categoria {
    @Id
    private String id;
    private String nome;
    private String tipo; // RECEITA ou DESPESA
    private String usuarioId; // Dono da categoria
    private String icone; // Ícone da categoria
} 