package com.techsanca.finance.controller;

import com.techsanca.finance.model.User;
import com.techsanca.finance.service.UserService;
import com.techsanca.finance.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email já cadastrado"));
        }
        return ResponseEntity.ok(userService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String senha = loginData.get("senha");
        Optional<User> userOpt = userService.authenticate(email, senha);
        if (userOpt.isPresent()) {
            String token = jwtUtil.generateToken(email);
            return ResponseEntity.ok(Map.of(
                "token", token,
                "usuarioId", userOpt.get().getId(),
                "nome", userOpt.get().getNome(),
                "email", userOpt.get().getEmail()
            ));
        }
        return ResponseEntity.status(401).body("Usuário ou senha inválidos");
    }
} 