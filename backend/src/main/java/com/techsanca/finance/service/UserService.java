package com.techsanca.finance.service;

import com.techsanca.finance.model.User;
import com.techsanca.finance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CategoriaService categoriaService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User register(User user) {
        System.out.println("=== REGISTRANDO NOVO USUÁRIO ===");
        System.out.println("Email: " + user.getEmail());
        System.out.println("Nome: " + user.getNome());
        
        user.setSenha(passwordEncoder.encode(user.getSenha()));
        User userSalvo = userRepository.save(user);
        
        System.out.println("Usuário salvo com ID: " + userSalvo.getId());
        
        // Criar categorias padrão para o novo usuário
        try {
            categoriaService.criarCategoriasPadrao(userSalvo.getId());
        } catch (Exception e) {
            System.err.println("Erro ao criar categorias padrão: " + e.getMessage());
            // Não falhar o cadastro se der erro nas categorias
        }
        
        return userSalvo;
    }

    public Optional<User> authenticate(String email, String senha) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && passwordEncoder.matches(senha, userOpt.get().getSenha())) {
            return userOpt;
        }
        return Optional.empty();
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
} 