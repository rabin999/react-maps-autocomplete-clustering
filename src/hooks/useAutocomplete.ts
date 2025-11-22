import { useState, useEffect } from 'react'
import { useGoogleMapsContext } from '../context/GoogleMapsContext'

/**
 * Hook to manage Google Maps Places Autocomplete suggestions.
 * Handles debouncing, session tokens, and fetching suggestions from the Places API.
 * 
 * Documentation: https://developers.google.com/maps/documentation/javascript/place-autocomplete
 */
export const useAutocomplete = (input: string) => {
    const { isLoaded } = useGoogleMapsContext()
    const [suggestions, setSuggestions] = useState<google.maps.places.AutocompleteSuggestion[]>([])
    const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isLoaded && !sessionToken) {
            setSessionToken(new google.maps.places.AutocompleteSessionToken())
        }
    }, [isLoaded, sessionToken])

    useEffect(() => {
        const fetchSuggestions = async () => {
            const trimmedInput = input.trim()

            if (!trimmedInput || !isLoaded || !sessionToken) {
                setSuggestions([])
                return
            }

            setIsLoading(true)
            console.log('Fetching suggestions for:', trimmedInput)

            try {
                const request: any = {
                    input: trimmedInput,
                    sessionToken,
                    includedRegionCodes: ['np'],
                }

                const { suggestions } = await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(request)
                console.log('Suggestions received:', suggestions)
                setSuggestions(suggestions)
            } catch (error) {
                console.error('Error fetching suggestions:', error)
                setSuggestions([])
            } finally {
                setIsLoading(false)
            }
        }

        const debounceTimer = setTimeout(fetchSuggestions, 300)

        return () => clearTimeout(debounceTimer)
    }, [input, isLoaded, sessionToken])

    const refreshSessionToken = () => {
        if (isLoaded) {
            setSessionToken(new google.maps.places.AutocompleteSessionToken())
        }
    }

    return { suggestions, isLoading, refreshSessionToken }
}
