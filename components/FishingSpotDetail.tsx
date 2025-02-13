"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Star, MapPin, Phone, Trophy, Umbrella, Target, Sailboat, Wind, ChevronRight } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { getFishingSpotById } from "@/lib/api"
import type { FishingSpot } from "@/lib/types"
import ErrorBoundary from "@/components/ErrorBoundary"

interface FishingSpotDetailProps {
  spotId: string
}

const getSpotTypeInfo = (tag: string) => {
  switch (tag) {
    case "休闲钓场":
      return { icon: Umbrella, color: "text-green-500", bgColor: "bg-green-100", borderColor: "border-green-500" }
    case "竞技钓场":
      return { icon: Target, color: "text-blue-500", bgColor: "bg-blue-100", borderColor: "border-blue-500" }
    case "船钓场":
      return { icon: Sailboat, color: "text-yellow-500", bgColor: "bg-yellow-100", borderColor: "border-yellow-500" }
    case "溪流钓场":
      return { icon: Wind, color: "text-purple-500", bgColor: "bg-purple-100", borderColor: "border-purple-500" }
    default:
      return null
  }
}

export default function FishingSpotDetail({ spotId }: FishingSpotDetailProps) {
  const [spot, setSpot] = useState<FishingSpot | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function loadSpotData() {
      try {
        setIsLoading(true)
        const data = await getFishingSpotById(spotId)
        if (data) {
          setSpot(data)
        } else {
          setError("未能找到钓场数据")
        }
      } catch (err) {
        setError("加载钓场数据时出错")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadSpotData()
  }, [spotId])

  const handlePhoneClick = () => {
    window.location.href = "tel:+8613800138000" // Replace with actual phone number
  }

  const spotTypes = spot?.tags
    ? ["休闲钓场", "竞技钓场", "船钓场", "溪流钓场"].filter((type) => spot?.tags.includes(type))
    : []

  if (!spot) {
    return <div className="flex justify-center items-center h-screen">加载中...</div>
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  return (
    <ErrorBoundary fallback={<div className="text-red-500 text-center">加载钓场详情时出错。请稍后再试。</div>}>
      <div className="min-h-screen bg-gray-50">
        <div className="pt-4 pb-6">
          {/* Basic Info */}
          <div className="bg-white p-6 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold">{spot?.name}</h1>
              {spotTypes.map((type) => {
                const typeInfo = getSpotTypeInfo(type)
                if (typeInfo) {
                  return (
                    <div
                      key={type}
                      className={`inline-flex items-center border ${typeInfo.borderColor} rounded-full px-3 py-1`}
                    >
                      <typeInfo.icon className={`w-4 h-4 ${typeInfo.color} mr-1 stroke-2`} />
                      <span className={`text-xs ${typeInfo.color}`}>{type}</span>
                    </div>
                  )
                }
                return null
              })}
              {spot?.anniversaryEvent && (
                <div className="inline-flex items-center border border-red-500 rounded-full px-3 py-1">
                  <Trophy className="w-4 h-4 text-red-500 mr-1 stroke-2" />
                  <span className="text-xs text-red-500">周年庆</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold ml-1">{spot?.rating}</span>
              </div>
              <span className="text-gray-500">{spot?.reviews || 0} 条点评</span>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">鱼口</span>
                  <span className="font-medium">{spot?.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">环境</span>
                  <span className="font-medium">{spot?.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">服务</span>
                  <span className="font-medium">{spot?.rating}</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="border-t pt-6">
              <h3 className="font-medium mb-3">地址位置</h3>
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                  <div>
                    <div className="font-medium">{spot?.distance}km</div>
                    <div className="text-gray-600">距双营路与清苑路交叉口 130m</div>
                  </div>
                </div>
                <button
                  onClick={handlePhoneClick}
                  className="inline-flex items-center border border-gray-300 rounded-full px-3 py-1 ml-2"
                >
                  <Phone className="w-4 h-4 text-gray-500 stroke-2" />
                </button>
              </div>
            </div>

            {/* Rankings */}
            {spot?.regionalRanking && (
              <div className="border border-orange-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Trophy className="w-5 h-5 text-orange-500 mr-2 stroke-2" />
                    <span className="text-orange-700">区域钓场排名：第 {spot?.regionalRanking} 名</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-orange-400" />
                </div>
              </div>
            )}

            {/* Tips Section */}
            <div className="border-t pt-6">
              <h3 className="font-medium mb-3 flex items-center justify-between">
                <span>必读攻略</span>
                <div className="inline-flex items-center border border-orange-500 rounded-full px-3 py-1">
                  <span className="text-xs text-orange-500">小贴士</span>
                </div>
              </h3>
              <div className="text-gray-600 space-y-2">
                <p>• 建议提前在线预约</p>
                <p>• 周末人流量较大，请合理安排时间</p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium mb-1">营业时间</div>
                  <div className="text-gray-600">{spot?.openingHours}</div>
                </div>
                <div className="inline-flex items-center border border-green-500 rounded-full px-3 py-1">
                  <span className="text-xs text-green-500">营业中</span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="border-t pt-6">
              <h3 className="font-medium mb-3">钓场设施</h3>
              <div className="flex flex-wrap gap-2">
                {spot?.amenities.map((amenity, index) => (
                  <div key={index} className="inline-flex items-center border border-gray-300 rounded-full px-3 py-1">
                    {amenity === "Wi-Fi" && <Umbrella className="w-4 h-4 text-gray-500 mr-1 stroke-2" />}
                    <span className="text-xs text-gray-500">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fish Species */}
            <div className="border-t pt-6">
              <h3 className="font-medium mb-3">钓场鱼种</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {spot?.fishSpecies.map((species, index) => (
                  <span key={index} className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {species}
                  </span>
                ))}
              </div>
              <h4 className="font-medium mb-2">最近放鱼记录</h4>
              <div className="space-y-2">
                {spot?.recentFishReleases.map((release, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{release.fishType}</span>
                    <span>{release.weight}kg</span>
                    <span className="text-gray-500 text-sm">{release.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Promotions */}
            <div className="border-t pt-6">
              <h3 className="font-medium mb-3">优惠</h3>
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium mb-1">95 代 100 元代金券</h4>
                    <p className="text-sm text-gray-500">周一至周日全天可用｜可自提｜不限张数｜包间除外</p>
                  </div>
                  <Button>抢购</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

