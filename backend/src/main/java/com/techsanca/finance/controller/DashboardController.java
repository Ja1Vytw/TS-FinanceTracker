package com.techsanca.finance.controller;

import com.techsanca.finance.model.Transacao;
import com.techsanca.finance.service.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    @Autowired
    private TransacaoService transacaoService;

    @GetMapping("/saldo-mensal/{usuarioId}")
    public ResponseEntity<Map<String, Object>> saldoMensal(@PathVariable String usuarioId, @RequestParam int ano, @RequestParam int mes) {
        LocalDate inicio = LocalDate.of(ano, mes, 1);
        LocalDate fim = inicio.withDayOfMonth(inicio.lengthOfMonth());
        List<Transacao> transacoes = transacaoService.findByUsuarioIdAndPeriodo(usuarioId, inicio, fim);
        BigDecimal receitas = transacoes.stream()
                .filter(t -> "RECEITA".equalsIgnoreCase(t.getTipo()))
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal despesas = transacoes.stream()
                .filter(t -> "DESPESA".equalsIgnoreCase(t.getTipo()))
                .map(Transacao::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal saldo = receitas.subtract(despesas);
        Map<String, Object> result = new HashMap<>();
        result.put("receitas", receitas);
        result.put("despesas", despesas);
        result.put("saldo", saldo);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/por-categoria/{usuarioId}")
    public ResponseEntity<Map<String, BigDecimal>> porCategoria(@PathVariable String usuarioId, @RequestParam int ano, @RequestParam int mes, @RequestParam String tipo) {
        LocalDate inicio = LocalDate.of(ano, mes, 1);
        LocalDate fim = inicio.withDayOfMonth(inicio.lengthOfMonth());
        List<Transacao> transacoes = transacaoService.findByUsuarioIdAndPeriodo(usuarioId, inicio, fim);
        Map<String, BigDecimal> porCategoria = transacoes.stream()
                .filter(t -> tipo.equalsIgnoreCase(t.getTipo()))
                .collect(Collectors.groupingBy(Transacao::getCategoriaId,
                        Collectors.mapping(Transacao::getValor, Collectors.reducing(BigDecimal.ZERO, BigDecimal::add))));
        return ResponseEntity.ok(porCategoria);
    }
} 