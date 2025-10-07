"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, ImageIcon, Archive, AlertTriangle, Shield, Download, Copy, Check, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

const platforms = [
  {
    name: "eBay",
    reason: "Large marketplace with extensive antiques and collectibles sections; high volume of cultural artifacts",
    icon: "🛒",
  },
  {
    name: "Etsy",
    reason: "Handcrafted listings; may host misrepresented items labeled as 'vintage' or 'authentic'",
    icon: "🎨",
  },
  {
    name: "Facebook Marketplace",
    reason: "Peer-to-peer sales with minimal oversight; ephemeral listings and local transactions",
    icon: "📱",
  },
  {
    name: "Instagram",
    reason: "Visual-first platform; sellers use hashtags and DMs for private transactions",
    icon: "📸",
  },
  {
    name: "Niche Antique Forums",
    reason: "Specialized communities with expert knowledge; potential for both legitimate and illicit sales",
    icon: "💬",
  },
  {
    name: "Local Classifieds",
    reason: "Regional platforms (Gumtree, Craigslist) with limited moderation and traceability",
    icon: "📰",
  },
]

const googleDorkExamples = [
  {
    query: 'site:etsy.com "tribal mask" -replica -handicraft -souvenir',
    description: "Search Etsy for tribal masks while excluding common replica keywords",
  },
  {
    query: 'site:ebay.com "ancient artifact" "no provenance"',
    description: "Find eBay listings mentioning ancient artifacts without documented provenance",
  },
  {
    query: 'site:facebook.com "cultural heritage" inurl:marketplace',
    description: "Search Facebook Marketplace for cultural heritage items",
  },
  {
    query: 'intext:"authentic" intext:"rare" filetype:pdf site:*.edu',
    description: "Find academic PDFs discussing authentic and rare cultural items",
  },
]

const redFlags = [
  { flag: "Vague provenance", severity: "high", description: "No clear origin or ownership history" },
  { flag: "Reused images", severity: "high", description: "Images found on multiple listings or websites" },
  { flag: "Anonymous seller", severity: "medium", description: "Limited seller information or new account" },
  {
    flag: "Multiple platform listings",
    severity: "medium",
    description: "Same item listed across different platforms",
  },
  { flag: "Suspicious pricing", severity: "high", description: "Significantly below or above market value" },
  {
    flag: "Missing provenance documents",
    severity: "high",
    description: "No export permits, certificates, or documentation",
  },
  { flag: "Coordinated language", severity: "medium", description: "Similar phrasing across multiple listings" },
  { flag: "Recent account creation", severity: "low", description: "Seller account created within last 3 months" },
]

const appendixData = {
  google_dorks: googleDorkExamples,
  sample_listings: [
    {
      listing_id: "DEMO-001",
      platform: "Etsy",
      title: "Authentic Tribal Mask - Vintage",
      red_flags: ["vague provenance", "suspicious pricing"],
      priority: "high",
    },
    {
      listing_id: "DEMO-002",
      platform: "eBay",
      title: "Ancient Pottery Fragment",
      red_flags: ["missing provenance documents", "reused images"],
      priority: "critical",
    },
  ],
}

export default function DataScopingPage() {
  const { toast } = useToast()
  const [copiedQuery, setCopiedQuery] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedQuery(text)
    toast({
      title: "Copied to clipboard",
      description: "Query copied successfully",
    })
    setTimeout(() => setCopiedQuery(null), 2000)
  }

  const downloadAppendix = (format: "json" | "pdf") => {
    if (format === "json") {
      const dataStr = JSON.stringify(appendixData, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "catfa_data_scoping_appendix.json"
      link.click()
      toast({
        title: "Download Started",
        description: "Appendix JSON file is downloading",
      })
    } else {
      // For PDF, we'll create a simple text-based version
      const pdfContent = `CATFA Data Scoping Appendix
      
Google Dork Queries:
${googleDorkExamples.map((ex, i) => `${i + 1}. ${ex.query}\n   ${ex.description}`).join("\n\n")}

Sample Demonstration Listings:
${appendixData.sample_listings.map((listing, i) => `${i + 1}. ${listing.title} (${listing.platform})\n   ID: ${listing.listing_id}\n   Priority: ${listing.priority}\n   Red Flags: ${listing.red_flags.join(", ")}`).join("\n\n")}
`
      const dataBlob = new Blob([pdfContent], { type: "text/plain" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "catfa_data_scoping_appendix.txt"
      link.click()
      toast({
        title: "Download Started",
        description: "Appendix text file is downloading (PDF generation requires server-side processing)",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <Toaster />

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Data Scoping</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Defining boundaries and parameters for an investigation into online cultural artifact trafficking.
        </p>

        {/* Prominent Disclaimer */}
        <Alert className="border-amber-500/50 bg-amber-500/10">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <AlertDescription className="text-base font-medium">
            <strong>Informational demo only</strong> — This page is educational and does not perform live searches or
            data collection. Do not implement scraping or automated queries.
          </AlertDescription>
        </Alert>
      </div>

      {/* Marketplaces & Platforms */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Marketplaces & Platforms</h2>
        </div>
        <p className="text-muted-foreground">
          Key online platforms where cultural artifacts are commonly listed, traded, or advertised.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <Card key={platform.name} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{platform.icon}</span>
                  {platform.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{platform.reason}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Google Dorks */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Keyword-Based Query Construction (Google Dorks)</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What are Google Dorks?</CardTitle>
            <CardDescription>
              Advanced search operators that refine results by targeting specific sites, file types, or text patterns.
              They help investigators locate relevant listings more efficiently than standard searches.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Example Query (Copy-Selectable):</h3>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto border">
                  site:etsy.com "tribal mask" -replica -handicraft -souvenir
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard('site:etsy.com "tribal mask" -replica -handicraft -souvenir')}
                >
                  {copiedQuery === 'site:etsy.com "tribal mask" -replica -handicraft -souvenir' ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Figure: Application of a Google Dorks query</h4>
                      <p className="text-sm text-muted-foreground">Click to view explanation</p>
                    </div>
                    <Info className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Google Dorks Query Application</DialogTitle>
                  <DialogDescription>Understanding the search operator breakdown</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <img
                      src="/google-search-results-showing-etsy-listings-for-tr.jpg"
                      alt="Google Dorks search results example"
                      className="w-full rounded border"
                    />
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>site:etsy.com</strong> — Restricts results to Etsy domain only
                    </p>
                    <p>
                      <strong>"tribal mask"</strong> — Exact phrase match for targeted results
                    </p>
                    <p>
                      <strong>-replica -handicraft -souvenir</strong> — Excludes common non-authentic item keywords
                    </p>
                    <p className="text-muted-foreground pt-2">
                      This query helps investigators find potentially authentic tribal masks while filtering out modern
                      reproductions and tourist souvenirs.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="more-examples">
                <AccordionTrigger>View More Example Queries</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  {googleDorkExamples.map((example, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-1">
                          {index + 1}
                        </Badge>
                        <div className="flex-1 space-y-2">
                          <div className="relative">
                            <pre className="bg-muted p-3 rounded font-mono text-xs overflow-x-auto border">
                              {example.query}
                            </pre>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-1 right-1"
                              onClick={() => copyToClipboard(example.query)}
                            >
                              {copiedQuery === example.query ? (
                                <Check className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">{example.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* Image Forensics */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Image Forensics & Reverse Search</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reverse Image Search</CardTitle>
            <CardDescription>
              Tools like Google Images and Yandex allow investigators to find where else an image appears online,
              revealing potential image reuse, stock photos, or cross-platform listings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Key Tools:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Google Reverse Image Search</li>
                  <li>Yandex Images (often finds more results)</li>
                  <li>TinEye (tracks image history)</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">What Investigators Look For:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Image reuse across multiple listings</li>
                  <li>Stock photography or museum images</li>
                  <li>Metadata inconsistencies</li>
                </ul>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Error Level Analysis (ELA) & Forensically</h4>
              <p className="text-sm text-muted-foreground mb-3">
                ELA detects areas of an image that have been edited or manipulated by analyzing compression levels.
                Tools like Forensically.com provide clone detection and metadata analysis.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <img
                  src="/error-level-analysis-forensics-example-showing-ima.jpg"
                  alt="ELA forensics example"
                  className="w-full rounded border"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Example: ELA visualization showing potential manipulation areas (brighter regions indicate recent
                  edits)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Content Preservation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Archive className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Preservation of Volatile Content</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Why Archive Ephemeral Listings?</CardTitle>
            <CardDescription>
              Online marketplace listings can be deleted, edited, or removed at any time. Archiving creates permanent
              snapshots for evidence preservation and future reference.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-base">Wayback Machine</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="text-muted-foreground">Internet Archive's web archiving service</p>
                  <p className="font-mono text-xs">https://web.archive.org</p>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-base">Archive.today</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="text-muted-foreground">On-demand webpage archiving</p>
                  <p className="font-mono text-xs">https://archive.today</p>
                </CardContent>
              </Card>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="how-to-archive">
                <AccordionTrigger>How to Archive a Listing (Step-by-Step)</AccordionTrigger>
                <AccordionContent className="space-y-3 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Using Wayback Machine:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                      <li>Navigate to https://web.archive.org/save</li>
                      <li>Paste the listing URL into the "Save Page Now" field</li>
                      <li>Click "Save Page" and wait for confirmation</li>
                      <li>Copy the archived URL (format: https://web.archive.org/web/[timestamp]/[original-url])</li>
                      <li>Store the archived link in your case documentation</li>
                    </ol>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Using Archive.today:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                      <li>Go to https://archive.today</li>
                      <li>Enter the listing URL in the red box</li>
                      <li>Click "save" and wait for the archive to complete</li>
                      <li>Copy the generated archive link</li>
                      <li>Document the archive timestamp and URL</li>
                    </ol>
                  </div>
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      <strong>Best Practice:</strong> Archive listings immediately upon discovery, as they may be
                      removed within hours or days.
                    </AlertDescription>
                  </Alert>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* Prioritization Criteria */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Prioritization Criteria / Lead Triage</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Red Flags & Risk Indicators</CardTitle>
            <CardDescription>
              Criteria used to assess the priority level of cultural artifact listings during investigation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {redFlags.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                  <Badge
                    variant={
                      item.severity === "high" ? "destructive" : item.severity === "medium" ? "default" : "secondary"
                    }
                    className="mt-0.5"
                  >
                    {item.severity}
                  </Badge>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{item.flag}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Priority Legend</h4>
              <div className="grid md:grid-cols-3 gap-3">
                <Card className="bg-destructive/10 border-destructive/50">
                  <CardContent className="pt-4">
                    <Badge variant="destructive" className="mb-2">
                      High
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Multiple red flags, missing documentation, suspicious patterns
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-primary/10 border-primary/50">
                  <CardContent className="pt-4">
                    <Badge className="mb-2">Medium</Badge>
                    <p className="text-xs text-muted-foreground">
                      Some concerns, requires further investigation, partial documentation
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardContent className="pt-4">
                    <Badge variant="secondary" className="mb-2">
                      Low
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Minor concerns, appears legitimate, monitoring recommended
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Ethics & POPIA */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Ethics & POPIA Compliance</h2>
        </div>

        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle>Ethical Research Principles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              <strong>Public Data Only:</strong> This page uses publicly accessible, non-sensitive example content for
              demonstration purposes.
            </p>
            <p>
              <strong>POPIA Compliance:</strong> All data collection follows South Africa's Protection of Personal
              Information Act (POPIA) principles:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Minimal collection — only necessary information</li>
              <li>Purpose limitation — data used only for research objectives</li>
              <li>Proportionality — methods appropriate to research goals</li>
              <li>Anonymization — personal identifiers removed or pseudonymized</li>
            </ul>
            <div className="pt-2">
              <Button variant="outline" asChild className="gap-2 bg-transparent">
                <a href="/ethics">
                  <Shield className="h-4 w-4" />
                  View Full Ethics Page
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Appendix & Download */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Download className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Appendix & Download</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Static Demonstration Appendix</CardTitle>
            <CardDescription>
              Download example Google Dork queries and sample non-sensitive demonstration listings for reference
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => downloadAppendix("json")} className="gap-2">
                <Download className="h-4 w-4" />
                Download JSON
              </Button>
              <Button onClick={() => downloadAppendix("pdf")} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download Text (PDF requires server)
              </Button>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="preview-appendix">
                <AccordionTrigger>Preview Appendix Contents</AccordionTrigger>
                <AccordionContent>
                  <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto border max-h-96">
                    {JSON.stringify(appendixData, null, 2)}
                  </pre>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* Final Safety Note */}
      <Alert className="border-destructive/50 bg-destructive/10">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <AlertDescription className="text-sm">
          <strong>Safety & Non-Operational Note:</strong> This page is educational only. It does not perform searches or
          interact with external services. Do not implement scraping or automated queries without proper legal
          authorization and ethical review.
        </AlertDescription>
      </Alert>
    </div>
  )
}
