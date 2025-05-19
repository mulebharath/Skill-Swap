"use client"

import { useTheme } from "next-themes"
import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data for user growth
const userGrowthData = [
  { name: "Jan", users: 120 },
  { name: "Feb", users: 180 },
  { name: "Mar", users: 250 },
  { name: "Apr", users: 310 },
  { name: "May", users: 400 },
  { name: "Jun", users: 480 },
  { name: "Jul", users: 550 },
]

// Mock data for skills distribution
const skillsData = [
  { name: "Programming", value: 35 },
  { name: "Languages", value: 25 },
  { name: "Arts", value: 15 },
  { name: "Music", value: 10 },
  { name: "Fitness", value: 8 },
  { name: "Other", value: 7 },
]

// Mock data for session activity
const sessionData = [
  { name: "Jan", teaching: 65, learning: 45 },
  { name: "Feb", teaching: 80, learning: 60 },
  { name: "Mar", teaching: 95, learning: 75 },
  { name: "Apr", teaching: 110, learning: 90 },
  { name: "May", teaching: 130, learning: 105 },
  { name: "Jun", teaching: 150, learning: 120 },
  { name: "Jul", teaching: 170, learning: 140 },
]

// Colors for pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

export function LineChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={userGrowthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
        <Line
          type="monotone"
          dataKey="users"
          name="New Users"
          stroke="hsl(var(--primary))"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export function PieChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={skillsData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {skillsData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f1f1f" : "#fff",
            border: `1px solid ${isDark ? "#333" : "#ddd"}`,
            borderRadius: "6px",
          }}
        />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}

export function BarChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={sessionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
        <Bar dataKey="teaching" name="Teaching Sessions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        <Bar dataKey="learning" name="Learning Sessions" fill="#6366f1" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
