"use client"

import { useState, createContext, useContext } from "react"
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react"
import { Button } from "./Button"
import "../../styles/Toast.css"

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = (toast) => {
    const id = Date.now()
    const newToast = { id, ...toast }
    setToasts((prev) => [...prev, newToast])

    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const showSuccess = (message, title = "Sucesso") => {
    addToast({ type: "success", title, message })
  }

  const showError = (message, title = "Erro") => {
    addToast({ type: "error", title, message })
  }

  const showWarning = (message, title = "Atenção") => {
    addToast({ type: "warning", title, message })
  }

  const showInfo = (message, title = "Informação") => {
    addToast({ type: "info", title, message })
  }

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showWarning, showInfo }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

function ToastContainer({ toasts, onRemove }) {
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle size={16} />
      case "error":
        return <XCircle size={16} />
      case "warning":
        return <AlertTriangle size={16} />
      case "info":
        return <Info size={16} />
      default:
        return <Info size={16} />
    }
  }

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <div className="toast-icon">{getIcon(toast.type)}</div>
          <div className="toast-content">
            <p className="toast-title">{toast.title}</p>
            <p className="toast-message">{toast.message}</p>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={() => onRemove(toast.id)} className="toast-close">
            <X size={14} />
          </Button>
          <div className="toast-progress" />
        </div>
      ))}
    </div>
  )
}
