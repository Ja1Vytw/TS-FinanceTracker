package com.techsanca.finance.service;

import com.techsanca.finance.model.Categoria;
import com.techsanca.finance.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    public Categoria save(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public List<Categoria> findByUsuarioId(String usuarioId) {
        return categoriaRepository.findByUsuarioId(usuarioId);
    }

    public void deleteById(String id) {
        categoriaRepository.deleteById(id);
    }

    // Método para criar categorias padrão para um novo usuário
    public void criarCategoriasPadrao(String usuarioId) {
        System.out.println("=== CRIANDO CATEGORIAS PADRÃO ===");
        System.out.println("UsuarioId: " + usuarioId);
        
        // Categorias de despesas
        String[] categoriasDespesas = {
            "Alimentação", "Transporte", "Moradia", "Saúde", "Educação", 
            "Lazer", "Cartão de Crédito", "Contas", "Vestuário", "Outros"
        };
        
        // Categorias de receitas
        String[] categoriasReceitas = {
            "Salário", "Freelance", "Investimentos", "Bônus", "Outros"
        };
        
        // Criar categorias de despesas
        for (String nome : categoriasDespesas) {
            Categoria categoria = new Categoria();
            categoria.setNome(nome);
            categoria.setTipo("DESPESA");
            categoria.setUsuarioId(usuarioId);
            categoria.setIcone(getIconePadrao(nome));
            
            Categoria salva = categoriaRepository.save(categoria);
            System.out.println("Categoria criada: " + salva.getNome() + " (" + salva.getTipo() + ")");
        }
        
        // Criar categorias de receitas
        for (String nome : categoriasReceitas) {
            Categoria categoria = new Categoria();
            categoria.setNome(nome);
            categoria.setTipo("RECEITA");
            categoria.setUsuarioId(usuarioId);
            categoria.setIcone(getIconePadrao(nome));
            
            Categoria salva = categoriaRepository.save(categoria);
            System.out.println("Categoria criada: " + salva.getNome() + " (" + salva.getTipo() + ")");
        }
        
        System.out.println("=== CATEGORIAS PADRÃO CRIADAS COM SUCESSO ===");
    }
    
    private String getIconePadrao(String nome) {
        switch (nome.toLowerCase()) {
            case "alimentação":
                return "utensils";
            case "transporte":
                return "car";
            case "moradia":
                return "home";
            case "saúde":
                return "heart";
            case "educação":
                return "book";
            case "lazer":
                return "gamepad-2";
            case "cartão de crédito":
                return "credit-card";
            case "contas":
                return "file-text";
            case "vestuário":
                return "shirt";
            case "salário":
                return "dollar-sign";
            case "freelance":
                return "briefcase";
            case "investimentos":
                return "trending-up";
            case "bônus":
                return "gift";
            default:
                return "tag";
        }
    }
} 