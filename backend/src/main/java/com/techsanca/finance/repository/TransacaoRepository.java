package com.techsanca.finance.repository;

import com.techsanca.finance.model.Transacao;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDate;
import java.util.List;

public interface TransacaoRepository extends MongoRepository<Transacao, String> {
    List<Transacao> findByUsuarioId(String usuarioId);
    List<Transacao> findByUsuarioIdAndDataBetween(String usuarioId, LocalDate start, LocalDate end);
    List<Transacao> findByUsuarioIdAndCategoriaId(String usuarioId, String categoriaId);
    List<Transacao> findByUsuarioIdAndTipo(String usuarioId, String tipo);
} 