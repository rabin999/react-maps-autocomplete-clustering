import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Google Maps API
class MockPlacesService {
    getDetails = vi.fn();
}

class MockPlace {
    fetchFields = vi.fn();
}

class MockMap {
    setCenter = vi.fn();
    setZoom = vi.fn();
    panTo = vi.fn();
}

const google = {
    maps: {
        places: {
            AutocompleteService: class { },
            PlacesService: MockPlacesService,
            AutocompleteSessionToken: class { },
            AutocompleteSuggestion: {
                fetchAutocompleteSuggestions: vi.fn(),
            },
            Place: MockPlace,
        },
        Map: MockMap,
        LatLng: class { },
    },
};

(global as any).window = (global as any).window || {};
(global as any).window.google = google

// Mock @googlemaps/js-api-loader
vi.mock('@googlemaps/js-api-loader', () => ({
    importLibrary: vi.fn().mockResolvedValue({}),
    setOptions: vi.fn(),
}))
