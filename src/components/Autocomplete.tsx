import React, { useState } from 'react'
import { useAutocomplete } from '../hooks/useAutocomplete'
import { useGoogleMapsContext } from '../context/GoogleMapsContext'
import './Autocomplete.css'

export type AutocompletePosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'

interface AutocompleteProps {
    onPlaceSelect: (place: google.maps.places.Place) => void
    position?: AutocompletePosition
}

const Autocomplete: React.FC<AutocompleteProps> = ({ onPlaceSelect, position }) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { suggestions, isLoading, refreshSessionToken } = useAutocomplete(inputValue)
    const { isLoaded } = useGoogleMapsContext()

    const handleSelect = async (suggestion: google.maps.places.AutocompleteSuggestion) => {
        setInputValue(suggestion.placePrediction?.text.toString() || '')
        setIsOpen(false)

        if (!suggestion.placePrediction || !isLoaded) return

        try {
            const place = suggestion.placePrediction.toPlace() // Efficient way to get Place instance

            // Fetch details
            await place.fetchFields({
                fields: ['displayName', 'formattedAddress', 'location'],
            })

            onPlaceSelect(place)
            refreshSessionToken()
        } catch (error) {
            console.error('Error fetching place details:', error)
        }
    }

    const containerClass = position ? `autocomplete-wrapper ${position}` : 'autocomplete-container'

    return (
        <div className={containerClass}>
            <div className="autocomplete-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                        setIsOpen(true)
                    }}
                    placeholder="Search for a place..."
                    className="autocomplete-input"
                />
                {isLoading && <div className="loading-indicator">Searching...</div>}
                {!isLoading && isOpen && suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion) => (
                            <li
                                key={suggestion.placePrediction?.placeId}
                                onClick={() => handleSelect(suggestion)}
                                className="suggestion-item"
                            >
                                <span className="main-text">{suggestion.placePrediction?.mainText?.toString() || ''}</span>
                                <span className="secondary-text">{suggestion.placePrediction?.secondaryText?.toString() || ''}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default React.memo(Autocomplete)
