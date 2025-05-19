"use client"

import { useTheme } from "next-themes"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    teaching: 2,
    learning: 1,
  },
  {
    name: "Feb",
    teaching: 3,
    learning: 2,
  },
  {
    name: "Mar",
    teaching: 4,
    learning: 3,
  },
  {
    name: "Apr",
    teaching: 3,
    learning: 5,
  },
  {
    name: "May",
    teaching: 5,
    learning: 4,
  },
  {
    name: "Jun",
    teaching: 6,
    learning: 3,
  },
]

export function SkillMatchChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333" : "#eee"} />
        <XAxis dataKey="name" stroke={isDark ? "#888" : "#666"} />
        <YAxis stroke={isDark ? "#888" : "#666"} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f1f1f" : "#fff",
            border: `1px solid ${isDark ? "#333" : "#ddd"}`,
            borderRadius: "6px",
          }}
        />
        <Legend />
        <Bar dataKey="teaching" name="Teaching Hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="learning" name="Learning Hours" fill="#6366f1" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
