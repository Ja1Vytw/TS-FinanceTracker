import { TrendingUp, TrendingDown, DollarSign, CreditCard, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { CustomPieChart } from "../components/charts/PieChart"
import { CustomBarChart } from "../components/charts/BarChart"
import { useFinance } from "../contexts/FinanceContext"
import "../styles/Dashboard.css"

export function Dashboard() {
  const { transacoes, resumo, categorias } = useFinance()

  // Buscar nome da categoria pelo ID
  const getCategoriaNome = (categoriaId) => {
    console.log('Buscando categoria com ID:', categoriaId)
    console.log('Categorias disponíveis:', categorias)
    
    // Se categoriaId for undefined ou null, pode ser uma transação antiga
    if (!categoriaId) {
      return 'Categoria não definida'
    }
    
    const categoria = categorias.find(cat => cat.id === categoriaId)
    console.log('Categoria encontrada:', categoria)
    return categoria ? categoria.nome : 'Categoria não encontrada'
  }

  // Dados para o gráfico de pizza (gastos por categoria)
  const gastosPorCategoria = transacoes
    .filter((t) => t.tipo === "DESPESA")
    .reduce((acc, transacao) => {
      // Verificar se é uma transação antiga (tem categoria) ou nova (tem categoriaId)
      const categoriaNome = transacao.categoriaId ? 
        getCategoriaNome(transacao.categoriaId) : 
        (transacao.categoria || 'Categoria não definida')
      
      acc[categoriaNome] = (acc[categoriaNome] || 0) + transacao.valor
      return acc
    }, {})

  const pieChartData = Object.entries(gastosPorCategoria).map(([categoria, valor], index) => ({
    name: categoria,
    value: valor,
    color: ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#F97316", "#06B6D4", "#84CC16"][index % 8],
  }))

  // Dados para o gráfico de barras (últimos 6 meses)
  const hoje = new Date()
  const barChartData = Array.from({ length: 6 }, (_, i) => {
    const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)
    const mes = data.toLocaleDateString("pt-BR", { month: "short" })
    const ano = data.getFullYear()
    const mesAno = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}`

    const transacoesMes = transacoes.filter((t) => t.data.startsWith(mesAno))
    const receitas = transacoesMes.filter((t) => t.tipo === "RECEITA").reduce((acc, t) => acc + t.valor, 0)
    const despesas = transacoesMes.filter((t) => t.tipo === "DESPESA").reduce((acc, t) => acc + t.valor, 0)

    return {
      name: `${mes}/${ano}`,
      receitas,
      despesas,
    }
  }).reverse()

  // Últimas 5 transações
  const ultimasTransacoes = transacoes
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .slice(0, 5)

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="dashboard">
      {/* Cabeçalho do dashboard */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Visão geral das suas finanças</p>
      </div>

      {/* Cards de resumo financeiro */}
      <div className="summary-cards">
        <div className="summary-card card-gradient-primary">
          <div className="summary-card-header">
            <h3 className="summary-card-title">Saldo Atual</h3>
            <DollarSign size={16} className="summary-card-icon" />
          </div>
          <div className="summary-card-value">{formatCurrency(resumo.saldo)}</div>
          <p className="summary-card-description">{resumo.saldo >= 0 ? "Saldo positivo" : "Saldo negativo"}</p>
        </div>

        <div className="summary-card card-gradient-secondary">
          <div className="summary-card-header">
            <h3 className="summary-card-title">Receitas do Mês</h3>
            <TrendingUp size={16} className="summary-card-icon" />
          </div>
          <div className="summary-card-value">{formatCurrency(resumo.receitas)}</div>
          <p className="summary-card-description">Total de entradas</p>
        </div>

        <div className="summary-card card-gradient-danger">
          <div className="summary-card-header">
            <h3 className="summary-card-title">Despesas do Mês</h3>
            <TrendingDown size={16} className="summary-card-icon" />
          </div>
          <div className="summary-card-value">{formatCurrency(resumo.despesas)}</div>
          <p className="summary-card-description">Total de saídas</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="charts-grid">
        {pieChartData.length > 0 && <CustomPieChart data={pieChartData} title="Gastos por Categoria" />}
        <CustomBarChart data={barChartData} title="Receitas vs Despesas (Últimos 6 Meses)" />
      </div>

      {/* Lista das últimas transações */}
      <div className="transactions-section">
        <div className="transactions-header">
          <h2 className="transactions-title">
            <CreditCard size={20} />
            Últimas Transações
          </h2>
        </div>
        <div className="transactions-list">
          {ultimasTransacoes.map((transacao) => (
            <div key={transacao.id} className="transaction-item">
              <div className="transaction-left">
                <div className={`transaction-icon ${transacao.tipo.toLowerCase()}`}>
                  {transacao.tipo === "RECEITA" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                </div>
                <div className="transaction-info">
                  <h4>{transacao.descricao}</h4>
                  <p>{transacao.categoriaId ? 
                    getCategoriaNome(transacao.categoriaId) : 
                    (transacao.categoria || 'Categoria não definida')}</p>
                </div>
              </div>
              <div className="transaction-right">
                <p className={`transaction-value ${transacao.tipo.toLowerCase()}`}>
                  {transacao.tipo === "RECEITA" ? "+" : "-"}
                  {formatCurrency(transacao.valor)}
                </p>
                <p className="transaction-date">
                  <Calendar size={12} />
                  {new Date(transacao.data).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          ))}
          {ultimasTransacoes.length === 0 && <p className="empty-state">Nenhuma transação encontrada</p>}
        </div>
      </div>
    </div>
  )
}
