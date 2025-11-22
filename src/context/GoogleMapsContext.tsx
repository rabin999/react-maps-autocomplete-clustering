import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useGoogleMaps } from '../hooks/useGoogleMaps'

interface GoogleMapsContextType {
    isLoaded: boolean
    loadError: Error | null
    mapInstance: google.maps.Map | null
    setMapInstance: (map: google.maps.Map | null) => void
}

const GoogleMapsContext = createContext<GoogleMapsContextType | undefined>(undefined)

export const GoogleMapsProvider: React.FC<{ children: ReactNode; apiKey: string }> = ({ children, apiKey }) => {
    const { isLoaded, loadError } = useGoogleMaps(apiKey)
    const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null)

    return (
        <GoogleMapsContext.Provider value={{ isLoaded, loadError, mapInstance, setMapInstance }}>
            {children}
        </GoogleMapsContext.Provider>
    )
}

export const useGoogleMapsContext = () => {
    const context = useContext(GoogleMapsContext)
    if (context === undefined) {
        throw new Error('useGoogleMapsContext must be used within a GoogleMapsProvider')
    }
    return context
}
