import "./../../styles/Button.css"

export function Button({ children, variant = "primary", size = "default", className = "", ...props }) {
  const baseClass = "button"
  const variantClass = `button-${variant}`
  const sizeClass = size !== "default" ? `button-${size}` : ""

  const classes = [baseClass, variantClass, sizeClass, className].filter(Boolean).join(" ")

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
