"use client"

import { useState, useEffect } from "react"
import { Tag } from "lucide-react"
import { Modal } from "../ui/Modal"
import { Input, Select } from "../ui/Input"
import { Button } from "../ui/Button"
import { useFinance } from "../../contexts/FinanceContext"
import { useToast } from "../ui/Toast"

export function CategoryModal({ isOpen, onClose, category = null }) {
  const { adicionarCategoria, editarCategoria } = useFinance()
  const { showSuccess, showError } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    tipo: "DESPESA",
    icone: "tag",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (category) {
      setFormData({
        nome: category.nome,
        tipo: category.tipo,
        icone: category.icone,
      })
    } else {
      setFormData({
        nome: "",
        tipo: "DESPESA",
        icone: "tag",
      })
    }
    setErrors({})
  }, [category, isOpen])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const categoryData = {
        nome: formData.nome.trim(),
        tipo: formData.tipo,
        icone: formData.icone,
      }

      if (category) {
        editarCategoria(category.id, categoryData)
        showSuccess("Categoria atualizada com sucesso!")
      } else {
        adicionarCategoria(categoryData)
        showSuccess("Categoria criada com sucesso!")
      }

      onClose()
    } catch (error) {
      showError("Erro ao salvar categoria. Tente novamente.")
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

  const footer = (
    <>
      <Button variant="outline" onClick={onClose} disabled={loading}>
        Cancelar
      </Button>
      <Button type="submit" form="category-form" disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </Button>
    </>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={category ? "Editar Categoria" : "Nova Categoria"} footer={footer}>
      <form id="category-form" onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label className="form-label">Nome da Categoria</label>
          <div className="form-input-group">
            <Tag className="form-input-icon" />
            <Input
              type="text"
              placeholder="Ex: Alimentação, Transporte..."
              value={formData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
              className="form-input-with-icon"
              error={errors.nome}
            />
          </div>
          {errors.nome && <p className="form-error">{errors.nome}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Tipo</label>
          <Select value={formData.tipo} onChange={(e) => handleInputChange("tipo", e.target.value)}>
            <option value="RECEITA">Receita</option>
            <option value="DESPESA">Despesa</option>
          </Select>
        </div>
      </form>
    </Modal>
  )
}
