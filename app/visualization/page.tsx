"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, AlertTriangle, Database, Globe, Download, NetworkIcon } from "lucide-react"
import dynamic from "next/dynamic"
import { MaltegoUploader } from "@/components/maltego-uploader"
import { useToast } from "@/hooks/use-toast"

// Dynamically import chart components to avoid SSR issues
const ChartComponents = dynamic(() => import("@/components/chart-components"), {
  ssr: false,
})

export default function VisualizationPage() {
  const [cases, setCases] = useState<any[]>([])
  const [filterPlatform, setFilterPlatform] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const { toast } = useToast()

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

  const handleSaveSnapshot = () => {
    const snapshot = {
      timestamp: new Date().toISOString(),
      cases: filteredCases,
      statistics: { totalCases, platforms, flaggedCases },
      filters: { platform: filterPlatform, priority: filterPriority },
    }

    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `catfa_network_snapshot_${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Snapshot saved",
      description: "Network data exported successfully",
    })
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Network Analysis and Visualization</h1>
        <p className="text-muted-foreground">
          Interactive network analysis and visual analytics for cultural artifact trafficking investigation
        </p>
      </div>

      <Card className="border-accent/50 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <NetworkIcon className="h-5 w-5 text-accent" />
            Network Analysis and Visualization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed">
          <p className="text-muted-foreground">
            With collected data organized, network analysis uncovers relationships between listings, actors, and
            platforms. Entities such as seller IDs, reused images, transaction artifacts, and email addresses are
            treated as nodes, while edges represent co-appearances, identical descriptions, or shared metadata.
          </p>
          <p className="text-muted-foreground">
            Tools like <strong>Maltego CE</strong> and <strong>Gephi</strong> are used to visualize network structure.
            Centrality and clustering metrics highlight likely distribution hubs or high-volume sellers. Networks are
            cleaned for noise (isolated nodes hidden, not deleted), and final outputs are saved as both visual diagrams
            and structured data for qualitative and quantitative analysis.
          </p>

          <div className="pt-2">
            <h4 className="font-semibold mb-2">Key Network Metrics Analyzed:</h4>
            <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
              <li>
                • <strong>Centrality:</strong> Identifying key actors and distribution hubs
              </li>
              <li>
                • <strong>Clustering:</strong> Detecting seller groups and networks
              </li>
              <li>
                • <strong>Reused Images:</strong> Tracking identical artifacts across platforms
              </li>
              <li>
                • <strong>Metadata Anomalies:</strong> Suspicious patterns in EXIF and descriptions
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

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
            <Button onClick={handleSaveSnapshot} className="ml-auto gap-2">
              <Download className="h-4 w-4" />
              Save network snapshot
            </Button>
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

      <Tabs defaultValue="uploaded" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="uploaded">Uploaded Graph View</TabsTrigger>
          <TabsTrigger value="interactive">Interactive Network Graph</TabsTrigger>
        </TabsList>

        <TabsContent value="uploaded" className="space-y-6">
          <MaltegoUploader />
        </TabsContent>

        <TabsContent value="interactive" className="space-y-6">
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
