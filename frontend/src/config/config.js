// Configurações da aplicação
const config = {
  // URL da API - pode ser alterada para produção
  API_BASE_URL: (import.meta.env.VITE_API_URL || 'http://localhost:8080') + '/api',
  
  // Debug: log da URL da API
  DEBUG: {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    FINAL_URL: (import.meta.env.VITE_API_URL || 'http://localhost:8080') + '/api'
  },
  
  // Configurações de autenticação
  AUTH: {
    TOKEN_KEY: 'jwt_token',
    USER_KEY: 'usuario',
  },
  
  // Configurações de paginação
  PAGINATION: {
    ITEMS_PER_PAGE: 10,
  },
  
  // Configurações de toast
  TOAST: {
    DURATION: 3000, // 3 segundos
  },
  
  // Configurações de filtros
  FILTERS: {
    PERIODS: [
      { value: 'todos', label: 'Todos' },
      { value: '7dias', label: 'Últimos 7 dias' },
      { value: '30dias', label: 'Últimos 30 dias' },
      { value: 'mesAtual', label: 'Mês atual' },
    ],
  },
}

export default config 