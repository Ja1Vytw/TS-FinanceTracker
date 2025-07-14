package com.techsanca.finance.controller;

import com.techsanca.finance.model.Alerta;
import com.techsanca.finance.service.AlertaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/alertas")
public class AlertaController {
    @Autowired
    private AlertaService alertaService;

    @PostMapping
    public ResponseEntity<Alerta> criar(@RequestBody Alerta alerta) {
        return ResponseEntity.ok(alertaService.save(alerta));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Alerta>> listarPorUsuario(@PathVariable String usuarioId) {
        return ResponseEntity.ok(alertaService.findByUsuarioId(usuarioId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id) {
        alertaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
} 