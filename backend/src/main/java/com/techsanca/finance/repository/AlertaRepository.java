package com.techsanca.finance.repository;

import com.techsanca.finance.model.Alerta;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface AlertaRepository extends MongoRepository<Alerta, String> {
    List<Alerta> findByUsuarioId(String usuarioId);
} 