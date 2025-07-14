"use client"

import { useState, useMemo } from "react"
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Download,
} from "lucide-react"
import { Input, Select } from "../components/ui/Input"
import { Button } from "../components/ui/Button"
import { Pagination } from "../components/ui/Pagination"
import { TransactionModal } from "../components/modals/TransactionModal"
import { useFinance } from "../contexts/FinanceContext"
import { useToast } from "../components/ui/Toast"
import "../styles/TransactionsPage.css"

export function TransactionsPage() {
  const { transacoes, categorias, deletarTransacao } = useFinance()
  
  // Buscar nome da categoria pelo ID
  const getCategoriaNome = (categoriaId) => {
    const categoria = categorias.find(cat => cat.id === categoriaId)
    return categoria ? categoria.nome : 'Categoria não encontrada'
  }
  const { showSuccess, showWarning } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    busca: "",
    categoria: "",
    tipo: "",
    periodo: "todos",
  })

  const itemsPerPage = 10

  // Filtrar transações baseado nos filtros aplicados
  const filteredTransactions = useMemo(() => {
    return transacoes.filter((transacao) => {
      // Filtro de busca
      const matchBusca = transacao.descricao.toLowerCase().includes(filters.busca.toLowerCase())

      // Filtro de categoria
      const categoriaNome = transacao.categoriaId ? 
        getCategoriaNome(transacao.categoriaId) : 
        (transacao.categoria || 'Categoria não definida')
      const matchCategoria = !filters.categoria || categoriaNome === filters.categoria

      // Filtro de tipo
      const matchTipo = !filters.tipo || transacao.tipo === filters.tipo

      // Filtro de período
      let matchPeriodo = true
      if (filters.periodo !== "todos") {
        const hoje = new Date()
        const dataTransacao = new Date(transacao.data)

        switch (filters.periodo) {
          case "7dias":
            matchPeriodo = (hoje - dataTransacao) / (1000 * 60 * 60 * 24) <= 7
            break
          case "30dias":
            matchPeriodo = (hoje - dataTransacao) / (1000 * 60 * 60 * 24) <= 30
            break
          case "mesAtual":
            matchPeriodo =
              dataTransacao.getMonth() === hoje.getMonth() && dataTransacao.getFullYear() === hoje.getFullYear()
            break
          default:
            matchPeriodo = true
        }
      }

      return matchBusca && matchCategoria && matchTipo && matchPeriodo
    })
  }, [transacoes, filters])

  // Ordenar por data (mais recente primeiro)
  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => new Date(b.data) - new Date(a.data))
  }, [filteredTransactions])

  // Paginação
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)
  const paginatedTransactions = sortedTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setModalOpen(true)
  }

  const handleDelete = (transaction) => {
    if (window.confirm(`Tem certeza que deseja excluir a transação "${transaction.descricao}"?`)) {
      deletarTransacao(transaction.id)
      showSuccess("Transação excluída com sucesso!")
    }
  }

  const handleAddNew = () => {
    setEditingTransaction(null)
    setModalOpen(true)
  }

  const clearFilters = () => {
    setFilters({
      busca: "",
      categoria: "",
      tipo: "",
      periodo: "todos",
    })
    setCurrentPage(1)
  }

  // Exportar transações para CSV
  const exportToCSV = () => {
    const headers = ["Data", "Descrição", "Categoria", "Tipo", "Valor"]
    const csvData = [
      headers.join(","),
      ...sortedTransactions.map((t) =>
        [t.data, `"${t.descricao}"`, `"${t.categoriaId ? getCategoriaNome(t.categoriaId) : (t.categoria || 'Categoria não definida')}"`, t.tipo, t.valor.toString().replace(".", ",")].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `transacoes_${new Date().toISOString().split("T")[0]}.csv`
    link.click()

    showSuccess("Relatório exportado com sucesso!")
  }

  return (
    <div className="transactions-page">
      {/* Cabeçalho da página */}
      <div className="transactions-header">
        <div className="transactions-title-section">
          <div>
            <h1 className="transactions-title">Transações</h1>
            <p className="transactions-subtitle">Gerencie suas receitas e despesas</p>
          </div>
          <button onClick={handleAddNew} className="add-transaction-btn">
            <Plus size={20} />
            Nova Transação
          </button>
        </div>

        {/* Filtros de busca */}
        <div className="filters-card">
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Buscar</label>
              <div style={{ position: "relative" }}>
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-secondary)",
                  }}
                />
                <Input
                  type="text"
                  placeholder="Buscar por descrição..."
                  value={filters.busca}
                  onChange={(e) => setFilters((prev) => ({ ...prev, busca: e.target.value }))}
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Período</label>
              <Select
                value={filters.periodo}
                onChange={(e) => setFilters((prev) => ({ ...prev, periodo: e.target.value }))}
              >
                <option value="todos">Todos</option>
                <option value="7dias">Últimos 7 dias</option>
                <option value="30dias">Últimos 30 dias</option>
                <option value="mesAtual">Mês atual</option>
              </Select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Categoria</label>
              <Select
                value={filters.categoria}
                onChange={(e) => setFilters((prev) => ({ ...prev, categoria: e.target.value }))}
              >
                <option value="">Todas</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.nome}>
                    {categoria.nome}
                  </option>
                ))}
              </Select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Tipo</label>
              <Select value={filters.tipo} onChange={(e) => setFilters((prev) => ({ ...prev, tipo: e.target.value }))}>
                <option value="">Todos</option>
                <option value="RECEITA">Receitas</option>
                <option value="DESPESA">Despesas</option>
              </Select>
            </div>
          </div>

          <div className="filters-actions">
            <Button variant="outline" onClick={clearFilters}>
              <Filter size={16} />
              Limpar Filtros
            </Button>
            <button onClick={exportToCSV} className="export-button">
              <Download size={16} />
              Exportar CSV
            </button>
          </div>
        </div>
      </div>

      {/* Lista de transações */}
      {paginatedTransactions.length > 0 ? (
        <>
          <div className="transactions-list">
            {paginatedTransactions.map((transacao) => (
              <div key={transacao.id} className="transaction-card">
                <div className="transaction-card-content">
                  <div className="transaction-left">
                    <div className={`transaction-icon ${transacao.tipo.toLowerCase()}`}>
                      {transacao.tipo === "RECEITA" ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                    </div>

                    <div className="transaction-info">
                      <h3 className="transaction-description">{transacao.descricao}</h3>
                      <p className="transaction-category">{transacao.categoriaId ? 
                        getCategoriaNome(transacao.categoriaId) : 
                        (transacao.categoria || 'Categoria não definida')}</p>
                      <p className="transaction-date">
                        <Calendar size={12} />
                        {formatDate(transacao.data)}
                      </p>
                    </div>
                  </div>

                  <div className="transaction-right">
                    <div className="transaction-value">
                      <p className={`transaction-amount ${transacao.tipo.toLowerCase()}`}>
                        {transacao.tipo === "RECEITA" ? "+" : "-"}
                        {formatCurrency(transacao.valor)}
                      </p>
                      <p className="transaction-type">{transacao.tipo}</p>
                    </div>

                    <div className="transaction-actions">
                      <button onClick={() => handleEdit(transacao)} className="action-button edit">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDelete(transacao)} className="action-button delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginação */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={sortedTransactions.length}
            itemsPerPage={itemsPerPage}
          />
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <CreditCard size={32} />
          </div>
          <h3 className="empty-state-title">Nenhuma transação encontrada</h3>
          <p className="empty-state-description">
            {Object.values(filters).some((filter) => filter && filter !== "todos")
              ? "Tente ajustar os filtros para encontrar suas transações."
              : "Comece adicionando sua primeira transação."}
          </p>
          <Button onClick={handleAddNew}>
            <Plus size={16} />
            Adicionar Transação
          </Button>
        </div>
      )}

      {/* Botão flutuante para adicionar */}
      <button onClick={handleAddNew} className="floating-add-btn" title="Adicionar Transação">
        <Plus size={24} />
      </button>

      {/* Modal de transação */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingTransaction(null)
        }}
        transaction={editingTransaction}
      />
    </div>
  )
}
