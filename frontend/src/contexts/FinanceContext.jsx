"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { transacoesService, categoriasService, dashboardService } from "../services/api"

// Categorias padrão para novos usuários
const categoriasPadrao = [
  { id: 1, nome: "Alimentação", tipo: "DESPESA", icone: "utensils" },
  { id: 2, nome: "Transporte", tipo: "DESPESA", icone: "car" },
  { id: 3, nome: "Moradia", tipo: "DESPESA", icone: "home" },
  { id: 4, nome: "Saúde", tipo: "DESPESA", icone: "heart" },
  { id: 5, nome: "Educação", tipo: "DESPESA", icone: "book" },
  { id: 6, nome: "Lazer", tipo: "DESPESA", icone: "gamepad-2" },
  { id: 7, nome: "Salário", tipo: "RECEITA", icone: "dollar-sign" },
  { id: 8, nome: "Freelance", tipo: "RECEITA", icone: "briefcase" },
]

// Dados de exemplo para demonstração
const transacoesExemplo = [
  {
    id: 1,
    descricao: "Supermercado",
    valor: 150.5,
    tipo: "DESPESA",
    categoria: "Alimentação",
    data: "2025-07-12",
  },
  {
    id: 2,
    descricao: "Salário",
    valor: 3000.0,
    tipo: "RECEITA",
    categoria: "Salário",
    data: "2025-07-01",
  },
  {
    id: 3,
    descricao: "Uber",
    valor: 25.0,
    tipo: "DESPESA",
    categoria: "Transporte",
    data: "2025-07-10",
  },
  {
    id: 4,
    descricao: "Freelance Design",
    valor: 800.0,
    tipo: "RECEITA",
    categoria: "Freelance",
    data: "2025-07-08",
  },
  {
    id: 5,
    descricao: "Aluguel",
    valor: 1200.0,
    tipo: "DESPESA",
    categoria: "Moradia",
    data: "2025-07-05",
  },
  {
    id: 6,
    descricao: "Netflix",
    valor: 39.9,
    tipo: "DESPESA",
    categoria: "Lazer",
    data: "2025-07-11",
  },
  {
    id: 7,
    descricao: "Consulta Médica",
    valor: 150.0,
    tipo: "DESPESA",
    categoria: "Saúde",
    data: "2025-07-09",
  },
  {
    id: 8,
    descricao: "Bônus",
    valor: 500.0,
    tipo: "RECEITA",
    categoria: "Salário",
    data: "2025-07-07",
  },
  {
    id: 9,
    descricao: "Gasolina",
    valor: 80.0,
    tipo: "DESPESA",
    categoria: "Transporte",
    data: "2025-07-06",
  },
  {
    id: 10,
    descricao: "Curso Online",
    valor: 200.0,
    tipo: "DESPESA",
    categoria: "Educação",
    data: "2025-07-04",
  },
  {
    id: 11,
    descricao: "Restaurante",
    valor: 85.5,
    tipo: "DESPESA",
    categoria: "Alimentação",
    data: "2025-07-03",
  },
  {
    id: 12,
    descricao: "Venda de Item",
    valor: 120.0,
    tipo: "RECEITA",
    categoria: "Freelance",
    data: "2025-07-02",
  },
  {
    id: 13,
    descricao: "Farmácia",
    valor: 45.8,
    tipo: "DESPESA",
    categoria: "Saúde",
    data: "2025-06-30",
  },
  {
    id: 14,
    descricao: "Cinema",
    valor: 32.0,
    tipo: "DESPESA",
    categoria: "Lazer",
    data: "2025-06-28",
  },
  {
    id: 15,
    descricao: "Conta de Luz",
    valor: 180.0,
    tipo: "DESPESA",
    categoria: "Moradia",
    data: "2025-06-25",
  },
]

const FinanceContext = createContext()

export function FinanceProvider({ children }) {
  const [transacoes, setTransacoes] = useState([])
  const [categorias, setCategorias] = useState([])
  const [resumo, setResumo] = useState({ saldo: 0, receitas: 0, despesas: 0 })
  const [loading, setLoading] = useState(true)

  // Carregar dados iniciais da aplicação
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true)
        console.log('=== CARREGANDO DADOS INICIAIS ===')
        
        // Carregar categorias
        console.log('Carregando categorias...')
        const categoriasResult = await categoriasService.listar()
        console.log('Resultado categorias:', categoriasResult)
        if (categoriasResult.success) {
          console.log('Categorias carregadas:', categoriasResult.data)
          setCategorias(categoriasResult.data)
        } else {
          console.log('Falha ao carregar categorias, usando fallback')
          setCategorias(categoriasPadrao)
        }
        
        // Carregar transações
        console.log('Carregando transações...')
        const transacoesResult = await transacoesService.listar()
        console.log('Resultado transações:', transacoesResult)
        if (transacoesResult.success) {
          console.log('Transações carregadas:', transacoesResult.data)
          console.log('Quantidade de transações:', transacoesResult.data.length)
          setTransacoes(transacoesResult.data)
          console.log('Estado de transações atualizado')
        } else {
          console.log('Falha ao carregar transações, usando fallback')
          console.log('Erro:', transacoesResult.error)
          setTransacoes(transacoesExemplo)
        }
        
        // Carregar resumo do dashboard
        console.log('Carregando resumo...')
        const resumoResult = await dashboardService.obterResumo()
        console.log('Resultado resumo:', resumoResult)
        if (resumoResult.success) {
          setResumo(resumoResult.data)
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        // Fallback para dados locais em caso de erro
        setCategorias(categoriasPadrao)
        setTransacoes(transacoesExemplo)
      } finally {
        setLoading(false)
      }
    }
    
    carregarDados()
  }, [])

  // Calcular resumo financeiro
  const calcularResumo = () => {
    const receitas = transacoes.filter((t) => t.tipo === "RECEITA").reduce((acc, t) => acc + t.valor, 0)

    const despesas = transacoes.filter((t) => t.tipo === "DESPESA").reduce((acc, t) => acc + t.valor, 0)

    return {
      saldo: receitas - despesas,
      receitas,
      despesas,
    }
  }

  // Funções de gerenciamento de transações
  const adicionarTransacao = async (transacao) => {
    try {
      console.log('=== ADICIONANDO TRANSAÇÃO ===')
      console.log('Transação a ser adicionada:', transacao)
      console.log('Transações atuais:', transacoes)
      
      const result = await transacoesService.criar(transacao)
      console.log('Resultado da criação:', result)
      
      if (result.success) {
        console.log('Transação criada com sucesso, atualizando estado...')
        console.log('Nova transação:', result.data)
        setTransacoes(prev => {
          const novasTransacoes = [...prev, result.data]
          console.log('Novo estado de transações:', novasTransacoes)
          return novasTransacoes
        })
        return { success: true }
      } else {
        console.log('Falha ao criar transação:', result.error)
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Erro ao adicionar transação:', error)
      return { success: false, error: 'Erro ao adicionar transação' }
    }
  }

  const editarTransacao = async (id, transacao) => {
    try {
      const result = await transacoesService.atualizar(id, transacao)
      if (result.success) {
        setTransacoes(prev => prev.map(t => t.id === id ? result.data : t))
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Erro ao editar transação:', error)
      return { success: false, error: 'Erro ao editar transação' }
    }
  }

  const deletarTransacao = async (id) => {
    try {
      const result = await transacoesService.deletar(id)
      if (result.success) {
        setTransacoes(prev => prev.filter(t => t.id !== id))
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Erro ao deletar transação:', error)
      return { success: false, error: 'Erro ao deletar transação' }
    }
  }

  // Funções de gerenciamento de categorias
  const adicionarCategoria = async (categoria) => {
    try {
      const result = await categoriasService.criar(categoria)
      if (result.success) {
        setCategorias(prev => [...prev, result.data])
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error)
      return { success: false, error: 'Erro ao adicionar categoria' }
    }
  }

  const editarCategoria = async (id, categoria) => {
    try {
      const result = await categoriasService.atualizar(id, categoria)
      if (result.success) {
        setCategorias(prev => prev.map(c => c.id === id ? result.data : c))
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Erro ao editar categoria:', error)
      return { success: false, error: 'Erro ao editar categoria' }
    }
  }

  const deletarCategoria = async (id) => {
    try {
      const result = await categoriasService.deletar(id)
      if (result.success) {
        setCategorias(prev => prev.filter(c => c.id !== id))
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Erro ao deletar categoria:', error)
      return { success: false, error: 'Erro ao deletar categoria' }
    }
  }

  return (
    <FinanceContext.Provider
      value={{
        transacoes,
        categorias,
        resumo,
        loading,
        adicionarTransacao,
        editarTransacao,
        deletarTransacao,
        adicionarCategoria,
        editarCategoria,
        deletarCategoria,
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider")
  }
  return context
}
