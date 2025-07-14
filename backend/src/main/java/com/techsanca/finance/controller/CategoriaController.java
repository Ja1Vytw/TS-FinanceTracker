package com.techsanca.finance.controller;

import com.techsanca.finance.model.Categoria;
import com.techsanca.finance.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    @PostMapping
    public ResponseEntity<Categoria> criar(@RequestBody Categoria categoria) {
        System.out.println("=== CRIANDO CATEGORIA ===");
        System.out.println("Categoria recebida: " + categoria);
        System.out.println("Nome: " + categoria.getNome());
        System.out.println("Tipo: " + categoria.getTipo());
        System.out.println("UsuarioId: " + categoria.getUsuarioId());
        
        Categoria categoriaSalva = categoriaService.save(categoria);
        System.out.println("Categoria salva: " + categoriaSalva);
        System.out.println("ID da categoria salva: " + categoriaSalva.getId());
        
        return ResponseEntity.ok(categoriaSalva);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Categoria>> listarPorUsuario(@PathVariable String usuarioId) {
        System.out.println("=== LISTANDO CATEGORIAS ===");
        System.out.println("UsuarioId: " + usuarioId);
        
        List<Categoria> categorias = categoriaService.findByUsuarioId(usuarioId);
        System.out.println("Categorias encontradas: " + categorias.size());
        for (Categoria cat : categorias) {
            System.out.println("- " + cat.getNome() + " (" + cat.getTipo() + ") - ID: " + cat.getId());
        }
        
        return ResponseEntity.ok(categorias);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> atualizar(@PathVariable String id, @RequestBody Categoria categoria) {
        categoria.setId(id);
        return ResponseEntity.ok(categoriaService.save(categoria));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id) {
        categoriaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
} 