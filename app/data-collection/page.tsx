"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Upload, Download, Plus, Trash2, Eye, Edit, Search, FileJson, Save, Info, Database } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function DataCollectionPage() {
  const { toast } = useToast()
  const [cases, setCases] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPlatform, setFilterPlatform] = useState("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCase, setEditingCase] = useState<any>(null)
  const [viewingCase, setViewingCase] = useState<any>(null)

  const [formData, setFormData] = useState({
    // A. Marketplace & Listing Information
    listing_id: "",
    platform: "",
    url: "",
    title: "",
    description: "",
    date_posted: "",
    archived_link: "",

    // B. Keyword/Query Metadata
    search_query: "",
    keywords: "",

    // C. Image Forensics Data (Extended)
    image_url: "",
    image_filename: "",
    image_gps: "",
    image_camera_model: "",
    image_timestamp: "",
    ela_summary: "",
    clone_detection: "",
    image_reused: false,
    reverse_image_results: "",

    // D. Textual Content Analysis (Extended)
    language: "",
    sentiment: "",
    repeated_phrases: "",
    vague_terms: "",
    coordinated_language: false,

    // E. Seller & Cross-Platform Mapping (Extended)
    seller_username: "",
    seller_email: "",
    seller_profile_image: "",
    seller_location: "",
    seller_other_platforms: "",
    seller_aliases: "",

    // F. OSINT Tool Matches
    whatsmyname_matches: "",
    osintcombine_matches: "",
    wayback_archive: "",

    // G. Prioritization/Flags
    priority: "medium",
    flags: "",
    notes: "",
  })

  // Load cases from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("catfa_cases")
    if (stored) {
      setCases(JSON.parse(stored))
    }
  }, [])

  // Save cases to localStorage whenever they change
  useEffect(() => {
    if (cases.length > 0) {
      localStorage.setItem("catfa_cases", JSON.stringify(cases))
    }
  }, [cases])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newCase = {
      id: editingCase?.id || Date.now().toString(),
      timestamp: new Date().toISOString(),
      listing_id: formData.listing_id,
      platform: formData.platform,
      url: formData.url,
      title: formData.title,
      description: formData.description,
      date_posted: formData.date_posted,
      archived_link: formData.archived_link,
      search_query: formData.search_query,
      images: formData.image_url
        ? [
            {
              filename: formData.image_filename,
              url: formData.image_url,
              gps: formData.image_gps,
              camera_model: formData.image_camera_model,
              timestamp: formData.image_timestamp,
              ela_summary: formData.ela_summary,
              clone_detection: formData.clone_detection,
              reused: formData.image_reused,
            },
          ]
        : [],
      text_analysis: {
        repeated_phrases: formData.repeated_phrases.split(",").map((p) => p.trim()),
        vague_terms: formData.vague_terms.split(",").map((t) => t.trim()),
        coordinated_language: formData.coordinated_language,
        language: formData.language,
        sentiment: formData.sentiment,
      },
      seller: {
        username: formData.seller_username,
        email: formData.seller_email,
        profile_image: formData.seller_profile_image,
        location: formData.seller_location,
        other_platforms: formData.seller_other_platforms.split(",").map((p) => p.trim()),
        aliases: formData.seller_aliases.split(",").map((a) => a.trim()),
      },
      osint_tool_matches: {
        whatsmyname: formData.whatsmyname_matches.split(",").map((m) => m.trim()),
        osintcombine: formData.osintcombine_matches.split(",").map((m) => m.trim()),
        wayback: formData.wayback_archive,
      },
      priority: formData.priority,
      flags: formData.flags.split(",").map((f) => f.trim()),
      notes: formData.notes,
    }

    if (editingCase) {
      setCases((prev) => prev.map((c) => (c.id === editingCase.id ? newCase : c)))
      toast({
        title: "Case Updated",
        description: "The case has been successfully updated.",
      })
    } else {
      setCases((prev) => [...prev, newCase])
      toast({
        title: "Case Added",
        description: "New case has been successfully added to the database.",
      })
    }

    resetForm()
    setIsFormOpen(false)
  }

  const resetForm = () => {
    setFormData({
      listing_id: "",
      platform: "",
      url: "",
      title: "",
      description: "",
      date_posted: "",
      archived_link: "",
      search_query: "",
      keywords: "",
      image_url: "",
      image_filename: "",
      image_gps: "",
      image_camera_model: "",
      image_timestamp: "",
      ela_summary: "",
      clone_detection: "",
      image_reused: false,
      reverse_image_results: "",
      language: "",
      sentiment: "",
      repeated_phrases: "",
      vague_terms: "",
      coordinated_language: false,
      seller_username: "",
      seller_email: "",
      seller_profile_image: "",
      seller_location: "",
      seller_other_platforms: "",
      seller_aliases: "",
      whatsmyname_matches: "",
      osintcombine_matches: "",
      wayback_archive: "",
      priority: "medium",
      flags: "",
      notes: "",
    })
    setEditingCase(null)
  }

  const handleEdit = (caseData: any) => {
    setEditingCase(caseData)
    setFormData({
      listing_id: caseData.listing_id || "",
      platform: caseData.platform || "",
      url: caseData.url || "",
      title: caseData.title || "",
      description: caseData.description || "",
      date_posted: caseData.date_posted || "",
      archived_link: caseData.archived_link || "",
      search_query: caseData.search_query || "",
      keywords: caseData.keywords || "",
      image_url: caseData.images?.[0]?.url || "",
      image_filename: caseData.images?.[0]?.filename || "",
      image_gps: caseData.images?.[0]?.gps || "",
      image_camera_model: caseData.images?.[0]?.camera_model || "",
      image_timestamp: caseData.images?.[0]?.timestamp || "",
      ela_summary: caseData.images?.[0]?.ela_summary || "",
      clone_detection: caseData.images?.[0]?.clone_detection || "",
      image_reused: caseData.images?.[0]?.reused || false,
      reverse_image_results: caseData.reverse_image_results || "",
      language: caseData.text_analysis?.language || "",
      sentiment: caseData.text_analysis?.sentiment || "",
      repeated_phrases: caseData.text_analysis?.repeated_phrases?.join(", ") || "",
      vague_terms: caseData.text_analysis?.vague_terms?.join(", ") || "",
      coordinated_language: caseData.text_analysis?.coordinated_language || false,
      seller_username: caseData.seller?.username || "",
      seller_email: caseData.seller?.email || "",
      seller_profile_image: caseData.seller?.profile_image || "",
      seller_location: caseData.seller?.location || "",
      seller_other_platforms: caseData.seller?.other_platforms?.join(", ") || "",
      seller_aliases: caseData.seller?.aliases?.join(", ") || "",
      whatsmyname_matches: caseData.osint_tool_matches?.whatsmyname?.join(", ") || "",
      osintcombine_matches: caseData.osint_tool_matches?.osintcombine?.join(", ") || "",
      wayback_archive: caseData.osint_tool_matches?.wayback || "",
      priority: caseData.priority || "medium",
      flags: Array.isArray(caseData.flags) ? caseData.flags.join(", ") : caseData.flags || "",
      notes: caseData.notes || "",
    })
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    setCases((prev) => prev.filter((c) => c.id !== id))
    toast({
      title: "Case Deleted",
      description: "The case has been removed from the database.",
      variant: "destructive",
    })
  }

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(cases, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `catfa_cases_${new Date().toISOString().split("T")[0]}.json`
    link.click()

    toast({
      title: "Export Successful",
      description: "Cases exported as JSON file.",
    })
  }

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string)
        setCases((prev) => [...prev, ...imported])
        toast({
          title: "Import Successful",
          description: `Imported ${imported.length} cases.`,
        })
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Invalid JSON file format.",
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)
  }

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.listing_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.seller?.username?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = filterPlatform === "all" || c.platform === filterPlatform
    return matchesSearch && matchesPlatform
  })

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <Toaster />

      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Data Collection & Management</h1>
        <p className="text-muted-foreground">
          Manage cultural artifact case data with manual entry, OSINT tool integration, and file import capabilities
        </p>
      </div>

      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            OSINT Tool Integration
          </CardTitle>
          <CardDescription>
            Information derived from external OSINT tools for comprehensive artifact investigation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="tool-info">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  What types of information come from OSINT tools?
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 text-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-sm">WhatsMyName / OSINTCombine</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-1 text-muted-foreground">
                      <p>• Matched usernames across platforms</p>
                      <p>• Found profile URLs</p>
                      <p>• Account metadata and aliases</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-sm">ExifTool / Image Metadata</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-1 text-muted-foreground">
                      <p>• GPS coordinates from photos</p>
                      <p>• Camera model and settings</p>
                      <p>• Timestamps and file names</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-sm">Forensically / ELA</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-1 text-muted-foreground">
                      <p>• ELA score and summary</p>
                      <p>• Clone detection results</p>
                      <p>• Notes on image anomalies</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-sm">Voyant Tools / Text Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-1 text-muted-foreground">
                      <p>• Repeated phrases detection</p>
                      <p>• Suspicious language markers</p>
                      <p>• Coordinated phrasing patterns</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-sm">Wayback Machine / Archive.today</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-1 text-muted-foreground">
                      <p>• Archived page URLs</p>
                      <p>• Capture timestamps</p>
                      <p>• Historical listing changes</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Extended JSON Schema Example:</h4>
                  <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto border max-h-64">
                    {`{
  "listing_id": "123456",
  "platform": "Etsy",
  "url": "https://www.etsy.com/listing/123456/tribal-mask",
  "title": "Authentic Tribal Mask",
  "description": "Hand-carved tribal mask, vintage...",
  "date_posted": "2025-10-01",
  "archived_link": "https://web.archive.org/.../123456",
  "search_query": "site:etsy.com \\"tribal mask\\" -replica",
  "images": [{
    "filename": "mask1.jpg",
    "gps": "12.3456,-78.9012",
    "camera_model": "Canon EOS 80D",
    "timestamp": "2023-06-15T14:32:00",
    "ela_summary": "minor anomalies",
    "clone_detection": "no duplication detected",
    "reused": false
  }],
  "text_analysis": {
    "repeated_phrases": ["hand-carved", "authentic"],
    "vague_terms": ["antique", "rare"],
    "coordinated_language": true
  },
  "seller": {
    "username": "tribalmaster",
    "email": "tribalmaster@example.com",
    "other_platforms": ["Facebook Marketplace", "eBay"],
    "aliases": ["tribalmaster2022"]
  },
  "osint_tool_matches": {
    "whatsmyname": ["facebook.com/tribalmaster"],
    "osintcombine": ["profile_url_1", "profile_url_2"],
    "wayback": "https://web.archive.org/..."
  },
  "priority": "high",
  "flags": ["vague provenance", "reused images"]
}`}
                  </pre>
                  <p className="text-xs text-muted-foreground mt-2">
                    <strong>Note:</strong> This is informational only. Tool results are stored only if entered manually
                    via the form or file upload. No automated tool execution occurs.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Actions Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm} className="gap-2">
                    <Plus className="h-4 w-4" /> Add New Case
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingCase ? "Edit Case" : "Add New Case"}</DialogTitle>
                    <DialogDescription>
                      Enter case information following the CATFA extended data structure with OSINT tool outputs
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Section A: Marketplace & Listing Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">A. Marketplace & Listing Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="listing_id">Listing ID *</Label>
                          <Input
                            id="listing_id"
                            value={formData.listing_id}
                            onChange={(e) => handleInputChange("listing_id", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="platform">Platform *</Label>
                          <Select value={formData.platform} onValueChange={(v) => handleInputChange("platform", v)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Etsy">Etsy</SelectItem>
                              <SelectItem value="eBay">eBay</SelectItem>
                              <SelectItem value="Facebook Marketplace">Facebook Marketplace</SelectItem>
                              <SelectItem value="Instagram">Instagram</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="url">URL *</Label>
                          <Input
                            id="url"
                            type="url"
                            value={formData.url}
                            onChange={(e) => handleInputChange("url", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="title">Title *</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date_posted">Date Posted</Label>
                          <Input
                            id="date_posted"
                            type="date"
                            value={formData.date_posted}
                            onChange={(e) => handleInputChange("date_posted", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="archived_link">Archived Link (Wayback/Archive.today)</Label>
                          <Input
                            id="archived_link"
                            type="url"
                            value={formData.archived_link}
                            onChange={(e) => handleInputChange("archived_link", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section B: Keyword/Query Metadata */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">B. Keyword/Query Metadata</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="search_query">Search Query (Google Dork)</Label>
                          <Input
                            id="search_query"
                            value={formData.search_query}
                            onChange={(e) => handleInputChange("search_query", e.target.value)}
                            placeholder='site:etsy.com "tribal mask"'
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                          <Input
                            id="keywords"
                            value={formData.keywords}
                            onChange={(e) => handleInputChange("keywords", e.target.value)}
                            placeholder="artifact, cultural, heritage"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">C. Image Forensics Data (ExifTool / ELA)</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="image_url">Image URL</Label>
                          <Input
                            id="image_url"
                            type="url"
                            value={formData.image_url}
                            onChange={(e) => handleInputChange("image_url", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="image_filename">Filename</Label>
                          <Input
                            id="image_filename"
                            value={formData.image_filename}
                            onChange={(e) => handleInputChange("image_filename", e.target.value)}
                            placeholder="mask1.jpg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="image_gps">GPS Coordinates</Label>
                          <Input
                            id="image_gps"
                            value={formData.image_gps}
                            onChange={(e) => handleInputChange("image_gps", e.target.value)}
                            placeholder="12.3456,-78.9012"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="image_camera_model">Camera Model</Label>
                          <Input
                            id="image_camera_model"
                            value={formData.image_camera_model}
                            onChange={(e) => handleInputChange("image_camera_model", e.target.value)}
                            placeholder="Canon EOS 80D"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="image_timestamp">Image Timestamp</Label>
                          <Input
                            id="image_timestamp"
                            type="datetime-local"
                            value={formData.image_timestamp}
                            onChange={(e) => handleInputChange("image_timestamp", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ela_summary">ELA Summary</Label>
                          <Input
                            id="ela_summary"
                            value={formData.ela_summary}
                            onChange={(e) => handleInputChange("ela_summary", e.target.value)}
                            placeholder="minor anomalies"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="clone_detection">Clone Detection Result</Label>
                          <Input
                            id="clone_detection"
                            value={formData.clone_detection}
                            onChange={(e) => handleInputChange("clone_detection", e.target.value)}
                            placeholder="no duplication detected"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reverse_image_results">Reverse Image Search Results</Label>
                          <Textarea
                            id="reverse_image_results"
                            value={formData.reverse_image_results}
                            onChange={(e) => handleInputChange("reverse_image_results", e.target.value)}
                            rows={2}
                            placeholder="Found on 3 other sites..."
                          />
                        </div>
                        <div className="space-y-2 flex items-center gap-2 pt-6">
                          <input
                            type="checkbox"
                            id="image_reused"
                            checked={formData.image_reused}
                            onChange={(e) => handleInputChange("image_reused", e.target.checked)}
                            className="h-4 w-4"
                          />
                          <Label htmlFor="image_reused" className="cursor-pointer">
                            Image Reused/Duplicated
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">
                        D. Textual Content Analysis (Voyant Tools)
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <Input
                            id="language"
                            value={formData.language}
                            onChange={(e) => handleInputChange("language", e.target.value)}
                            placeholder="English"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sentiment">Sentiment</Label>
                          <Select value={formData.sentiment} onValueChange={(v) => handleInputChange("sentiment", v)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select sentiment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="positive">Positive</SelectItem>
                              <SelectItem value="neutral">Neutral</SelectItem>
                              <SelectItem value="negative">Negative</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="repeated_phrases">Repeated Phrases (comma-separated)</Label>
                          <Input
                            id="repeated_phrases"
                            value={formData.repeated_phrases}
                            onChange={(e) => handleInputChange("repeated_phrases", e.target.value)}
                            placeholder="hand-carved, authentic"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="vague_terms">Vague Terms (comma-separated)</Label>
                          <Input
                            id="vague_terms"
                            value={formData.vague_terms}
                            onChange={(e) => handleInputChange("vague_terms", e.target.value)}
                            placeholder="antique, rare, vintage"
                          />
                        </div>
                        <div className="space-y-2 flex items-center gap-2 pt-6 md:col-span-2">
                          <input
                            type="checkbox"
                            id="coordinated_language"
                            checked={formData.coordinated_language}
                            onChange={(e) => handleInputChange("coordinated_language", e.target.checked)}
                            className="h-4 w-4"
                          />
                          <Label htmlFor="coordinated_language" className="cursor-pointer">
                            Coordinated Language Detected
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">
                        E. Seller & Cross-Platform Mapping (WhatsMyName / OSINTCombine)
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="seller_username">Seller Username</Label>
                          <Input
                            id="seller_username"
                            value={formData.seller_username}
                            onChange={(e) => handleInputChange("seller_username", e.target.value)}
                            placeholder="tribalmaster"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="seller_email">Seller Email</Label>
                          <Input
                            id="seller_email"
                            type="email"
                            value={formData.seller_email}
                            onChange={(e) => handleInputChange("seller_email", e.target.value)}
                            placeholder="seller@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="seller_profile_image">Profile Image URL</Label>
                          <Input
                            id="seller_profile_image"
                            type="url"
                            value={formData.seller_profile_image}
                            onChange={(e) => handleInputChange("seller_profile_image", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="seller_location">Seller Location</Label>
                          <Input
                            id="seller_location"
                            value={formData.seller_location}
                            onChange={(e) => handleInputChange("seller_location", e.target.value)}
                            placeholder="City, Country"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="seller_other_platforms">Other Platforms (comma-separated)</Label>
                          <Input
                            id="seller_other_platforms"
                            value={formData.seller_other_platforms}
                            onChange={(e) => handleInputChange("seller_other_platforms", e.target.value)}
                            placeholder="Facebook Marketplace, eBay"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="seller_aliases">Aliases (comma-separated)</Label>
                          <Input
                            id="seller_aliases"
                            value={formData.seller_aliases}
                            onChange={(e) => handleInputChange("seller_aliases", e.target.value)}
                            placeholder="tribalmaster2022, tribal_seller"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">F. OSINT Tool Matches</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="whatsmyname_matches">WhatsMyName Matches (comma-separated URLs)</Label>
                          <Textarea
                            id="whatsmyname_matches"
                            value={formData.whatsmyname_matches}
                            onChange={(e) => handleInputChange("whatsmyname_matches", e.target.value)}
                            rows={2}
                            placeholder="facebook.com/tribalmaster, twitter.com/tribalmaster"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="osintcombine_matches">OSINTCombine Matches (comma-separated URLs)</Label>
                          <Textarea
                            id="osintcombine_matches"
                            value={formData.osintcombine_matches}
                            onChange={(e) => handleInputChange("osintcombine_matches", e.target.value)}
                            rows={2}
                            placeholder="profile_url_1, profile_url_2"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="wayback_archive">Wayback Machine Archive URL</Label>
                          <Input
                            id="wayback_archive"
                            type="url"
                            value={formData.wayback_archive}
                            onChange={(e) => handleInputChange("wayback_archive", e.target.value)}
                            placeholder="https://web.archive.org/web/..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section G: Prioritization/Flags */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-2">G. Prioritization/Flags</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="priority">Priority Level *</Label>
                          <Select value={formData.priority} onValueChange={(v) => handleInputChange("priority", v)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="flags">Risk Flags (comma-separated)</Label>
                          <Input
                            id="flags"
                            value={formData.flags}
                            onChange={(e) => handleInputChange("flags", e.target.value)}
                            placeholder="vague provenance, reused images"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="notes">Additional Notes</Label>
                          <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => handleInputChange("notes", e.target.value)}
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="gap-2">
                        <Save className="h-4 w-4" />
                        {editingCase ? "Update Case" : "Save Case"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={handleExportJSON} className="gap-2 bg-transparent">
                <Download className="h-4 w-4" /> Export JSON
              </Button>

              <Button variant="outline" asChild className="gap-2 bg-transparent">
                <label htmlFor="import-json" className="cursor-pointer">
                  <Upload className="h-4 w-4" /> Import JSON
                  <input id="import-json" type="file" accept=".json" className="hidden" onChange={handleImportJSON} />
                </label>
              </Button>
            </div>

            <Badge variant="secondary" className="text-sm">
              {cases.length} Total Cases
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, listing ID, or seller..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterPlatform} onValueChange={setFilterPlatform}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by platform" />
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
          </div>
        </CardContent>
      </Card>

      {/* Cases Table */}
      <Card>
        <CardHeader>
          <CardTitle>Collected Cases</CardTitle>
          <CardDescription>View, edit, and manage all cultural artifact cases with OSINT enrichment</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredCases.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileJson className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No cases found. Add your first case to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Listing ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.map((caseData) => (
                    <TableRow key={caseData.id}>
                      <TableCell className="font-mono text-sm">{caseData.listing_id}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{caseData.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{caseData.platform}</Badge>
                      </TableCell>
                      <TableCell>{caseData.seller?.username || "—"}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            caseData.priority === "critical"
                              ? "destructive"
                              : caseData.priority === "high"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {caseData.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(caseData.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setViewingCase(caseData)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Case Details</DialogTitle>
                                <DialogDescription>
                                  Full JSON structure for case {viewingCase?.listing_id}
                                </DialogDescription>
                              </DialogHeader>
                              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                                {JSON.stringify(viewingCase, null, 2)}
                              </pre>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(caseData)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(caseData.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
