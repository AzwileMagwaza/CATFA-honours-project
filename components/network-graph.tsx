"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface NetworkGraphProps {
  cases: any[]
}

interface Node extends d3.SimulationNodeDatum {
  id: string
  type: "seller" | "platform"
  count?: number
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node
  target: string | Node
  value: number
}

export default function NetworkGraph({ cases }: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!svgRef.current) return

    const updateDimensions = () => {
      const container = svgRef.current?.parentElement
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: 400,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || cases.length === 0) return

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove()

    // Process data to create nodes and links
    const platformNodes = new Map<string, Node>()
    const sellerNodes = new Map<string, Node>()
    const links: Link[] = []

    cases.forEach((caseItem) => {
      const platform = caseItem.platform || "Unknown"
      const seller = caseItem.seller_username || caseItem.seller_id || "Anonymous"

      // Add platform node
      if (!platformNodes.has(platform)) {
        platformNodes.set(platform, {
          id: `platform-${platform}`,
          type: "platform",
          count: 0,
        })
      }
      platformNodes.get(platform)!.count! += 1

      // Add seller node
      if (!sellerNodes.has(seller)) {
        sellerNodes.set(seller, {
          id: `seller-${seller}`,
          type: "seller",
          count: 0,
        })
      }
      sellerNodes.get(seller)!.count! += 1

      // Add link
      const existingLink = links.find(
        (l) =>
          (l.source === `seller-${seller}` && l.target === `platform-${platform}`) ||
          (l.source === `platform-${platform}` && l.target === `seller-${seller}`),
      )
      if (existingLink) {
        existingLink.value += 1
      } else {
        links.push({
          source: `seller-${seller}`,
          target: `platform-${platform}`,
          value: 1,
        })
      }
    })

    const nodes: Node[] = [...Array.from(platformNodes.values()), ...Array.from(sellerNodes.values())]

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .attr("viewBox", [0, 0, dimensions.width, dimensions.height])

    // Add zoom behavior
    const g = svg.append("g")
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform)
      })
    svg.call(zoom as any)

    // Create force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<Node, Link>(links)
          .id((d) => d.id)
          .distance(100),
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
      .force("collision", d3.forceCollide().radius(30))

    const link = g
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#64748b")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d) => Math.max(2, Math.sqrt(d.value) * 2))

    const node = g
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => (d.type === "platform" ? 15 : 10))
      .attr("fill", (d) => {
        if (d.type === "platform") {
          return "#3b82f6" // Blue for platforms
        } else {
          return "#10b981" // Green for sellers
        }
      })
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .call(d3.drag<SVGCircleElement, Node>().on("start", dragstarted).on("drag", dragged).on("end", dragended) as any)

    // Add labels
    const label = g
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) => d.id.replace(/^(platform|seller)-/, ""))
      .attr("font-size", (d) => (d.type === "platform" ? 12 : 10))
      .attr("dx", 12)
      .attr("dy", 4)
      .attr("fill", "hsl(var(--foreground))")
      .style("pointer-events", "none")

    // Add tooltips
    node
      .append("title")
      .text(
        (d) =>
          `${d.type === "platform" ? "Platform" : "Seller"}: ${d.id.replace(/^(platform|seller)-/, "")}\nCases: ${d.count}`,
      )

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y)

      label.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y)
    })

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: any) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    return () => {
      simulation.stop()
    }
  }, [cases, dimensions])

  if (cases.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-lg">
        <p className="text-muted-foreground text-sm">No data available for network visualization</p>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <svg ref={svgRef} className="w-full border rounded-lg bg-card" />
      <div className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm border rounded-lg p-2 text-xs space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3b82f6" }} />
          <span>Platforms</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#10b981" }} />
          <span>Sellers</span>
        </div>
        <p className="text-muted-foreground pt-1">Drag nodes • Scroll to zoom</p>
      </div>
    </div>
  )
}
