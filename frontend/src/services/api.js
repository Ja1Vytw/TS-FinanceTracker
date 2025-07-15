import axios from 'axios'
import config from '../config/config.js'

// Configuração base da API
const API_BASE_URL = config.API_BASE_URL

// Debug: log das configurações
console.log('=== CONFIGURAÇÃO DA API ===')
console.log('VITE_API_URL:', config.DEBUG.VITE_API_URL)
console.log('API_BASE_URL:', config.DEBUG.FINAL_URL)
console.log('Config completo:', config)

// Criar instância do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token JWT em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('jwt_token')
      localStorage.removeItem('usuario')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

// Serviços de Autenticação
export const authService = {
  // Login
  login: async (email, senha) => {
    try {
      console.log('=== INÍCIO DO LOGIN ===')
      console.log('URL da API:', API_BASE_URL)
      console.log('Tentando fazer login:', { email })
      console.log('Dados sendo enviados:', { email, senha })
      
      const response = await api.post('/usuarios/login', { email, senha })
      console.log('Resposta do login:', response.data)
      
      // O backend retorna: { email, nome, usuarioId, token }
      const { token, email: userEmail, nome, usuarioId } = response.data
      
      // Criar objeto usuário com os dados retornados
      const usuario = {
        id: usuarioId,
        nome: nome,
        email: userEmail
      }
      
      // Salvar token e dados do usuário
      localStorage.setItem('jwt_token', token)
      localStorage.setItem('usuario', JSON.stringify(usuario))
      
      console.log('=== LOGIN CONCLUÍDO COM SUCESSO ===')
      console.log('Usuário salvo:', usuario)
      return { success: true, usuario }
    } catch (error) {
      console.error('=== ERRO NO LOGIN ===')
      console.error('Erro completo:', error)
      console.error('Status:', error.response?.status)
      console.error('Status Text:', error.response?.statusText)
      console.error('Data:', error.response?.data)
      console.error('Headers:', error.response?.headers)
      console.error('URL tentada:', error.config?.url)
      console.error('Método:', error.config?.method)
      console.error('Dados enviados:', error.config?.data)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao fazer login' 
      }
    }
  },

  // Cadastro
  cadastrar: async (nome, email, senha) => {
    try {
      console.log('=== INÍCIO DO CADASTRO ===')
      console.log('URL da API:', API_BASE_URL)
      console.log('Tentando cadastrar usuário:', { nome, email })
      console.log('Dados sendo enviados:', { nome, email, senha })
      
      const response = await api.post('/usuarios/cadastro', { nome, email, senha })
      console.log('Resposta do cadastro:', response.data)
      
      // O backend retorna: { id, nome, email, senha }
      const { id, nome: userName, email: userEmail } = response.data
      
      // Após cadastro bem-sucedido, fazer login automaticamente
      console.log('Fazendo login automático...')
      const loginResponse = await api.post('/usuarios/login', { email, senha })
      console.log('Resposta do login:', loginResponse.data)
      const { token } = loginResponse.data
      
      // Criar objeto usuário com os dados do cadastro
      const usuario = {
        id: id,
        nome: userName,
        email: userEmail
      }
      
      // Salvar token e dados do usuário
      localStorage.setItem('jwt_token', token)
      localStorage.setItem('usuario', JSON.stringify(usuario))
      
      console.log('=== CADASTRO CONCLUÍDO COM SUCESSO ===')
      console.log('Usuário salvo:', usuario)
      return { success: true, usuario }
    } catch (error) {
      console.error('=== ERRO NO CADASTRO ===')
      console.error('Erro completo:', error)
      console.error('Status:', error.response?.status)
      console.error('Status Text:', error.response?.statusText)
      console.error('Data:', error.response?.data)
      console.error('Headers:', error.response?.headers)
      console.error('URL tentada:', error.config?.url)
      console.error('Método:', error.config?.method)
      console.error('Dados enviados:', error.config?.data)
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Erro ao fazer cadastro' 
      }
    }
  },

  // Logout
  logout: () => {
    try {
      localStorage.removeItem('jwt_token')
      localStorage.removeItem('usuario')
      console.log('Logout realizado com sucesso')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  },

  // Verificar se está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('jwt_token')
  },

  // Obter usuário atual
  getCurrentUser: () => {
    const usuario = localStorage.getItem('usuario')
    return usuario ? JSON.parse(usuario) : null
  }
}

// Serviços de Transações
export const transacoesService = {
  // Listar transações
  listar: async (filtros = {}) => {
    try {
      console.log('=== LISTANDO TRANSAÇÕES ===')
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      console.log('Usuário:', usuario)
      
      if (!usuario || !usuario.id) {
        console.log('Usuário não autenticado')
        return { success: false, error: 'Usuário não autenticado' }
      }
      
      const params = new URLSearchParams()
      
      if (filtros.categoria) params.append('categoria', filtros.categoria)
      if (filtros.tipo) params.append('tipo', filtros.tipo)
      if (filtros.dataInicio) params.append('dataInicio', filtros.dataInicio)
      if (filtros.dataFim) params.append('dataFim', filtros.dataFim)
      
      const url = `/transacoes/usuario/${usuario.id}?${params.toString()}`
      console.log('URL da requisição:', url)
      
      const response = await api.get(url)
      console.log('Resposta do backend:', response.data)
      console.log('Quantidade de transações recebidas:', response.data.length)
      
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Erro ao listar transações:', error)
      console.error('Status:', error.response?.status)
      console.error('Data:', error.response?.data)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao carregar transações' 
      }
    }
  },

  // Buscar transação por ID
  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/transacoes/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Erro ao buscar transação:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao buscar transação' 
      }
    }
  },

  // Criar transação
  criar: async (transacao) => {
    try {
      console.log('=== CRIANDO TRANSAÇÃO ===')
      console.log('Transação original:', transacao)
      
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      console.log('Usuário:', usuario)
      
      if (!usuario || !usuario.id) {
        console.log('Usuário não autenticado')
        return { success: false, error: 'Usuário não autenticado' }
      }
      
      // Adicionar usuarioId à transação
      const transacaoComUsuario = { ...transacao, usuarioId: usuario.id }
      console.log('Transação com usuário:', transacaoComUsuario)
      
      const response = await api.post('/transacoes', transacaoComUsuario)
      console.log('Resposta do backend:', response.data)
      
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Erro ao criar transação:', error)
      console.error('Status:', error.response?.status)
      console.error('Data:', error.response?.data)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao criar transação' 
      }
    }
  },

  // Atualizar transação
  atualizar: async (id, transacao) => {
    try {
      const response = await api.put(`/transacoes/${id}`, transacao)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Erro ao atualizar transação:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao atualizar transação' 
      }
    }
  },

  // Deletar transação
  deletar: async (id) => {
    try {
      await api.delete(`/transacoes/${id}`)
      return { success: true }
    } catch (error) {
      console.error('Erro ao deletar transação:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao deletar transação' 
      }
    }
  }
}

// Serviços de Categorias
export const categoriasService = {
  // Listar categorias
  listar: async () => {
    try {
      console.log('=== LISTANDO CATEGORIAS NO FRONTEND ===')
      
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      if (!usuario || !usuario.id) {
        return { success: false, error: 'Usuário não autenticado' }
      }
      
      console.log('UsuarioId:', usuario.id)
      const response = await api.get(`/categorias/usuario/${usuario.id}`)
      console.log('Categorias recebidas:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Erro ao listar categorias:', error)
      console.error('Status:', error.response?.status)
      console.error('Data:', error.response?.data)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao carregar categorias' 
      }
    }
  },

  // Criar categoria
  criar: async (categoria) => {
    try {
      console.log('=== CRIANDO CATEGORIA NO FRONTEND ===')
      console.log('Categoria original:', categoria)
      
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      if (!usuario || !usuario.id) {
        return { success: false, error: 'Usuário não autenticado' }
      }
      
      console.log('Usuário:', usuario)
      
      // Adicionar usuarioId à categoria
      const categoriaComUsuario = { ...categoria, usuarioId: usuario.id }
      console.log('Categoria com usuário:', categoriaComUsuario)
      
      const response = await api.post('/categorias', categoriaComUsuario)
      console.log('Resposta do backend:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Erro ao criar categoria:', error)
      console.error('Status:', error.response?.status)
      console.error('Data:', error.response?.data)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao criar categoria' 
      }
    }
  },

  // Atualizar categoria
  atualizar: async (id, categoria) => {
    try {
      const response = await api.put(`/categorias/${id}`, categoria)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao atualizar categoria' 
      }
    }
  },

  // Deletar categoria
  deletar: async (id) => {
    try {
      await api.delete(`/categorias/${id}`)
      return { success: true }
    } catch (error) {
      console.error('Erro ao deletar categoria:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao deletar categoria' 
      }
    }
  }
}

// Serviços de Dashboard
export const dashboardService = {
  // Obter dados do dashboard
  obterResumo: async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      if (!usuario || !usuario.id) {
        return { success: false, error: 'Usuário não autenticado' }
      }
      
      const hoje = new Date()
      const ano = hoje.getFullYear()
      const mes = hoje.getMonth() + 1
      
      const response = await api.get(`/dashboard/saldo-mensal/${usuario.id}?ano=${ano}&mes=${mes}`)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('Erro ao obter resumo do dashboard:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erro ao carregar dashboard' 
      }
    }
  }
}

export default api 