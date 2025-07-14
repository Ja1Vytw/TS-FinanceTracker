"use client"

import { useState, useEffect } from "react"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import { FinanceProvider } from "./contexts/FinanceContext"
import { ToastProvider } from "./components/ui/Toast"
import { LoginPage } from "./pages/LoginPage"
import { Dashboard } from "./pages/Dashboard"
import { TransactionsPage } from "./pages/TransactionsPage"
import { CategoriesPage } from "./pages/CategoriesPage"
import { DonationPage } from "./pages/DonationPage"
import { Header } from "./components/layout/Header"
import { Sidebar } from "./components/layout/Sidebar"
import { Tutorial } from "./components/Tutorial"
import { Button } from "./components/ui/Button"
import { HelpCircle } from "lucide-react"
import "./styles/globals.css"

// Componente principal da aplicação
function AppContent() {
  const { isAuthenticated, loading } = useAuth()
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)

  // Mostrar tutorial automaticamente para novos usuários
  useEffect(() => {
    if (isAuthenticated) {
      const hasSeenTutorial = localStorage.getItem("hasSeenTutorial")
      if (!hasSeenTutorial) {
        setShowTutorial(true)
      }
    }
  }, [isAuthenticated])

  const handleTutorialComplete = () => {
    localStorage.setItem("hasSeenTutorial", "true")
    setShowTutorial(false)
  }

  const handleTutorialClose = () => {
    setShowTutorial(false)
  }

  // Tela de carregamento
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: 'var(--background-light)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid var(--border)', 
            borderTop: '4px solid var(--primary)', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Carregando...</p>
        </div>
      </div>
    )
  }

  // Página de login se não autenticado
  if (!isAuthenticated) {
    return <LoginPage />
  }

  // Renderização das páginas
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "transacoes":
        return <TransactionsPage />
      case "categorias":
        return <CategoriesPage />
      case "doacao":
        return <DonationPage />
      default:
        return <Dashboard />
    }
  }

  return (
    <ToastProvider>
      <FinanceProvider>
        <div style={{ minHeight: "100vh", backgroundColor: "var(--background-light)" }}>
        {/* Cabeçalho */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div style={{ display: "flex" }}>
          {/* Sidebar de navegação */}
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />

          {/* Conteúdo principal */}
          <main style={{ flex: 1, marginLeft: "0" }} className="main-content">{renderPage()}</main>
        </div>

        {/* Botão flutuante para tutorial */}
        <Button
          onClick={() => setShowTutorial(true)}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            borderRadius: "50%",
            width: "3.5rem",
            height: "3.5rem",
            boxShadow: "var(--shadow-xl)",
            zIndex: 100,
          }}
          variant="primary"
          title="Abrir Tutorial"
        >
          <HelpCircle size={20} />
        </Button>

        {/* Modal do tutorial */}
        <Tutorial isOpen={showTutorial} onClose={handleTutorialClose} onComplete={handleTutorialComplete} />
      </div>
      </FinanceProvider>
    </ToastProvider>
  )
}

// Provider principal da aplicação
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
