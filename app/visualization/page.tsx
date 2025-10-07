"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, AlertTriangle, Database, Globe } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import chart components to avoid SSR issues
const ChartComponents = dynamic(() => import("@/components/chart-components"), {
  ssr: false,
})

export default function VisualizationPage() {
  const [cases, setCases] = useState<any[]>([])
  const [filterPlatform, setFilterPlatform] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  useEffect(() => {
    const stored = localStorage.getItem("catfa_cases")
    if (stored) {
      setCases(JSON.parse(stored))
    }
  }, [])

  const filteredCases = cases.filter((c) => {
    const matchesPlatform = filterPlatform === "all" || c.platform === filterPlatform
    const matchesPriority = filterPriority === "all" || c.priority === filterPriority
    return matchesPlatform && matchesPriority
  })

  // Calculate statistics
  const totalCases = filteredCases.length
  const platforms = [...new Set(filteredCases.map((c) => c.platform))].length
  const flaggedCases = filteredCases.filter((c) => c.priority === "high" || c.priority === "critical").length

  // Platform distribution
  const platformData = filteredCases.reduce((acc: any, c) => {
    acc[c.platform] = (acc[c.platform] || 0) + 1
    return acc
  }, {})

  // Priority distribution
  const priorityData = filteredCases.reduce((acc: any, c) => {
    acc[c.priority] = (acc[c.priority] || 0) + 1
    return acc
  }, {})

  // Cases over time
  const timeData = filteredCases.reduce((acc: any, c) => {
    const date = c.date_posted || c.timestamp
    const month = new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short" })
    acc[month] = (acc[month] || 0) + 1
    return acc
  }, {})

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Data Visualization Dashboard</h1>
        <p className="text-muted-foreground">
          Interactive analytics and insights from cultural artifact case data with OSINT enrichment
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-medium">Filters:</span>
            <Select value={filterPlatform} onValueChange={setFilterPlatform}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="Etsy">Etsy</SelectItem>
                <SelectItem value="eBay">eBay</SelectItem>
                <SelectItem value="Facebook Marketplace">Facebook Marketplace</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCases}</div>
            <p className="text-xs text-muted-foreground mt-1">Artifact listings tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platforms Monitored</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{platforms}</div>
            <p className="text-xs text-muted-foreground mt-1">Unique marketplaces</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{flaggedCases}</div>
            <p className="text-xs text-muted-foreground mt-1">Requiring immediate attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytical Summary */}
      <Card className="border-accent/50 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Analytical Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-relaxed">
          {totalCases === 0 ? (
            <p className="text-muted-foreground">
              No data available. Add cases in the Data Collection page to see analytical insights.
            </p>
          ) : (
            <>
              <p>
                <strong>Dataset Overview:</strong> Currently tracking {totalCases} cultural artifact listings across{" "}
                {platforms} different platforms.
              </p>
              {Object.keys(platformData).length > 0 && (
                <p>
                  <strong>Platform Distribution:</strong>{" "}
                  {Object.entries(platformData)
                    .sort(([, a]: any, [, b]: any) => b - a)
                    .map(
                      ([platform, count]: any) =>
                        `${platform} (${count} cases, ${Math.round((count / totalCases) * 100)}%)`,
                    )
                    .join(", ")}
                  .
                </p>
              )}
              <p>
                <strong>Risk Assessment:</strong> {flaggedCases} cases ({Math.round((flaggedCases / totalCases) * 100)}
                %) are flagged as high priority or critical, requiring immediate investigative attention.
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Charts */}
      {totalCases > 0 ? (
        <ChartComponents
          platformData={platformData}
          priorityData={priorityData}
          timeData={timeData}
          cases={filteredCases}
        />
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No visualization data available.</p>
            <p className="text-sm mt-2">Add cases in the Data Collection page to see charts and analytics.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
