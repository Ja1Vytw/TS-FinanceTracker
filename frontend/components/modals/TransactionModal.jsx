"use client"

import { useState, useEffect } from "react"
import { Calendar, DollarSign, FileText, Tag } from "lucide-react"
import { Modal } from "../ui/Modal"
import { Input, Select } from "../ui/Input"
import { Button } from "../ui/Button"
import { useFinance } from "../../contexts/FinanceContext"
import { useToast } from "../ui/Toast"
import "../../styles/TransactionModal.css"

export function TransactionModal({ isOpen, onClose, transaction = null }) {
  const { categorias, adicionarTransacao, editarTransacao } = useFinance()
  const { showSuccess, showError } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    descricao: "",
    valor: "",
    categoria: "",
    data: "",
    tipo: "DESPESA",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (transaction) {
      setFormData({
        descricao: transaction.descricao,
        valor: transaction.valor.toString(),
        categoria: transaction.categoria,
        data: transaction.data,
        tipo: transaction.tipo,
      })
    } else {
      setFormData({
        descricao: "",
        valor: "",
        categoria: "",
        data: new Date().toISOString().split("T")[0],
        tipo: "DESPESA",
      })
    }
    setErrors({})
  }, [transaction, isOpen])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.descricao.trim()) {
      newErrors.descricao = "Descrição é obrigatória"
    }

    if (!formData.valor.trim()) {
      newErrors.valor = "Valor é obrigatório"
    } else if (isNaN(Number(formData.valor)) || Number(formData.valor) <= 0) {
      newErrors.valor = "Valor deve ser um número positivo"
    }

    if (!formData.categoria) {
      newErrors.categoria = "Categoria é obrigatória"
    }

    if (!formData.data) {
      newErrors.data = "Data é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const transactionData = {
        descricao: formData.descricao.trim(),
        valor: Number(formData.valor),
        categoria: formData.categoria,
        data: formData.data,
        tipo: formData.tipo,
      }

      if (transaction) {
        editarTransacao(transaction.id, transactionData)
        showSuccess("Transação atualizada com sucesso!")
      } else {
        adicionarTransacao(transactionData)
        showSuccess("Transação adicionada com sucesso!")
      }

      onClose()
    } catch (error) {
      showError("Erro ao salvar transação. Tente novamente.")
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

  const categoriasDisponiveis = categorias.filter((cat) => cat.tipo === formData.tipo)

  const footer = (
    <>
      <Button variant="outline" onClick={onClose} disabled={loading}>
        Cancelar
      </Button>
      <Button type="submit" form="transaction-form" disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </Button>
    </>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={transaction ? "Editar Transação" : "Nova Transação"}
      footer={footer}
    >
      <div style={{ position: "relative" }}>
        <form id="transaction-form" onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label className="form-label">Descrição</label>
            <div className="form-input-group">
              <FileText className="form-input-icon" />
              <Input
                type="text"
                placeholder="Ex: Supermercado, Salário..."
                value={formData.descricao}
                onChange={(e) => handleInputChange("descricao", e.target.value)}
                className="form-input-with-icon"
                error={errors.descricao}
              />
            </div>
            {errors.descricao && <p className="form-error">{errors.descricao}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Valor</label>
            <div className="form-input-group">
              <DollarSign className="form-input-icon" />
              <Input
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.valor}
                onChange={(e) => handleInputChange("valor", e.target.value)}
                className="form-input-with-icon"
                error={errors.valor}
              />
            </div>
            {errors.valor && <p className="form-error">{errors.valor}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Tipo</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="tipo"
                  value="RECEITA"
                  checked={formData.tipo === "RECEITA"}
                  onChange={(e) => {
                    handleInputChange("tipo", e.target.value)
                    setFormData((prev) => ({ ...prev, categoria: "" }))
                  }}
                  className="radio-input"
                />
                <span className="radio-label">Receita</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="tipo"
                  value="DESPESA"
                  checked={formData.tipo === "DESPESA"}
                  onChange={(e) => {
                    handleInputChange("tipo", e.target.value)
                    setFormData((prev) => ({ ...prev, categoria: "" }))
                  }}
                  className="radio-input"
                />
                <span className="radio-label">Despesa</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Categoria</label>
            <div className="form-input-group">
              <Tag className="form-input-icon" />
              <Select
                value={formData.categoria}
                onChange={(e) => handleInputChange("categoria", e.target.value)}
                className="form-input-with-icon"
                error={errors.categoria}
              >
                <option value="">Selecione uma categoria</option>
                {categoriasDisponiveis.map((categoria) => (
                  <option key={categoria.id} value={categoria.nome}>
                    {categoria.nome}
                  </option>
                ))}
              </Select>
            </div>
            {errors.categoria && <p className="form-error">{errors.categoria}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Data</label>
            <div className="form-input-group">
              <Calendar className="form-input-icon" />
              <Input
                type="date"
                value={formData.data}
                onChange={(e) => handleInputChange("data", e.target.value)}
                className="form-input-with-icon"
                error={errors.data}
              />
            </div>
            {errors.data && <p className="form-error">{errors.data}</p>}
          </div>
        </form>

        {loading && (
          <div className="loading-overlay">
            <div className="spinner" />
          </div>
        )}
      </div>
    </Modal>
  )
}
