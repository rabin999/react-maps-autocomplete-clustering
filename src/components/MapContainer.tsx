import React, { useEffect, useRef, useState } from 'react'
import { MarkerClusterer, GridAlgorithm } from '@googlemaps/markerclusterer'
import { useGoogleMapsContext } from '../context/GoogleMapsContext'
import { users, User } from '../data/users'
import UserCard from './UserCard'
import Autocomplete from './Autocomplete'
import { createMarkerElement } from '../utils/markerUtils'

interface MapContainerProps {
  selectedPlace: google.maps.places.Place | null
  onPlaceSelect: (place: google.maps.places.Place) => void
}

/**
 * MapContainer Component
 * 
 * Renders the Google Map, handles marker clustering, and manages user interactions.
 * Uses AdvancedMarkerElement for custom HTML markers and MarkerClusterer for performance.
 * 
 * Documentation:
 * - Advanced Markers: https://developers.google.com/maps/documentation/javascript/advanced-markers/overview
 * - Marker Clustering: https://github.com/googlemaps/js-markerclusterer
 */
const MapContainer: React.FC<MapContainerProps> = ({ selectedPlace, onPlaceSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { mapInstance, setMapInstance } = useGoogleMapsContext()
  const [activeUser, setActiveUser] = useState<User | null>(null)
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([])
  const clustererRef = useRef<MarkerClusterer | null>(null)
  const defaultCenter = { lat: 27.6939, lng: 85.2816 } // Kalanki, Nepal

  useEffect(() => {
    if (mapRef.current && !mapInstance) {
      const map = new google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 15,
        disableDefaultUI: true,
        gestureHandling: 'greedy',
        mapId: 'DEMO_MAP_ID',
      })
      setMapInstance(map)
    }
  }, [mapRef, mapInstance, setMapInstance])

  // Handle Markers and Clustering
  useEffect(() => {
    if (!mapInstance) return

    // Cleanup existing markers and clusterer
    if (clustererRef.current) {
      clustererRef.current.clearMarkers()
      clustererRef.current = null
    }

    markersRef.current.forEach((marker) => {
      marker.map = null
    })
    markersRef.current = []

    // Create new markers for each user
    users.forEach((user) => {
      const markerContent = createMarkerElement('#4285F4')

      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: user.location,
        title: user.name,
        content: markerContent,
      })

      marker.addListener('click', () => {
        setActiveUser(user)
        mapInstance.panTo(user.location)
      })

      markersRef.current.push(marker)
    })

    // Initialize MarkerClusterer with GridAlgorithm for performance
    clustererRef.current = new MarkerClusterer({
      map: mapInstance,
      markers: markersRef.current,
      algorithm: new GridAlgorithm({})
    })

    return () => {
      if (clustererRef.current) {
        clustererRef.current.clearMarkers()
        clustererRef.current = null
      }
      markersRef.current.forEach((marker) => {
        marker.map = null
      })
    }
  }, [mapInstance])

  // Handle Place Selection from Autocomplete
  useEffect(() => {
    if (selectedPlace && selectedPlace.location && mapInstance) {
      mapInstance.panTo(selectedPlace.location)
      mapInstance.setZoom(15)
    }
  }, [selectedPlace, mapInstance])

  const handleAutocompleteSelect = React.useCallback((place: google.maps.places.Place) => {
    onPlaceSelect(place)
    setActiveUser(null)
  }, [onPlaceSelect])

  return (
    <div className="map-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapRef} className="google-map" style={{ width: '100%', height: '100%' }} />

      <Autocomplete
        onPlaceSelect={handleAutocompleteSelect}
        position="top-center"
      />

      {activeUser && (
        <UserCard
          user={activeUser}
          onClose={() => setActiveUser(null)}
        />
      )}

      {/* Fixed center marker for visual reference */}
      <div className="fixed-marker" style={{ pointerEvents: 'none', filter: 'drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.3))' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 45" width="30" height="45">
          <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 30 15 30s15-21.716 15-30c0-8.284-6.716-15-15-15z" fill="#00c9ea" />
          <circle cx="15" cy="15" r="6" fill="white" opacity="0.9" />
        </svg>
      </div>
    </div>
  )
}

export default React.memo(MapContainer)
