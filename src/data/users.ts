export interface User {
    id: number
    name: string
    avatar: string
    rating: number
    skills: string[]
    location: {
        lat: number
        lng: number
    }
}

const KALANKI_CENTER = { lat: 27.6939, lng: 85.2816 }

// Helper to generate random coordinates within radius (approximate)
const generateRandomLocation = (center: { lat: number; lng: number }, radiusMeters: number) => {
    const r = radiusMeters / 111300 // Convert meters to degrees
    const u = Math.random()
    const v = Math.random()
    const w = r * Math.sqrt(u)
    const t = 2 * Math.PI * v
    const x = w * Math.cos(t)
    const y = w * Math.sin(t)

    // Adjust for longitude shrinking as we move away from equator
    const newLat = center.lat + x
    const newLng = center.lng + y / Math.cos(center.lat * (Math.PI / 180))

    return { lat: newLat, lng: newLng }
}

const skillsList = ['React', 'Node.js', 'Python', 'Design', 'Marketing', 'SEO', 'Flutter', 'Go', 'Rust', 'Java']

export const users: User[] = Array.from({ length: 15 }, (_, i) => {
    const randomSkills = []
    const skillCount = Math.floor(Math.random() * 3) + 1
    for (let j = 0; j < skillCount; j++) {
        randomSkills.push(skillsList[Math.floor(Math.random() * skillsList.length)])
    }

    return {
        id: i + 1,
        name: `User ${i + 1}`,
        avatar: `https://i.pravatar.cc/150?u=${i + 1}`,
        rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
        skills: [...new Set(randomSkills)], // unique skills
        location: generateRandomLocation(KALANKI_CENTER, 1000),
    }
})
