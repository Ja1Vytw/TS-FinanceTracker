import "./../../styles/Input.css"

export function Input({ className = "", error, ...props }) {
  const classes = ["input", error ? "input-error" : "", className].filter(Boolean).join(" ")

  return <input className={classes} {...props} />
}

export function Select({ children, className = "", ...props }) {
  const classes = ["select", className].filter(Boolean).join(" ")

  return (
    <select className={classes} {...props}>
      {children}
    </select>
  )
}
