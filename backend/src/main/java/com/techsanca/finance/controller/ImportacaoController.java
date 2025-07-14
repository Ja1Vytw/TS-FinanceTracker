package com.techsanca.finance.controller;

import com.techsanca.finance.model.Transacao;
import com.techsanca.finance.service.TransacaoService;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/importacao")
public class ImportacaoController {
    @Autowired
    private TransacaoService transacaoService;

    @PostMapping("/csv")
    public ResponseEntity<?> importarCSV(@RequestParam("file") MultipartFile file, Authentication authentication) {
        String usuarioId = authentication.getName();
        List<Transacao> transacoesImportadas = new ArrayList<>();
        try (CSVParser parser = CSVFormat.DEFAULT.withFirstRecordAsHeader().parse(new InputStreamReader(file.getInputStream()))) {
            for (CSVRecord record : parser) {
                Transacao t = new Transacao();
                t.setUsuarioId(usuarioId);
                t.setData(LocalDate.parse(record.get("data")));
                t.setValor(new BigDecimal(record.get("valor")));
                t.setTipo(record.get("tipo"));
                t.setCategoriaId(record.get("categoriaId"));
                t.setDescricao(record.get("descricao"));
                transacoesImportadas.add(transacaoService.save(t));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao importar CSV: " + e.getMessage());
        }
        return ResponseEntity.ok(transacoesImportadas);
    }
} 