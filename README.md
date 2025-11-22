# Google Maps Advanced Markers & Autocomplete (React + Vite)

A modern, high-performance implementation of Google Maps in React, featuring **Advanced Markers**, **Marker Clustering**, and **Places Autocomplete**. This project demonstrates how to build a responsive, interactive map application using the latest Google Maps JavaScript API features without heavy third-party wrappers.

## 🚀 Features

*   **Advanced Markers**: Uses `google.maps.marker.AdvancedMarkerElement` for high-performance, customizable HTML markers.
*   **Marker Clustering**: Implements `@googlemaps/markerclusterer` with `GridAlgorithm` to efficiently handle large datasets.
*   **Places Autocomplete**: Custom hook-based implementation of the Places Autocomplete Service with session token management and debouncing.
*   **Custom SVG Pins**: sleek, modern SVG markers with drop shadows and dynamic colors.
*   **Interactive User Cards**: Clickable markers that open a responsive, compact user details card.
*   **Performance Optimized**: Memoized components, efficient marker management, and optimized rendering.
*   **TypeScript**: Fully typed codebase for robustness and maintainability.
*   **Vite**: Blazing fast development server and build tool.

## 🛠️ Tech Stack

*   **React 19**
*   **TypeScript**
*   **Vite**
*   **@googlemaps/js-api-loader**: For dynamic loading of the Maps API.
*   **@googlemaps/markerclusterer**: For efficient marker clustering.
*   **Vitest & React Testing Library**: For comprehensive unit and integration testing.

## 📦 Dependencies

```json
"dependencies": {
  "@googlemaps/js-api-loader": "^1.16.2",
  "@googlemaps/markerclusterer": "^2.5.3",
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   A Google Maps API Key with the following APIs enabled:
    *   Maps JavaScript API
    *   Places API

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/rabin999/react-maps-autocomplete-clustering.git
    cd react-maps-autocomplete-clustering
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── MapContainer.tsx    # Main map component with clustering logic
│   ├── Autocomplete.tsx    # Search bar with suggestions
│   ├── UserCard.tsx        # Compact user details card
│   └── ...
├── context/
│   └── GoogleMapsContext.tsx # Context for global map state
├── hooks/
│   ├── useGoogleMaps.ts    # Hook to load Maps API
│   └── useAutocomplete.ts  # Hook for Places Autocomplete logic
├── utils/
│   └── markerUtils.ts      # Custom marker SVG generator
├── data/
│   └── users.ts            # Mock user data generator
└── ...
```

## ⚡ Optimizations Implemented

1.  **GridAlgorithm Clustering**: We use the `GridAlgorithm` for the marker clusterer, which is significantly faster than the default algorithm for large datasets.
2.  **AdvancedMarkerElement**: Replaced the deprecated `google.maps.Marker` with the new `AdvancedMarkerElement` for better performance and customization capabilities.
3.  **Debounced Search**: The autocomplete input is debounced (300ms) to minimize API calls and costs.
4.  **Session Tokens**: Implemented `AutocompleteSessionToken` to group autocomplete query phases into a single session for billing optimization.
5.  **Lazy Loading**: The Google Maps API is loaded asynchronously only when needed using `@googlemaps/js-api-loader`.

## 📚 Official Documentation References

*   [Maps JavaScript API Overview](https://developers.google.com/maps/documentation/javascript/overview)
*   [Advanced Markers](https://developers.google.com/maps/documentation/javascript/advanced-markers/overview)
*   [Marker Clustering](https://github.com/googlemaps/js-markerclusterer)
*   [Places Autocomplete Service](https://developers.google.com/maps/documentation/javascript/place-autocomplete)

## 🧪 Running Tests

This project uses Vitest for testing.

```bash
npm test
```

---

*Built with ❤️ using React and Google Maps Platform.*
