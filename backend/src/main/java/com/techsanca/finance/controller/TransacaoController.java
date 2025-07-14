package com.techsanca.finance.controller;

import com.techsanca.finance.model.Transacao;
import com.techsanca.finance.service.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/transacoes")
public class TransacaoController {
    @Autowired
    private TransacaoService transacaoService;

    @PostMapping
    public ResponseEntity<Transacao> criar(@RequestBody Transacao transacao) {
        System.out.println("=== CRIANDO TRANSAÇÃO ===");
        System.out.println("Transação recebida: " + transacao);
        System.out.println("Data recebida: " + transacao.getData());
        System.out.println("Descrição: " + transacao.getDescricao());
        System.out.println("Valor: " + transacao.getValor());
        System.out.println("Tipo: " + transacao.getTipo());
        System.out.println("CategoriaId: " + transacao.getCategoriaId());
        System.out.println("UsuarioId: " + transacao.getUsuarioId());
        
        // Corrigir problema de timezone
        if (transacao.getData() != null) {
            System.out.println("Data original: " + transacao.getData());
            
            // Adicionar 1 dia para compensar o problema de timezone
            LocalDate dataCorrigida = transacao.getData().plusDays(1);
            
            System.out.println("Data corrigida: " + dataCorrigida);
            transacao.setData(dataCorrigida);
        }
        
        Transacao transacaoSalva = transacaoService.save(transacao);
        System.out.println("Transação salva: " + transacaoSalva);
        System.out.println("Data salva: " + transacaoSalva.getData());
        System.out.println("ID da transação salva: " + transacaoSalva.getId());
        
        // Verificar se a transação foi realmente salva
        List<Transacao> transacoesDoUsuario = transacaoService.findByUsuarioId(transacao.getUsuarioId());
        System.out.println("Total de transações do usuário após salvar: " + transacoesDoUsuario.size());
        
        return ResponseEntity.ok(transacaoSalva);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Transacao>> listarPorUsuario(@PathVariable String usuarioId) {
        System.out.println("=== LISTANDO TRANSAÇÕES ===");
        System.out.println("UsuarioId: " + usuarioId);
        
        List<Transacao> transacoes = transacaoService.findByUsuarioId(usuarioId);
        System.out.println("Transações encontradas: " + transacoes.size());
        
        if (transacoes.isEmpty()) {
            System.out.println("NENHUMA TRANSAÇÃO ENCONTRADA para o usuário " + usuarioId);
        } else {
            for (Transacao t : transacoes) {
                System.out.println("- " + t.getDescricao() + " (" + t.getData() + ") - R$ " + t.getValor() + " - CategoriaId: " + t.getCategoriaId() + " - ID: " + t.getId());
            }
        }
        
        return ResponseEntity.ok(transacoes);
    }

    @GetMapping("/usuario/{usuarioId}/periodo")
    public ResponseEntity<List<Transacao>> listarPorPeriodo(@PathVariable String usuarioId, @RequestParam String inicio, @RequestParam String fim) {
        LocalDate start = LocalDate.parse(inicio);
        LocalDate end = LocalDate.parse(fim);
        return ResponseEntity.ok(transacaoService.findByUsuarioIdAndPeriodo(usuarioId, start, end));
    }

    @GetMapping("/usuario/{usuarioId}/categoria/{categoriaId}")
    public ResponseEntity<List<Transacao>> listarPorCategoria(@PathVariable String usuarioId, @PathVariable String categoriaId) {
        return ResponseEntity.ok(transacaoService.findByUsuarioIdAndCategoria(usuarioId, categoriaId));
    }

    @GetMapping("/usuario/{usuarioId}/tipo/{tipo}")
    public ResponseEntity<List<Transacao>> listarPorTipo(@PathVariable String usuarioId, @PathVariable String tipo) {
        return ResponseEntity.ok(transacaoService.findByUsuarioIdAndTipo(usuarioId, tipo));
    }

    @GetMapping("/teste/{usuarioId}")
    public ResponseEntity<String> testeTransacoes(@PathVariable String usuarioId) {
        System.out.println("=== TESTE DE TRANSAÇÕES ===");
        System.out.println("UsuarioId: " + usuarioId);
        
        // Buscar todas as transações do usuário
        List<Transacao> transacoes = transacaoService.findByUsuarioId(usuarioId);
        System.out.println("Total de transações encontradas: " + transacoes.size());
        
        StringBuilder resultado = new StringBuilder();
        resultado.append("Total de transações: ").append(transacoes.size()).append("\n");
        
        for (Transacao t : transacoes) {
            resultado.append("- ID: ").append(t.getId())
                    .append(", Descrição: ").append(t.getDescricao())
                    .append(", Valor: ").append(t.getValor())
                    .append(", Data: ").append(t.getData())
                    .append(", Tipo: ").append(t.getTipo())
                    .append(", CategoriaId: ").append(t.getCategoriaId())
                    .append("\n");
        }
        
        return ResponseEntity.ok(resultado.toString());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transacao> atualizar(@PathVariable String id, @RequestBody Transacao transacao) {
        transacao.setId(id);
        return ResponseEntity.ok(transacaoService.save(transacao));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id) {
        transacaoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
} 