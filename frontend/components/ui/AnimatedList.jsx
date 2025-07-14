import "../../styles/AnimatedList.css"

export function AnimatedList({ children, className = "" }) {
  return <div className={`animated-list ${className}`}>{children}</div>
}

export function AnimatedListItem({ icon, title, time, type = "info", className = "" }) {
  return (
    <div className={`animated-list-item ${className}`}>
      <div className={`notification-icon ${type}`}>{icon}</div>
      <div className="notification-content">
        <p className="notification-title">{title}</p>
        <p className="notification-time">{time}</p>
      </div>
    </div>
  )
}
