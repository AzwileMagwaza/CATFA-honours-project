"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Upload, ZoomIn, ZoomOut, RotateCw, StickyNote, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function MaltegoUploader() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [imageCaption, setImageCaption] = useState("")
  const [nodeNotes, setNodeNotes] = useState("")
  const [zoom, setZoom] = useState(100)
  const { toast } = useToast()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"]
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload PNG, JPG, or SVG files only.",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string)
      toast({
        title: "Image uploaded successfully",
        description: "Your Maltego/Gephi graph has been loaded.",
      })
    }
    reader.readAsDataURL(file)
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 50))
  const handleResetZoom = () => setZoom(100)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-accent" />
          Upload Maltego CE / Gephi Graph
        </CardTitle>
        <CardDescription>
          Upload exported images of Maltego/Gephi graphs for visualization and annotation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Section */}
        <div className="space-y-2">
          <Label htmlFor="graph-upload">Upload Maltego CE graph (image or PNG export of nodes)</Label>
          <Input
            id="graph-upload"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/svg+xml"
            onChange={handleFileUpload}
            aria-label="Upload Maltego or Gephi graph image"
          />
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
          <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Upload only exported images of Maltego/Gephi graphs. This uploader does NOT connect
            to external tools or perform any automated analysis — it only stores and displays uploaded images for
            discussion. Educational/demo only.
          </p>
        </div>

        {/* Image Viewer */}
        {uploadedImage && (
          <div className="space-y-4">
            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                aria-label="Zoom out"
                className="bg-transparent"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                aria-label="Zoom in"
                className="bg-transparent"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetZoom}
                aria-label="Reset zoom"
                className="bg-transparent"
              >
                <RotateCw className="h-4 w-4" />
              </Button>

              {/* Add Node Notes Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-auto gap-2 bg-transparent">
                    <StickyNote className="h-4 w-4" />
                    Add node notes
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Node Annotations</DialogTitle>
                    <DialogDescription>
                      Add notes about nodes, clusters, or patterns observed in the network graph
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Example: Central node 'seller_123' connects to 5 platforms. High betweenness centrality suggests distribution hub..."
                      value={nodeNotes}
                      onChange={(e) => setNodeNotes(e.target.value)}
                      rows={8}
                      className="resize-none"
                    />
                    <Button onClick={() => toast({ title: "Notes saved", description: "Annotations stored locally" })}>
                      Save Notes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Image Display */}
            <div className="border rounded-lg overflow-auto max-h-[600px] bg-muted/20">
              <div className="p-4 flex items-center justify-center min-h-[400px]">
                <img
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded Maltego or Gephi network graph"
                  style={{ transform: `scale(${zoom / 100})`, transformOrigin: "center" }}
                  className="transition-transform duration-200"
                />
              </div>
            </div>

            {/* Caption Field */}
            <div className="space-y-2">
              <Label htmlFor="image-caption">Graph Caption</Label>
              <Input
                id="image-caption"
                placeholder="e.g., Seller network showing cross-platform connections (Jan-Mar 2025)"
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
              />
            </div>

            {/* Node Notes Display */}
            {nodeNotes && (
              <div className="p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold text-sm mb-2">Saved Annotations:</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{nodeNotes}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
