export interface FishingSpot {
  id: string
  name: string
  image: string
  latitude: number
  longitude: number
  rating: number
  reviews: number
  distance: string
  openingHours: string
  tags: string[]
  recommendedFish: { name: string }[]
  todayFish: string | null
  fishReleases: { date: string; fishType: string; weight: number }[]
  searchCount: number
  regionalRanking?: number
  anniversaryEvent?: string
  fishSpecies: string[] // 改为字符串数组，而不是对象数组
  amenities: string[]
  hasEvent: boolean
  recentFishReleases: { date: string; fishType: string; weight: number }[]
}

export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  participants: number
  maxParticipants: number
  description: string
  image: string
  organizer: {
    name: string
    avatar: string
  }
  prizes: string[]
}

