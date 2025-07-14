"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Tag } from "lucide-react"
import { Button } from "../components/ui/Button"
import { CategoryModal } from "../components/modals/CategoryModal"
import { useFinance } from "../contexts/FinanceContext"
import { useToast } from "../components/ui/Toast"
import "../styles/CategoriesPage.css"

export function CategoriesPage() {
  const { categorias, deletarCategoria } = useFinance()
  const { showSuccess } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  const handleEdit = (category) => {
    setEditingCategory(category)
    setModalOpen(true)
  }

  const handleDelete = (category) => {
    if (window.confirm(`Tem certeza que deseja excluir a categoria "${category.nome}"?`)) {
      deletarCategoria(category.id)
      showSuccess("Categoria excluída com sucesso!")
    }
  }

  const handleAddNew = () => {
    setEditingCategory(null)
    setModalOpen(true)
  }

  // Separar categorias por tipo
  const categoriasReceitas = categorias.filter((cat) => cat.tipo === "RECEITA")
  const categoriasDespesas = categorias.filter((cat) => cat.tipo === "DESPESA")

  return (
    <div className="categories-page">
      {/* Cabeçalho da página */}
      <div className="categories-header">
        <div className="categories-title-section">
          <h1 className="categories-title">Categorias</h1>
          <p className="categories-subtitle">Organize suas transações por categoria</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus size={16} />
          Nova Categoria
        </Button>
      </div>

      <div className="categories-grid">
        {/* Seção de categorias de receita */}
        <div className="category-section">
          <div className="category-section-header">
            <h2 className="category-section-title receitas">
              <Tag size={20} />
              Receitas ({categoriasReceitas.length})
            </h2>
          </div>
          <div className="category-section-content">
            <div className="categories-list">
              {categoriasReceitas.map((categoria) => (
                <div key={categoria.id} className="category-card receitas">
                  <div className="category-left">
                    <div className="category-icon receitas">
                      <Tag size={16} />
                    </div>
                    <div className="category-info">
                      <h3 className="category-name">{categoria.nome}</h3>
                      <span className="category-badge receitas">Receita</span>
                    </div>
                  </div>

                  <div className="category-actions">
                    <button onClick={() => handleEdit(categoria)} className="action-button edit">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDelete(categoria)} className="action-button delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {categoriasReceitas.length === 0 && (
                <div className="category-empty">
                  <p>Nenhuma categoria de receita cadastrada</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Seção de categorias de despesa */}
        <div className="category-section">
          <div className="category-section-header">
            <h2 className="category-section-title despesas">
              <Tag size={20} />
              Despesas ({categoriasDespesas.length})
            </h2>
          </div>
          <div className="category-section-content">
            <div className="categories-list">
              {categoriasDespesas.map((categoria) => (
                <div key={categoria.id} className="category-card despesas">
                  <div className="category-left">
                    <div className="category-icon despesas">
                      <Tag size={16} />
                    </div>
                    <div className="category-info">
                      <h3 className="category-name">{categoria.nome}</h3>
                      <span className="category-badge despesas">Despesa</span>
                    </div>
                  </div>

                  <div className="category-actions">
                    <button onClick={() => handleEdit(categoria)} className="action-button edit">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDelete(categoria)} className="action-button delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {categoriasDespesas.length === 0 && (
                <div className="category-empty">
                  <p>Nenhuma categoria de despesa cadastrada</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de categoria */}
      <CategoryModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingCategory(null)
        }}
        category={editingCategory}
      />
    </div>
  )
}
