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

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
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
              <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
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
                fill="hsl(var(--chart-1))"
                dataKey="value"
              >
                {priorityChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-2))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Network Graph Placeholder */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Seller Network Graph</CardTitle>
          <CardDescription>Cross-platform seller connections and relationships</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed">
            <div className="text-center text-muted-foreground space-y-2">
              <p className="font-medium">Network Visualization</p>
              <p className="text-sm">D3.js network graph showing seller-to-platform connections</p>
              <p className="text-xs">(Requires D3.js implementation with force-directed layout)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Geographic Map Placeholder */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Geographic Distribution</CardTitle>
          <CardDescription>Seller locations and artifact origins mapped globally</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed">
            <div className="text-center text-muted-foreground space-y-2">
              <p className="font-medium">Interactive Map</p>
              <p className="text-sm">Leaflet.js map displaying seller locations from case data</p>
              <p className="text-xs">(Requires Leaflet.js implementation with marker clustering)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
