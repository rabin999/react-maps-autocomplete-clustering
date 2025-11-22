import { useEffect, useState } from 'react'
import { importLibrary, setOptions } from '@googlemaps/js-api-loader'

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization" | "marker")[] = ['places', 'marker']

/**
 * Hook to load the Google Maps JavaScript API.
 * Ensures the API is loaded only once and provides the loading state.
 * 
 * Documentation: https://developers.google.com/maps/documentation/javascript/overview
 */
export const useGoogleMaps = (apiKey: string) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [loadError, setLoadError] = useState<Error | null>(null)

    useEffect(() => {
        const initMap = async () => {
            try {
                // Prevent multiple initializations
                if (!(window as any).googleMapsOptionsSet) {
                    setOptions({
                        key: apiKey,
                        v: "weekly",
                        libraries,
                    });
                    (window as any).googleMapsOptionsSet = true
                }

                // Load the libraries
                await importLibrary('maps')
                await importLibrary('places')
                await importLibrary('marker')

                setIsLoaded(true)
            } catch (e) {
                setLoadError(e as Error)
            }
        }

        initMap()
    }, [apiKey])

    return { isLoaded, loadError }
}
