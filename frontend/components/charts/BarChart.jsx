import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import "../../styles/Charts.css"

export function CustomBarChart({ data, title }) {
  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `R$ ${value}`} />
            <Tooltip
              formatter={(value, name) => [`R$ ${value.toFixed(2)}`, name === "receitas" ? "Receitas" : "Despesas"]}
            />
            <Legend />
            <Bar dataKey="receitas" fill="#10B981" name="Receitas" />
            <Bar dataKey="despesas" fill="#EF4444" name="Despesas" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
