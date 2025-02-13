"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import FishingSpotCard from "@/components/FishingSpotCard"

// 模拟获取用户位置的函数
const getUserLocation = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        latitude: 28.682, // 南昌市的大致纬度
        longitude: 115.8579, // 南昌市的大致经度
      })
    }, 1000)
  })
}

// 计算两点之间的距离（使用 Haversine 公式）
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371 // 地球半径（单位：公里）
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// 模拟钓场数据
const allFishingSpots = [
  {
    id: "1",
    name: "青山湖路亚基地",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
    reviews: 299,
    pricePerPerson: 150,
    category: "湖钓",
    location: "南昌市",
    latitude: 28.6889,
    longitude: 115.955,
    tags: ["路亚", "黑鱼", "翘嘴"],
    openingTime: "全天开放",
    todayFish: "草鱼",
    regionalRanking: 1,
    searchCount: 1500,
    coupon: {
      price: 50,
      condition: "200元代金券",
    },
  },
  {
    id: "2",
    name: "象湖垂钓中心",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.5,
    reviews: 187,
    pricePerPerson: 100,
    category: "湖钓",
    location: "南昌市",
    latitude: 28.67,
    longitude: 115.89,
    tags: ["传统钓", "鲫鱼", "鲤鱼"],
    openingTime: "5:00-22:00",
    anniversary: "3周年庆",
    searchCount: 1200,
    discount: {
      price: 80,
      originalPrice: 100,
      description: "单人全天畅钓套餐",
    },
  },
  {
    id: "3",
    name: "赣江路亚基地",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.6,
    reviews: 220,
    pricePerPerson: 120,
    category: "江钓",
    location: "南昌市",
    latitude: 28.6558,
    longitude: 115.8286,
    tags: ["路亚", "鲈鱼", "翘嘴"],
    openingTime: "6:00-20:00",
    searchCount: 1000,
    coupon: {
      price: 30,
      condition: "150元代金券",
    },
  },
  // 可以继续添加更多钓场...
]

// 计算综合得分
const calculateScore = (spot: any, userLat: number, userLon: number, searchTerm = "") => {
  const distance = calculateDistance(userLat, userLon, spot.latitude, spot.longitude)
  const ratingScore = spot.rating * 0.4
  const reviewScore = (spot.reviews / 1000) * 0.15 // 假设1000条评论为满分
  const searchScore = (spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0) * 0.2
  const distanceScore = (1 - Math.min(distance, 50) / 50) * 0.25 // 假设50公里为最远距离

  return ratingScore + reviewScore + searchScore + distanceScore
}

export default function RecommendedSpots() {
  const [recommendedSpots, setRecommendedSpots] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchRecommendedSpots = async () => {
      try {
        const userLocation = await getUserLocation()
        const spotsWithScores = allFishingSpots
          .map((spot) => {
            const score = calculateScore(spot, userLocation.latitude, userLocation.longitude, searchTerm)
            const distance = calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              spot.latitude,
              spot.longitude,
            )
            return { ...spot, score, distance: distance.toFixed(1) }
          })
          .sort((a, b) => b.score - a.score)

        setRecommendedSpots(spotsWithScores)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching recommended spots:", error)
        setLoading(false)
      }
    }

    fetchRecommendedSpots()
  }, [searchTerm])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">加载中...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-safe-area-inset-bottom">
      <Header />
      <div className="pt-12">
        <h1 className="text-xl font-bold px-4 py-2">综合推荐钓场</h1>
        <div className="px-4 py-2">
          <input
            type="text"
            placeholder="搜索钓场"
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="bg-white mt-2">
          {recommendedSpots.map((spot) => (
            <FishingSpotCard key={spot.id} {...spot} distance={`${spot.distance}km`} />
          ))}
        </div>
      </div>
    </div>
  )
}

