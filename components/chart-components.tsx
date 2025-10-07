"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import dynamic from "next/dynamic"

const NetworkGraph = dynamic(() => import("@/components/network-graph"), {
  ssr: false,
})

const GeographicMap = dynamic(() => import("@/components/geographic-map"), {
  ssr: false,
})

const CHART_COLORS = [
  "#3b82f6", // Blue
  "#10b981", // Green
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#f97316", // Orange
]

interface ChartComponentsProps {
  platformData: Record<string, number>
  priorityData: Record<string, number>
  timeData: Record<string, number>
  cases: any[]
}

export default function ChartComponents({ platformData, priorityData, timeData, cases }: ChartComponentsProps) {
  const platformChartData = Object.entries(platformData).map(([name, value]) => ({ name, value }))
  const priorityChartData = Object.entries(priorityData).map(([name, value]) => ({ name, value }))
  const timeChartData = Object.entries(timeData).map(([name, value]) => ({ name, value }))

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Platform Distribution Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Cases by Platform</CardTitle>
          <CardDescription>Distribution of artifact listings across marketplaces</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformChartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {platformChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Priority Distribution Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Distribution</CardTitle>
          <CardDescription>Case prioritization breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priorityChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                dataKey="value"
              >
                {priorityChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cases Over Time Line Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Cases Over Time</CardTitle>
          <CardDescription>Temporal distribution of case entries</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeChartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: "#8b5cf6", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Network Graph */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Seller Network Graph</CardTitle>
          <CardDescription>Cross-platform seller connections and relationships</CardDescription>
        </CardHeader>
        <CardContent>
          <NetworkGraph cases={cases} />
        </CardContent>
      </Card>

      {/* Geographic Map */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Geographic Distribution</CardTitle>
          <CardDescription>Seller locations and artifact origins mapped globally</CardDescription>
        </CardHeader>
        <CardContent>
          <GeographicMap cases={cases} />
        </CardContent>
      </Card>
    </div>
  )
}
