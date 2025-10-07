"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface GeographicMapProps {
  cases: any[]
}

const fixLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  })
}

export default function GeographicMap({ cases }: GeographicMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    fixLeafletIcons()

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      scrollWheelZoom: true,
    })
    mapInstanceRef.current = map

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current || cases.length === 0) return

    const map = mapInstanceRef.current

    markersRef.current.forEach((marker) => {
      map.removeLayer(marker)
    })
    markersRef.current = []

    const locationCache: Record<string, [number, number]> = {
      "New York": [40.7128, -74.006],
      "New York, USA": [40.7128, -74.006],
      London: [51.5074, -0.1278],
      "London, UK": [51.5074, -0.1278],
      Paris: [48.8566, 2.3522],
      "Paris, France": [48.8566, 2.3522],
      Tokyo: [35.6762, 139.6503],
      "Tokyo, Japan": [35.6762, 139.6503],
      Sydney: [-33.8688, 151.2093],
      "Sydney, Australia": [-33.8688, 151.2093],
      Cairo: [30.0444, 31.2357],
      "Cairo, Egypt": [30.0444, 31.2357],
      Mumbai: [19.076, 72.8777],
      "Mumbai, India": [19.076, 72.8777],
      Beijing: [39.9042, 116.4074],
      "Beijing, China": [39.9042, 116.4074],
      "Mexico City": [19.4326, -99.1332],
      "São Paulo": [-23.5505, -46.6333],
      Lagos: [6.5244, 3.3792],
      "Lagos, Nigeria": [6.5244, 3.3792],
      Istanbul: [41.0082, 28.9784],
      "Istanbul, Turkey": [41.0082, 28.9784],
      Bangkok: [13.7563, 100.5018],
      "Bangkok, Thailand": [13.7563, 100.5018],
      Moscow: [55.7558, 37.6173],
      "Moscow, Russia": [55.7558, 37.6173],
      Berlin: [52.52, 13.405],
      "Berlin, Germany": [52.52, 13.405],
      Rome: [41.9028, 12.4964],
      "Rome, Italy": [41.9028, 12.4964],
      Athens: [37.9838, 23.7275],
      "Athens, Greece": [37.9838, 23.7275],
      Dubai: [25.2048, 55.2708],
      "Dubai, UAE": [25.2048, 55.2708],
      Singapore: [1.3521, 103.8198],
      "Hong Kong": [22.3193, 114.1694],
      Unknown: [0, 0],
    }

    const bounds: L.LatLngBoundsExpression = []

    cases.forEach((caseItem) => {
      const location = caseItem.seller_location || caseItem.artifact_origin || "Unknown"
      let coords = locationCache[location]

      // If location not in cache, generate random coordinates
      if (!coords) {
        coords = [Math.random() * 160 - 80, Math.random() * 340 - 170] as [number, number]
      }

      const marker = L.marker(coords)
      marker.bindPopup(`
        <div style="min-width: 200px; font-family: system-ui;">
          <h3 style="font-weight: 600; margin-bottom: 8px; font-size: 14px;">${caseItem.artifact_title || "Untitled"}</h3>
          <p style="margin: 4px 0; font-size: 12px;"><strong>Platform:</strong> ${caseItem.platform || "Unknown"}</p>
          <p style="margin: 4px 0; font-size: 12px;"><strong>Seller:</strong> ${caseItem.seller_username || "Anonymous"}</p>
          <p style="margin: 4px 0; font-size: 12px;"><strong>Location:</strong> ${location}</p>
          <p style="margin: 4px 0; font-size: 12px;"><strong>Priority:</strong> <span style="text-transform: capitalize;">${caseItem.priority || "N/A"}</span></p>
          ${caseItem.artifact_origin ? `<p style="margin: 4px 0; font-size: 12px;"><strong>Origin:</strong> ${caseItem.artifact_origin}</p>` : ""}
        </div>
      `)

      marker.addTo(map)
      markersRef.current.push(marker)
      bounds.push(coords)
    })

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 })
    }
  }, [cases])

  if (cases.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-lg">
        <p className="text-muted-foreground text-sm">No location data available for mapping</p>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <div ref={mapRef} className="h-[500px] w-full rounded-lg border overflow-hidden z-0" />
      <div className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm border rounded-lg p-2 text-xs z-[1000] shadow-lg">
        <p className="font-medium mb-1">Geographic Distribution</p>
        <p className="text-muted-foreground">{cases.length} locations plotted</p>
        <p className="text-muted-foreground text-[10px] mt-1">Click markers for details</p>
      </div>
    </div>
  )
}
