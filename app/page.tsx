import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Database, Network, BarChart3, Shield, Globe, FileSearch, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <Badge variant="secondary" className="mb-4">
          Honours Project 2025
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
          Cultural Art Trafficking Forensic Analysis
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
          An OSINT and Social Network Analysis investigative framework for identifying and analyzing cultural artifact
          trafficking across digital marketplaces
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Link href="/data-collection">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/visualization">
            <Button size="lg" variant="outline" className="gap-2 bg-transparent">
              View Dashboard <BarChart3 className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Project Overview */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Project Overview</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            CATFA combines open-source intelligence gathering with network analysis to investigate cultural heritage
            trafficking in the digital age
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-foreground">
                  <Search className="h-6 w-6" />
                </div>
                <CardTitle>OSINT Methods</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-relaxed">
                Leveraging Google Dorks, Shodan, and advanced search techniques to discover artifact listings across
                multiple platforms
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-foreground">
                  <Network className="h-6 w-6" />
                </div>
                <CardTitle>Network Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-relaxed">
                Using Maltego and graph theory to map seller networks, cross-platform presence, and trafficking patterns
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-foreground">
                  <FileSearch className="h-6 w-6" />
                </div>
                <CardTitle>Forensic Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-relaxed">
                Applying image forensics, textual analysis with Voyant Tools, and metadata extraction for evidence
                gathering
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Methodology Framework */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">4-Phase Investigative Framework</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A systematic approach to cultural artifact investigation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="default">Phase 1</Badge>
                <Database className="h-5 w-5 text-foreground" />
              </div>
              <CardTitle className="text-xl">Data Scoping</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Define search parameters</li>
                <li>• Identify target platforms</li>
                <li>• Establish keywords</li>
                <li>• Set temporal boundaries</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="default">Phase 2</Badge>
                <Search className="h-5 w-5 text-foreground" />
              </div>
              <CardTitle className="text-xl">Data Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• OSINT gathering</li>
                <li>• Automated scraping</li>
                <li>• Manual verification</li>
                <li>• Metadata extraction</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="default">Phase 3</Badge>
                <Network className="h-5 w-5 text-foreground" />
              </div>
              <CardTitle className="text-xl">Network Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Seller mapping</li>
                <li>• Cross-platform linking</li>
                <li>• Pattern identification</li>
                <li>• Relationship graphing</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="default">Phase 4</Badge>
                <BarChart3 className="h-5 w-5 text-foreground" />
              </div>
              <CardTitle className="text-xl">Evaluation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Risk prioritization</li>
                <li>• Statistical analysis</li>
                <li>• Visualization</li>
                <li>• Report generation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Research Tools & Technologies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Industry-standard OSINT and forensic analysis tools</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Globe className="h-4 w-4 text-foreground" />
                  OSINT Tools
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Google Advanced Search & Dorks</li>
                  <li>• Shodan IoT Search Engine</li>
                  <li>• Archive.org Wayback Machine</li>
                  <li>• Social Media Intelligence</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Network className="h-4 w-4 text-foreground" />
                  Network Analysis
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Maltego Transform Hub</li>
                  <li>• Gephi Graph Visualization</li>
                  <li>• Neo4j Graph Database</li>
                  <li>• NetworkX Python Library</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileSearch className="h-4 w-4 text-foreground" />
                  Forensic Analysis
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Forensically Image Analysis</li>
                  <li>• Voyant Tools Text Mining</li>
                  <li>• ExifTool Metadata Extraction</li>
                  <li>• TinEye Reverse Image Search</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Challenges & Limitations */}
      <section className="space-y-6">
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Challenges & Limitations</CardTitle>
                <CardDescription>Constraints and considerations in OSINT-based artifact investigation</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              While the CATFA framework demonstrates the potential of OSINT methodologies for cultural heritage
              protection, several challenges and limitations must be acknowledged:
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>
                  <strong>Limited accessibility and persistence of online data:</strong> Listings are often ephemeral,
                  removed quickly, or hidden behind authentication walls, making systematic monitoring difficult.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>
                  <strong>Metadata stripping and inconsistent EXIF:</strong> Many platforms automatically strip EXIF
                  data from uploaded images, reducing the effectiveness of image forensics.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>
                  <strong>Restricted access and paywalls:</strong> Advanced tools like Shodan Pro and Maltego Pro
                  require paid subscriptions, limiting the scale and depth of investigations for resource-constrained
                  researchers.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>
                  <strong>Actor anonymity and platform privacy restrictions:</strong> Sellers often use pseudonyms,
                  VPNs, and privacy-focused platforms, making attribution and cross-platform linking challenging.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>
                  <strong>Ethical constraints (POPIA):</strong> Compliance with data protection regulations prevents
                  intrusive methods such as social engineering, unauthorized access, or invasive profiling.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>
                  <strong>Bias toward English and indexed platforms:</strong> The framework is most effective on
                  English-language, publicly indexed platforms. Many trafficking networks operate on non-English sites,
                  dark web marketplaces, or private messaging channels beyond OSINT reach.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">•</span>
                <span>
                  <strong>Manual effort and scaling limitations:</strong> While some processes can be automated, much of
                  the analysis requires manual verification, limiting the scale of investigations.
                </span>
              </li>
            </ul>
            <div className="pt-4 border-t">
              <p className="text-sm font-semibold text-foreground">
                ⚠️ This site is a proof-of-concept. It demonstrates methodology and visualization — it is not a
                law-enforcement tool.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Ethics & Compliance */}
      <section className="space-y-6">
        <Card className="border-accent/50 bg-accent/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Ethical Research & POPIA Compliance</CardTitle>
                <CardDescription>Responsible OSINT practices and data protection</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              This research adheres to the Protection of Personal Information Act (POPIA) and international OSINT ethics
              standards. All data collection focuses on publicly available information, with appropriate anonymization
              and responsible disclosure practices.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">POPIA Compliant</Badge>
              <Badge variant="outline">Ethical OSINT</Badge>
              <Badge variant="outline">Data Anonymization</Badge>
              <Badge variant="outline">Transparent Methodology</Badge>
            </div>
            <Link href="/ethics">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                Read Full Ethics Statement <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6 py-12">
        <h2 className="text-3xl font-bold">Explore the Platform</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Navigate to the Data Collection page to begin entering case data, or view the Visualization Dashboard to see
          analytical insights
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/data-collection">
            <Button size="lg" variant="default">
              Start Data Entry
            </Button>
          </Link>
          <Link href="/visualization">
            <Button size="lg" variant="outline">
              View Analytics
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
