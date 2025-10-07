"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet.markercluster"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"

interface GeographicMapProps {
  cases: any[]
}

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

export default function GeographicMap({ cases }: GeographicMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map
    const map = L.map(mapRef.current).setView([20, 0], 2)
    mapInstanceRef.current = map

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.MarkerClusterGroup || layer instanceof L.Marker) {
        map.removeLayer(layer)
      }
    })

    // Create marker cluster group
    const markers = L.markerClusterGroup({
      chunkedLoading: true,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    })

    // Geocoding cache for demo purposes (in production, use a real geocoding service)
    const locationCache: Record<string, [number, number]> = {
      "New York": [40.7128, -74.006],
      London: [51.5074, -0.1278],
      Paris: [48.8566, 2.3522],
      Tokyo: [35.6762, 139.6503],
      Sydney: [-33.8688, 151.2093],
      Cairo: [30.0444, 31.2357],
      Mumbai: [19.076, 72.8777],
      Beijing: [39.9042, 116.4074],
      "Mexico City": [19.4326, -99.1332],
      "São Paulo": [-23.5505, -46.6333],
      Lagos: [6.5244, 3.3792],
      Istanbul: [41.0082, 28.9784],
      Bangkok: [13.7563, 100.5018],
      Moscow: [55.7558, 37.6173],
      Berlin: [52.52, 13.405],
      Rome: [41.9028, 12.4964],
      Athens: [37.9838, 23.7275],
      Unknown: [0, 0],
    }

    // Add markers for each case
    cases.forEach((caseItem, index) => {
      const location = caseItem.seller_location || caseItem.artifact_origin || "Unknown"
      const coords = locationCache[location] || [Math.random() * 180 - 90, Math.random() * 360 - 180]

      const marker = L.marker(coords)
      marker.bindPopup(`
        <div style="min-width: 200px;">
          <h3 style="font-weight: bold; margin-bottom: 8px;">${caseItem.artifact_title || "Untitled"}</h3>
          <p style="margin: 4px 0;"><strong>Platform:</strong> ${caseItem.platform || "Unknown"}</p>
          <p style="margin: 4px 0;"><strong>Seller:</strong> ${caseItem.seller_username || "Anonymous"}</p>
          <p style="margin: 4px 0;"><strong>Location:</strong> ${location}</p>
          <p style="margin: 4px 0;"><strong>Priority:</strong> <span style="text-transform: capitalize;">${caseItem.priority || "N/A"}</span></p>
          ${caseItem.artifact_origin ? `<p style="margin: 4px 0;"><strong>Origin:</strong> ${caseItem.artifact_origin}</p>` : ""}
        </div>
      `)

      markers.addLayer(marker)
    })

    map.addLayer(markers)

    // Fit bounds to show all markers
    if (markers.getBounds().isValid()) {
      map.fitBounds(markers.getBounds(), { padding: [50, 50] })
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
      <div ref={mapRef} className="h-[400px] w-full rounded-lg border overflow-hidden" />
      <div className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm border rounded-lg p-2 text-xs z-[1000]">
        <p className="font-medium mb-1">Geographic Distribution</p>
        <p className="text-muted-foreground">{cases.length} locations plotted</p>
        <p className="text-muted-foreground text-[10px] mt-1">Click markers for details</p>
      </div>
    </div>
  )
}
