import { render } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MapContainer from '../MapContainer'

// Mock useGoogleMapsContext
const mockSetMapInstance = vi.fn()

vi.mock('../../context/GoogleMapsContext', () => ({
    useGoogleMapsContext: () => ({
        mapInstance: null,
        setMapInstance: mockSetMapInstance,
    }),
}))

describe('MapContainer', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('initializes map on mount', () => {
        render(<MapContainer selectedPlace={null} />)
        // Map is instantiated and setMapInstance is called with the new map
        expect(mockSetMapInstance).toHaveBeenCalled()
    })

    it('does not crash when selectedPlace is provided', () => {
        const selectedPlace = {
            location: { lat: 10, lng: 10 },
        } as any

        // This test just ensures the component renders without errors
        // The actual pan/zoom behavior would require a more complex setup
        // with a real mapInstance in the context
        expect(() => render(<MapContainer selectedPlace={selectedPlace} />)).not.toThrow()
    })
})
