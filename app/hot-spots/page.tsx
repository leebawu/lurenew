"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import SpotHeader from "@/components/spot-detail/SpotHeader"
import SpotRatings from "@/components/spot-detail/SpotRatings"
import SpotTabs from "@/components/spot-detail/SpotTabs"
import RecommendedFish from "@/components/spot-detail/RecommendedFish"
import ReviewsList from "@/components/spot-detail/ReviewsList"
import SpotActions from "@/components/spot-detail/SpotActions"

// Mock data for fishing spots
const allFishingSpots = [
  {
    id: "1",
    name: "青山湖路亚基地",
    image: "/placeholder.svg?height=256&width=512",
    rating: 4.7,
    reviews: 299,
    pricePerPerson: 150,
    category: "湖钓",
    location: "南昌市",
    searchCount: 1500,
    tags: ["路亚", "黑鱼", "翘嘴"],
    openingTime: "全天开放",
    todayFish: "草鱼",
    regionalRanking: 1,
    recommendedFish: [
      { name: "黑鱼", recommendations: 54 },
      { name: "翘嘴", recommendations: 42 },
      { name: "鲈鱼", recommendations: 33 },
    ],
  },
  {
    id: "2",
    name: "鄱阳湖钓鱼天堂",
    image: "/placeholder.svg?height=256&width=512",
    rating: 4.5,
    reviews: 187,
    pricePerPerson: 100,
    category: "湖钓",
    location: "九江市",
    searchCount: 1200,
    tags: ["路亚", "青鱼", "鲢鳙"],
    openingTime: "5:00-22:00",
    todayFish: "青鱼",
    regionalRanking: 2,
    recommendedFish: [
      { name: "青鱼", recommendations: 48 },
      { name: "鲢鱼", recommendations: 39 },
      { name: "鳙鱼", recommendations: 35 },
    ],
  },
  // Add more fishing spots as needed...
]

// Calculate the score for each fishing spot
const calculateScore = (spot: any) => {
  return (spot.searchCount / 1500) * 0.6 + (spot.reviews / 300) * 0.3 + (spot.rating / 5) * 0.1
}

export default function HotSpots() {
  const [hotSpots, setHotSpots] = useState<any[]>([])
  const [selectedSpot, setSelectedSpot] = useState<any>(null)

  useEffect(() => {
    // Sort fishing spots based on the calculated score
    const sortedSpots = allFishingSpots
      .map((spot) => ({ ...spot, score: calculateScore(spot) }))
      .sort((a, b) => b.score - a.score)
    setHotSpots(sortedSpots)
    setSelectedSpot(sortedSpots[0]) // Set the first spot as the selected one
  }, [])

  if (!selectedSpot) {
    return <div className="flex justify-center items-center h-screen">加载中...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <Header />
      <div className="pt-12">
        <h1 className="text-xl font-bold px-4 py-2">热门钓场</h1>
        <div className="flex overflow-x-auto scrollbar-hide p-4 space-x-4">
          {hotSpots.map((spot, index) => (
            <button
              key={spot.id}
              className={`flex-shrink-0 px-4 py-2 rounded-full ${
                selectedSpot.id === spot.id ? "bg-blue-500 text-white" : "bg-white text-gray-800"
              }`}
              onClick={() => setSelectedSpot(spot)}
            >
              {index + 1}. {spot.name}
            </button>
          ))}
        </div>
        <SpotHeader
          name={selectedSpot.name}
          rating={selectedSpot.rating}
          reviews={selectedSpot.reviews}
          pricePerPerson={selectedSpot.pricePerPerson}
          category={selectedSpot.category}
          location={selectedSpot.location}
        />
        <SpotRatings />
        <div className="bg-white mt-2 px-4 py-3">
          <div className="flex items-center gap-2 text-blue-500 bg-blue-50 px-3 py-2 rounded-lg">
            <span className="text-sm font-medium">
              {selectedSpot.location}钓场热度排名第{hotSpots.findIndex((spot) => spot.id === selectedSpot.id) + 1}名
              &gt;
            </span>
          </div>
        </div>
        <SpotTabs />
        <RecommendedFish items={selectedSpot.recommendedFish} />
        <ReviewsList />
        <SpotActions />
      </div>
    </div>
  )
}

