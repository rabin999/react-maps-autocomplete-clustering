/**
 * Creates a custom DOM element for Google Maps AdvancedMarkerElement.
 * Uses a modern SVG pin design with a drop shadow for better UX.
 * 
 * Documentation: https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers
 */
export const createMarkerElement = (color: string = '#00c9ea') => {
    const container = document.createElement('div')
    container.style.width = '30px'
    container.style.height = '45px'
    container.style.cursor = 'pointer'
    container.style.filter = 'drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.3))'

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 45" width="100%" height="100%">
      <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 30 15 30s15-21.716 15-30c0-8.284-6.716-15-15-15z" fill="${color}"/>
      <circle cx="15" cy="15" r="6" fill="white" opacity="0.9"/>
    </svg>
  `

    container.innerHTML = svg
    return container
}
