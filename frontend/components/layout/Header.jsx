"use client"
import { LogOut, Menu, User } from "lucide-react"
import { Button } from "../ui/Button"
import { useAuth } from "../../contexts/AuthContext"
import "../../styles/Header.css"

export function Header({ onMenuClick }) {
  const { usuario, logout } = useAuth()

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="menu-button">
            <Menu size={20} />
          </Button>
          <h1 className="header-title">TS FinanceTracker</h1>
        </div>

        <div className="header-right">
          <div className="user-info">
            <User size={16} color="var(--text-secondary)" />
            <span className="user-name">{usuario?.nome}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={logout} className="logout-button">
            <LogOut size={16} />
          </Button>
        </div>
      </div>
    </header>
  )
}
