"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, AlertCircle, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TestingEvaluationPage() {
  const [cases, setCases] = useState<any[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const stored = localStorage.getItem("catfa_cases")
    if (stored) {
      setCases(JSON.parse(stored))
    }
  }, [])

  const handleDownloadPDF = () => {
    toast({
      title: "jsPDF Required",
      description:
        "PDF generation requires the jsPDF library. Use jsPDF/html2canvas to render charts and text into a formatted research report. Include jsPDF from CDN or npm to enable this feature.",
      duration: 6000,
    })
  }

  const totalCases = cases.length
  const platforms = [...new Set(cases.map((c) => c.platform))].length
  const highPriority = cases.filter((c) => c.priority_level === "high" || c.priority_level === "critical").length

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Testing and Evaluation</h1>
        <p className="text-muted-foreground">
          Systematic testing workflow and success metrics for OSINT-based artifact investigation
        </p>
      </div>

      <Card className="border-accent/50 bg-accent/5">
        <CardHeader>
          <CardTitle>Testing and Evaluation Overview</CardTitle>
          <CardDescription>Validating the CATFA investigative framework</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p className="text-muted-foreground">
            Testing ensures that the CATFA framework produces reliable, reproducible results. Each phase is evaluated
            for accuracy, completeness, and ethical compliance. The testing process validates data collection methods,
            network analysis outputs, and the overall investigative workflow.
          </p>
        </CardContent>
      </Card>

      {/* Step-by-step test workflow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            Step-by-Step Testing Workflow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4 list-decimal list-inside">
            <li className="font-semibold text-foreground">
              Start with a listing
              <p className="text-sm text-muted-foreground font-normal mt-1 ml-6">
                Select a suspicious artifact listing from a target platform (e.g., Etsy, eBay, Facebook Marketplace).
                Document the URL, timestamp, and initial observations.
              </p>
            </li>
            <li className="font-semibold text-foreground">
              Preserve evidence
              <p className="text-sm text-muted-foreground font-normal mt-1 ml-6">
                Capture screenshots, archive the page using Wayback Machine or Archive.today, and download images with
                metadata intact. Ensure chain of custody for potential legal use.
              </p>
            </li>
            <li className="font-semibold text-foreground">
              Analyze and map
              <p className="text-sm text-muted-foreground font-normal mt-1 ml-6">
                Extract EXIF data, perform reverse image searches, analyze text with Voyant Tools, and map seller
                profiles using WhatsMyName and OSINTCombine. Build network graphs in Maltego or Gephi.
              </p>
            </li>
            <li className="font-semibold text-foreground">
              Look for patterns
              <p className="text-sm text-muted-foreground font-normal mt-1 ml-6">
                Identify cross-platform presence, reused images, suspicious metadata, vague descriptions, and seller
                connections. Flag high-priority cases based on red flag criteria.
              </p>
            </li>
            <li className="font-semibold text-foreground">
              Test reproducibility
              <p className="text-sm text-muted-foreground font-normal mt-1 ml-6">
                Repeat the investigation process with different team members or at different times to verify
                consistency. Document any discrepancies and refine methodology.
              </p>
            </li>
            <li className="font-semibold text-foreground">
              Document and evaluate
              <p className="text-sm text-muted-foreground font-normal mt-1 ml-6">
                Compile findings into structured reports with visualizations, network graphs, and statistical analysis.
                Evaluate success based on reproducibility, lead quality, and documentation clarity.
              </p>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* How we measure success */}
      <Card>
        <CardHeader>
          <CardTitle>How We Measure Success</CardTitle>
          <CardDescription>Key metrics for evaluating investigative effectiveness</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold">Reproducibility</h4>
                <p className="text-sm text-muted-foreground">
                  Can other investigators follow the same methodology and reach similar conclusions? Consistent results
                  across multiple tests validate the framework's reliability.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold">Number of Leads Found</h4>
                <p className="text-sm text-muted-foreground">
                  How many actionable leads (seller profiles, cross-platform connections, suspicious patterns) were
                  identified? Quality and quantity of leads indicate investigative depth.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold">Clarity of Documentation</h4>
                <p className="text-sm text-muted-foreground">
                  Are findings clearly documented with evidence trails, timestamps, and source attribution? Clear
                  documentation enables knowledge transfer and legal admissibility.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Dataset Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Current Dataset Statistics</CardTitle>
          <CardDescription>Overview of collected case data for evaluation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold text-accent">{totalCases}</div>
              <p className="text-sm text-muted-foreground mt-1">Total Cases Analyzed</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold text-accent">{platforms}</div>
              <p className="text-sm text-muted-foreground mt-1">Platforms Monitored</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold text-accent">{highPriority}</div>
              <p className="text-sm text-muted-foreground mt-1">High Priority Cases</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-accent/50 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-accent" />
            PDF Report Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            PDF generation requires the <strong>jsPDF</strong> library. Use jsPDF/html2canvas to render charts and text
            into a formatted research report with charts and insights. Ensure jsPDF is included to enable the "Generate
            PDF" button.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To enable PDF export: Include jsPDF from a CDN (
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js
            </code>
            ) or install via npm (<code className="text-xs bg-muted px-1 py-0.5 rounded">npm install jspdf</code>).
            Charts can be embedded using{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">chart.toBase64Image()</code> for Chart.js or
            html2canvas for DOM elements.
          </p>
          <Button onClick={handleDownloadPDF} className="gap-2">
            <Download className="h-4 w-4" />
            Generate PDF (jsPDF required)
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
