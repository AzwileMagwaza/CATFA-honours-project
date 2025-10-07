"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Eye } from "lucide-react"

export default function ReportPage() {
  const [cases, setCases] = useState<any[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("catfa_cases")
    if (stored) {
      setCases(JSON.parse(stored))
    }
  }, [])

  const generateReport = () => {
    // Calculate statistics
    const totalCases = cases.length
    const platforms = [...new Set(cases.map((c) => c.platform))]
    const highPriority = cases.filter((c) => c.priority_level === "high" || c.priority_level === "critical").length

    const platformDist = cases.reduce((acc: any, c) => {
      acc[c.platform] = (acc[c.platform] || 0) + 1
      return acc
    }, {})

    return {
      totalCases,
      platforms: platforms.length,
      highPriority,
      platformDist,
      generatedDate: new Date().toLocaleDateString(),
    }
  }

  const handleDownloadPDF = () => {
    alert(
      "PDF generation requires jsPDF library. This would generate a formatted research report with charts and insights.",
    )
  }

  const report = generateReport()

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Research Report Generation</h1>
        <p className="text-muted-foreground">Export comprehensive analytical reports for academic presentation</p>
      </div>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <Button className="gap-2">
              <Eye className="h-4 w-4" /> Preview Report
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4" /> Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-accent" />
            <div>
              <CardTitle>CATFA Research Report Preview</CardTitle>
              <CardDescription>Cultural Art Trafficking Forensic Analysis - Honours Project 2025</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Header */}
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold mb-2">Cultural Art Trafficking Forensic Analysis</h2>
            <p className="text-sm text-muted-foreground">OSINT and Social Network Analysis Investigative Framework</p>
            <p className="text-sm text-muted-foreground">Author: Azwile Magwaza | Generated: {report.generatedDate}</p>
          </div>

          {/* Executive Summary */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Executive Summary</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This report presents findings from the Cultural Art Trafficking Forensic Analysis (CATFA) project, which
              employs open-source intelligence (OSINT) techniques and social network analysis to investigate cultural
              artifact trafficking across digital marketplaces.
            </p>
          </div>

          {/* Key Findings */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Key Findings</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-accent">{report.totalCases}</div>
                  <p className="text-sm text-muted-foreground mt-1">Total Cases Analyzed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-accent">{report.platforms}</div>
                  <p className="text-sm text-muted-foreground mt-1">Platforms Monitored</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-accent">{report.highPriority}</div>
                  <p className="text-sm text-muted-foreground mt-1">High Priority Cases</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Platform Analysis */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Platform Distribution Analysis</h3>
            {Object.keys(report.platformDist).length > 0 ? (
              <ul className="space-y-2 text-sm">
                {Object.entries(report.platformDist)
                  .sort(([, a]: any, [, b]: any) => b - a)
                  .map(([platform, count]: any) => (
                    <li key={platform} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{platform}</span>
                      <span className="font-semibold">
                        {count} cases ({Math.round((count / report.totalCases) * 100)}%)
                      </span>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No data available for analysis.</p>
            )}
          </div>

          {/* Methodology */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Methodology</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The CATFA framework employs a 4-phase investigative approach: (1) Data Scoping to define search
              parameters, (2) Data Collection using OSINT tools, (3) Network Analysis to map seller relationships, and
              (4) Evaluation for risk prioritization and reporting.
            </p>
          </div>

          {/* Conclusions */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Conclusions</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This proof-of-concept demonstrates the viability of combining OSINT methodologies with social network
              analysis for cultural heritage protection. The framework provides law enforcement and heritage
              organizations with actionable intelligence for combating artifact trafficking in digital spaces.
            </p>
          </div>

          {/* Footer */}
          <div className="border-t pt-4 text-xs text-muted-foreground text-center">
            Cultural Art Trafficking Forensic Analysis (CATFA) – Honours Project © 2025 Azwile Magwaza
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
