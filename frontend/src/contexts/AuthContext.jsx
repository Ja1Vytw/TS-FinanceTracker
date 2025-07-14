"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { authService } from "../services/api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar autenticação ao carregar a aplicação
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("jwt_token")
        const usuarioSalvo = localStorage.getItem("usuario")
        
        if (token && usuarioSalvo) {
          const usuario = JSON.parse(usuarioSalvo)
          setUsuario(usuario)
        } else {
          setUsuario(null)
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        // Limpar dados corrompidos
        localStorage.removeItem("jwt_token")
        localStorage.removeItem("usuario")
        setUsuario(null)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  // Função de login
  const login = async (email, senha) => {
    try {
      const result = await authService.login(email, senha)
      
      if (result.success) {
        setUsuario(result.usuario)
        return true
      } else {
        console.error('Erro no login:', result.error)
        return false
      }
    } catch (error) {
      console.error('Erro no login:', error)
      return false
    }
  }

  // Função de cadastro
  const cadastrar = async (nome, email, senha) => {
    try {
      const result = await authService.cadastrar(nome, email, senha)
      
      if (result.success) {
        setUsuario(result.usuario)
        return true
      } else {
        console.error('Erro no cadastro:', result.error)
        return false
      }
    } catch (error) {
      console.error('Erro no cadastro:', error)
      return false
    }
  }

  // Função de logout
  const logout = () => {
    try {
      authService.logout()
      setUsuario(null)
    } catch (error) {
      console.error('Erro no logout:', error)
      // Forçar limpeza mesmo se houver erro
      localStorage.removeItem("jwt_token")
      localStorage.removeItem("usuario")
      setUsuario(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        cadastrar,
        logout,
        loading,
        isAuthenticated: !!usuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
