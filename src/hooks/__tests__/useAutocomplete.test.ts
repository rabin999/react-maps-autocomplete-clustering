import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAutocomplete } from '../useAutocomplete'

// Mock useGoogleMapsContext
const mockIsLoaded = true
vi.mock('../../context/GoogleMapsContext', () => ({
    useGoogleMapsContext: () => ({
        isLoaded: mockIsLoaded,
    }),
}))

describe('useAutocomplete', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return empty suggestions initially', () => {
        const { result } = renderHook(() => useAutocomplete(''))
        expect(result.current.suggestions).toEqual([])
        expect(result.current.isLoading).toBe(false)
    })

    it('should fetch suggestions when input is provided', async () => {
        const mockSuggestions = [{ placePrediction: { placeId: '123', text: 'Test Place' } }];
        (window.google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions as any).mockResolvedValue({
            suggestions: mockSuggestions,
        })

        const { result } = renderHook(() => useAutocomplete('Test'))

        await waitFor(() => {
            expect(result.current.suggestions).toEqual(mockSuggestions)
        })
    })

    it('should handle errors gracefully', async () => {
        (window.google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions as any).mockRejectedValue(new Error('API Error'))

        const { result } = renderHook(() => useAutocomplete('Test'))

        await waitFor(() => {
            expect(result.current.suggestions).toEqual([])
            expect(result.current.isLoading).toBe(false)
        })
    })
})
