import React, { useState } from 'react'
import MapContainer from './components/MapContainer'
import { GoogleMapsProvider, useGoogleMapsContext } from './context/GoogleMapsContext'
import './App.css'

const Dashboard: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.Place | null>(null)
  const { isLoaded, loadError } = useGoogleMapsContext()

  if (loadError) {
    return <div>Error loading Google Maps</div>
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>
  }

  return (
    <div className="app-container">
      <MapContainer selectedPlace={selectedPlace} onPlaceSelect={setSelectedPlace} />
    </div>
  )
}

const App: React.FC = () => {
  return (
    <GoogleMapsProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Dashboard />
    </GoogleMapsProvider>
  )
}

export default App
