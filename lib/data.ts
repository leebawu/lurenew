import type { FishingSpot } from "./types"
import { getRandomFishSpecies } from "@/lib/utils"
import { getFishSpecies } from "@/lib/fishSpeciesUtils"

const validFishSpecies = getFishSpecies()

const today = new Date().toISOString().split("T")[0]

export const allFishingSpots: FishingSpot[] = [
  {
    id: "1",
    name: "青山湖路亚基地",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WechatIMG3412.jpg-B8bl62uIbtQQ14psQdbiYL9aAmdg56.jpeg",
    latitude: 28.67,
    longitude: 115.86,
    rating: 4.5,
    reviews: 1200,
    distance: "2.5",
    openingHours: "8:00-18:00",
    tags: ["路亚", "休闲钓场"],
    recommendedFish: [{ name: "鲈鱼" }, { name: "黑鱼" }],
    todayFish: "黑鱼",
    fishReleases: [
      { date: today, fishType: "黑鱼", weight: 35 },
      { date: today, fishType: "鲈鱼", weight: 25 },
    ],
    recentFishReleases: [
      { date: today, fishType: "黑鱼", weight: 35 },
      { date: today, fishType: "鲈鱼", weight: 25 },
    ],
    searchCount: 1000,
    regionalRanking: 1,
    anniversaryEvent: "周年庆典",
    fishSpecies: getRandomFishSpecies(Math.floor(Math.random() * 5) + 3).filter((species) =>
      validFishSpecies.includes(species),
    ),
    amenities: ["Wi-Fi", "停车场", "餐厅", "渔具租赁"],
    hasEvent: true,
  },
  {
    id: "2",
    name: "鄱阳湖钓鱼天堂",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WechatIMG3412.jpg-B8bl62uIbtQQ14psQdbiYL9aAmdg56.jpeg",
    latitude: 28.7,
    longitude: 115.9,
    rating: 4.2,
    reviews: 800,
    distance: "5.1",
    openingHours: "7:00-19:00",
    tags: ["台钓", "竞技钓场"],
    recommendedFish: [{ name: "青鱼" }, { name: "鲤鱼" }],
    todayFish: "青鱼",
    fishReleases: [
      { date: today, fishType: "青鱼", weight: 80 },
      { date: today, fishType: "鲤鱼", weight: 60 },
    ],
    recentFishReleases: [
      { date: today, fishType: "青鱼", weight: 80 },
      { date: today, fishType: "鲤鱼", weight: 60 },
    ],
    searchCount: 1200,
    regionalRanking: 3,
    fishSpecies: getRandomFishSpecies(Math.floor(Math.random() * 5) + 3).filter((species) =>
      validFishSpecies.includes(species),
    ),
    amenities: ["停车场", "餐厅", "渔具租赁", "住宿"],
    hasEvent: false,
  },
  {
    id: "3",
    name: "赣江路亚基地",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WechatIMG3412.jpg-B8bl62uIbtQQ14psQdbiYL9aAmdg56.jpeg",
    latitude: 28.65,
    longitude: 115.82,
    rating: 4.8,
    reviews: 1500,
    distance: "1.8",
    openingHours: "9:00-17:00",
    tags: ["路亚", "休闲钓场"],
    recommendedFish: [{ name: "鲈鱼" }, { name: "翘嘴" }],
    todayFish: null,
    fishReleases: [{ date: today, fishType: "鲈鱼", weight: 30 }],
    recentFishReleases: [{ date: today, fishType: "鲈鱼", weight: 30 }],
    searchCount: 800,
    regionalRanking: 2,
    fishSpecies: getRandomFishSpecies(Math.floor(Math.random() * 5) + 3).filter((species) =>
      validFishSpecies.includes(species),
    ),
    amenities: ["Wi-Fi", "停车场", "餐厅", "渔具租赁", "比赛场地"],
    hasEvent: true,
  },
  {
    id: "4",
    name: "庐山西海钓场",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WechatIMG3412.jpg-B8bl62uIbtQQ14psQdbiYL9aAmdg56.jpeg",
    latitude: 28.62,
    longitude: 115.78,
    rating: 4.0,
    reviews: 600,
    distance: "7.2",
    openingHours: "8:00-17:00",
    tags: ["筏钓", "休闲钓场"],
    recommendedFish: [{ name: "鳜鱼" }, { name: "草鱼" }],
    todayFish: null,
    fishReleases: [{ date: today, fishType: "鳜鱼", weight: 40 }],
    recentFishReleases: [{ date: today, fishType: "鳜鱼", weight: 40 }],
    searchCount: 500,
    regionalRanking: 4,
    fishSpecies: getRandomFishSpecies(Math.floor(Math.random() * 5) + 3).filter((species) =>
      validFishSpecies.includes(species),
    ),
    amenities: ["停车场", "餐厅", "渔具租赁", "住宿"],
    hasEvent: false,
  },
  {
    id: "5",
    name: "梅岭溪流钓场",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WechatIMG3412.jpg-B8bl62uIbtQQ14psQdbiYL9aAmdg56.jpeg",
    latitude: 28.75,
    longitude: 115.88,
    rating: 3.8,
    reviews: 400,
    distance: "8.9",
    openingHours: "9:00-16:00",
    tags: ["溪流钓", "休闲钓场"],
    recommendedFish: [{ name: "鲫鱼" }],
    todayFish: null,
    fishReleases: [{ date: today, fishType: "鲫鱼", weight: 20 }],
    recentFishReleases: [{ date: today, fishType: "鲫鱼", weight: 20 }],
    searchCount: 300,
    regionalRanking: 5,
    fishSpecies: getRandomFishSpecies(Math.floor(Math.random() * 5) + 3).filter((species) =>
      validFishSpecies.includes(species),
    ),
    amenities: ["停车场", "渔具租赁"],
    hasEvent: false,
  },
]

// Verify that all fishing spots have the regionalRanking property
allFishingSpots.forEach((spot, index) => {
  if (!("regionalRanking" in spot)) {
    console.warn(`Fishing spot at index ${index} (${spot.name}) is missing the regionalRanking property.`)
  }
})

