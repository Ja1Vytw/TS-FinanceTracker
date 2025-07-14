package com.techsanca.finance.repository;

import com.techsanca.finance.model.Categoria;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CategoriaRepository extends MongoRepository<Categoria, String> {
    List<Categoria> findByUsuarioId(String usuarioId);
} 