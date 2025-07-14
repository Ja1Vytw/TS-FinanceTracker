"use client"

import { useState } from "react"
import {
  Wallet,
  BarChart3,
  CreditCard,
  Tags,
  TrendingUp,
  Shield,
  Smartphone,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"
import { Stepper } from "./ui/Stepper"
import { AnimatedList, AnimatedListItem } from "./ui/AnimatedList"
import "../styles/Tutorial.css"

const tutorialSteps = [
  {
    id: 1,
    title: "Bem-vindo",
    icon: Wallet,
    content: {
      title: "Bem-vindo ao TS FinanceTracker!",
      description:
        "Seu assistente pessoal para controle financeiro. Vamos te mostrar como usar todas as funcionalidades da plataforma.",
      features: [
        {
          icon: BarChart3,
          title: "Dashboard Inteligente",
          description: "Visualize suas finanças com gráficos interativos",
        },
        {
          icon: CreditCard,
          title: "Controle de Transações",
          description: "Gerencie receitas e despesas facilmente",
        },
        {
          icon: Tags,
          title: "Categorização",
          description: "Organize seus gastos por categorias personalizadas",
        },
      ],
    },
  },
  {
    id: 2,
    title: "Dashboard",
    icon: BarChart3,
    content: {
      title: "Seu Dashboard Financeiro",
      description:
        "O dashboard é o coração do sistema. Aqui você encontra um resumo completo das suas finanças com gráficos interativos e informações em tempo real.",
      features: [
        {
          icon: TrendingUp,
          title: "Resumo Financeiro",
          description: "Cards com saldo atual, receitas e despesas do mês",
        },
        {
          icon: BarChart3,
          title: "Gráficos Interativos",
          description: "Visualize gastos por categoria e evolução mensal",
        },
      ],
    },
  },
  {
    id: 3,
    title: "Transações",
    icon: CreditCard,
    content: {
      title: "Gerencie suas Transações",
      description:
        "Adicione, edite e organize todas as suas receitas e despesas. Use filtros avançados para encontrar transações específicas.",
      features: [
        {
          icon: CreditCard,
          title: "CRUD Completo",
          description: "Criar, editar, visualizar e deletar transações",
        },
        {
          icon: Shield,
          title: "Filtros Avançados",
          description: "Busque por descrição, categoria ou tipo",
        },
      ],
    },
  },
  {
    id: 4,
    title: "Categorias",
    icon: Tags,
    content: {
      title: "Organize por Categorias",
      description: "Crie e gerencie categorias personalizadas para organizar melhor seus gastos e receitas.",
      features: [
        {
          icon: Tags,
          title: "Categorias Personalizadas",
          description: "Crie categorias que fazem sentido para você",
        },
        {
          icon: Smartphone,
          title: "Interface Intuitiva",
          description: "Design responsivo que funciona em qualquer dispositivo",
        },
      ],
    },
  },
]

const notifications = [
  {
    icon: "💰",
    title: "Nova transação adicionada",
    time: "Agora mesmo",
    type: "success",
  },
  {
    icon: "📊",
    title: "Relatório mensal gerado",
    time: "2 min atrás",
    type: "info",
  },
  {
    icon: "🎯",
    title: "Meta de economia atingida",
    time: "5 min atrás",
    type: "success",
  },
  {
    icon: "⚠️",
    title: "Orçamento quase esgotado",
    time: "10 min atrás",
    type: "warning",
  },
  {
    icon: "💳",
    title: "Pagamento processado",
    time: "15 min atrás",
    type: "success",
  },
]

export function Tutorial({ isOpen, onClose, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showNotifications, setShowNotifications] = useState(false)

  if (!isOpen) return null

  const current = tutorialSteps.find((step) => step.id === currentStep)
  const isLastStep = currentStep === tutorialSteps.length

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
    } else {
      setCurrentStep((prev) => prev + 1)
      if (currentStep === 2) {
        setShowNotifications(true)
      }
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSkip = () => {
    onClose()
  }

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-modal">
        <div className="tutorial-header">
          <h1 className="tutorial-title">Tutorial Interativo</h1>
          <p className="tutorial-subtitle">Aprenda a usar o TS FinanceTracker em poucos minutos</p>

          <Stepper
            steps={tutorialSteps.map((step) => ({ id: step.id, title: step.title }))}
            currentStep={currentStep}
          />
        </div>

        <div className="tutorial-content">
          <div className="tutorial-step">
            <div className="tutorial-step-icon">
              <current.icon size={32} />
            </div>

            <h2 className="tutorial-step-title">{current.content.title}</h2>
            <p className="tutorial-step-description">{current.content.description}</p>

            <div className="tutorial-features">
              {current.content.features.map((feature, index) => (
                <div key={index} className="tutorial-feature">
                  <div className="tutorial-feature-icon">
                    <feature.icon size={16} />
                  </div>
                  <div className="tutorial-feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mostrar notificações animadas no step 2 */}
            {showNotifications && currentStep === 2 && (
              <div style={{ marginTop: "2rem" }}>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    color: "var(--text-primary)",
                  }}
                >
                  Exemplo de Notificações em Tempo Real:
                </h3>
                <AnimatedList>
                  {notifications.map((notification, index) => (
                    <AnimatedListItem
                      key={index}
                      icon={notification.icon}
                      title={notification.title}
                      time={notification.time}
                      type={notification.type}
                    />
                  ))}
                </AnimatedList>
              </div>
            )}
          </div>
        </div>

        <div className="tutorial-footer">
          <button onClick={handleSkip} className="tutorial-button tutorial-button-secondary">
            Pular Tutorial
          </button>

          {currentStep > 1 && (
            <button onClick={handlePrev} className="tutorial-button tutorial-button-secondary">
              <ArrowLeft size={16} />
              Anterior
            </button>
          )}

          <button onClick={handleNext} className="tutorial-button tutorial-button-primary">
            {isLastStep ? "Finalizar" : "Próximo"}
            {!isLastStep && <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}
