import { Check } from "lucide-react"
import "../../styles/Stepper.css"

export function Stepper({ steps, currentStep }) {
  return (
    <div className="stepper">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isCurrent = stepNumber === currentStep
        const isPending = stepNumber > currentStep

        return (
          <div
            key={step.id}
            className={`stepper-step ${isCompleted ? "completed" : isCurrent ? "current" : "pending"}`}
          >
            <div className={`stepper-circle ${isCompleted ? "completed" : isCurrent ? "current" : "pending"}`}>
              {isCompleted ? <Check size={16} /> : stepNumber}
            </div>
            <div className="stepper-label">{step.title}</div>
          </div>
        )
      })}
    </div>
  )
}
