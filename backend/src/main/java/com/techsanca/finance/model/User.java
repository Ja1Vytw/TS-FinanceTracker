package com.techsanca.finance.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Getter
@Setter
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String nome;
    private String email;
    private String senha;
    private List<String> categoriasPersonalizadas; // IDs das categorias customizadas
} 