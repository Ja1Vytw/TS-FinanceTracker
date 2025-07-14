"use client"
import { CreditCard, Home, Tags, X } from "lucide-react"
import { Button } from "../ui/Button"
import "../../styles/Sidebar.css"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "transacoes", label: "Transações", icon: CreditCard },
  { id: "categorias", label: "Categorias", icon: Tags },
]

export function Sidebar({ isOpen, onClose, currentPage, onPageChange }) {
  return (
    <>
      {/* Overlay para mobile */}
      <div className={`sidebar-overlay ${isOpen ? "open" : ""}`} onClick={onClose} />

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id} className="sidebar-menu-item">
                  <button
                    onClick={() => {
                      onPageChange(item.id)
                      onClose()
                    }}
                    className={`sidebar-menu-button ${currentPage === item.id ? "active" : ""}`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}
