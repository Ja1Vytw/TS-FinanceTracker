package com.techsanca.finance.config;

import com.techsanca.finance.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        String method = request.getMethod();
        System.out.println("Request path: " + path + " Method: " + method);
        
        // Liberar endpoints públicos
        if ((path.equals("/api/usuarios/login") || path.equals("/api/usuarios/cadastro")) && 
            "POST".equals(method)) {
            System.out.println("Liberando endpoint público: " + path);
            chain.doFilter(request, response);
            return;
        }
        final String authorizationHeader = request.getHeader("Authorization");
        System.out.println("Authorization header: " + (authorizationHeader != null ? "present" : "null"));
        
        String username = null;
        String jwt = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt);
            System.out.println("JWT token: " + jwt.substring(0, Math.min(50, jwt.length())) + "...");
            System.out.println("Extracted username: " + username);
        } else {
            System.out.println("No valid Authorization header found");
        }
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                System.out.println("Tentando autenticar usuário: " + username);
                
                // Verificar se o usuário existe no banco de dados
                var userOpt = userService.findByEmail(username);
                System.out.println("Usuário encontrado no banco: " + userOpt.isPresent());
                
                boolean tokenValid = jwtUtil.validateToken(jwt, username);
                System.out.println("Token válido: " + tokenValid);
                
                if (userOpt.isPresent() && tokenValid) {
                    UserDetails userDetails = org.springframework.security.core.userdetails.User
                            .withUsername(username)
                            .password("")
                            .authorities("USER")
                            .build();
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("Usuário autenticado com sucesso: " + username);
                } else {
                    System.out.println("Token inválido ou usuário não encontrado: " + username);
                    System.out.println("UserOpt present: " + userOpt.isPresent());
                    System.out.println("Token valid: " + tokenValid);
                }
            } catch (Exception e) {
                System.out.println("Erro ao validar token: " + e.getMessage());
                e.printStackTrace();
            }
        } else if (username == null) {
            System.out.println("Username é null - não foi possível extrair do token");
        } else {
            System.out.println("Usuário já autenticado: " + username);
        }
        chain.doFilter(request, response);
    }
} 