"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { useAuth } from "../contexts/AuthContext"
import "../styles/LoginPage.css"

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const { login, cadastrar } = useAuth()

  // Validação do formulário
  const validateForm = () => {
    const newErrors = {}

    if (!isLogin && !formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.senha.trim()) {
      newErrors.senha = "Senha é obrigatória"
    } else if (formData.senha.length < 6) {
      newErrors.senha = "Senha deve ter pelo menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      let success = false

      if (isLogin) {
        success = await login(formData.email, formData.senha)
      } else {
        success = await cadastrar(formData.nome, formData.email, formData.senha)
      }

      if (!success) {
        setErrors({ submit: "Credenciais inválidas ou erro de conexão" })
      }
    } catch (error) {
      console.error('Erro no formulário:', error)
      setErrors({ submit: "Erro de conexão. Verifique se o backend está rodando." })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="login-page">
      <Card className="login-card">
        {/* Cabeçalho do card */}
        <CardHeader className="text-center">
          <div className="login-logo">
            <div className="login-logo-dot"></div>
          </div>
          <CardTitle>{isLogin ? "Entrar" : "Criar Conta"}</CardTitle>
          <CardDescription>
            {isLogin ? "Entre na sua conta para continuar" : "Crie sua conta para começar"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Formulário de login/cadastro */}
          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div>
                <div className="input-group">
                  <User className="input-icon" />
                  <Input
                    type="text"
                    placeholder="Nome completo"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    className="input-with-icon"
                    error={errors.nome}
                  />
                </div>
                {errors.nome && <p className="error-message">{errors.nome}</p>}
              </div>
            )}

            <div>
              <div className="input-group">
                <Mail className="input-icon" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="input-with-icon"
                  error={errors.email}
                />
              </div>
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div>
              <div className="input-group">
                <Lock className="input-icon" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={(e) => handleInputChange("senha", e.target.value)}
                  className="input-with-icons"
                  error={errors.senha}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.senha && <p className="error-message">{errors.senha}</p>}
            </div>

            {errors.submit && <p className="error-message text-center">{errors.submit}</p>}

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Carregando..." : isLogin ? "Entrar" : "Criar Conta"}
            </button>
          </form>

          {/* Alternar entre login e cadastro */}
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setErrors({})
                setFormData({ nome: "", email: "", senha: "" })
              }}
              className="toggle-link"
            >
              {isLogin ? "Não tem conta? Criar uma agora" : "Já tem conta? Fazer login"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
