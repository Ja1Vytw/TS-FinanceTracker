package com.techsanca.finance.service;

import com.techsanca.finance.model.Transacao;
import com.techsanca.finance.repository.TransacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class TransacaoService {
    @Autowired
    private TransacaoRepository transacaoRepository;

    public Transacao save(Transacao transacao) {
        System.out.println("=== SALVANDO TRANSAÇÃO NO SERVIÇO ===");
        System.out.println("Transação a ser salva: " + transacao);
        
        Transacao transacaoSalva = transacaoRepository.save(transacao);
        System.out.println("Transação salva no repositório: " + transacaoSalva);
        
        return transacaoSalva;
    }

    public List<Transacao> findByUsuarioId(String usuarioId) {
        System.out.println("=== BUSCANDO TRANSAÇÕES POR USUÁRIO ===");
        System.out.println("UsuarioId: " + usuarioId);
        
        List<Transacao> transacoes = transacaoRepository.findByUsuarioId(usuarioId);
        System.out.println("Transações encontradas no repositório: " + transacoes.size());
        
        return transacoes;
    }

    public List<Transacao> findByUsuarioIdAndPeriodo(String usuarioId, LocalDate start, LocalDate end) {
        return transacaoRepository.findByUsuarioIdAndDataBetween(usuarioId, start, end);
    }

    public List<Transacao> findByUsuarioIdAndCategoria(String usuarioId, String categoriaId) {
        return transacaoRepository.findByUsuarioIdAndCategoriaId(usuarioId, categoriaId);
    }

    public List<Transacao> findByUsuarioIdAndTipo(String usuarioId, String tipo) {
        return transacaoRepository.findByUsuarioIdAndTipo(usuarioId, tipo);
    }

    public void deleteById(String id) {
        transacaoRepository.deleteById(id);
    }
} 