"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import Header from "@/components/Header"
import Categories from "@/components/Categories"
import FishingSpotCard from "@/components/FishingSpotCard"
import FishingSpotDetail from "@/components/FishingSpotDetail"
import WeChatShare from "@/components/WeChatShare"
import { getFishingSpots } from "@/lib/api"
import { TooltipProvider } from "@/components/ui/tooltip"
import FishNewsPage from "@/components/FishNewsPage"
import type { FishingSpot } from "@/lib/types"

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedKeyword, setSelectedKeyword] = useState<string>("")
  const [selectedFishSpecies, setSelectedFishSpecies] = useState<string[]>([])
  const [selectedFishReleaseTime, setSelectedFishReleaseTime] = useState("")
  const [allSpots, setAllSpots] = useState<FishingSpot[]>([])
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadFishingSpots() {
      try {
        setIsLoading(true)
        const spots = await getFishingSpots()
        setAllSpots(spots)
      } catch (err) {
        setError("Failed to load fishing spots")
      } finally {
        setIsLoading(false)
      }
    }
    loadFishingSpots()
  }, [])

  const calculateComprehensiveScore = useCallback((spot: FishingSpot) => {
    const ratingScore = (spot.rating || 0) * 0.5
    const reviewScore = Math.min((spot.reviews || 0) / 1000, 1) * 0.3
    const distanceScore = Math.max(0, 1 - (Number.parseFloat(spot.distance) || 0) / 10) * 0.2
    return ratingScore + reviewScore + distanceScore
  }, [])

  const calculateHotSpotScore = useCallback((spot: FishingSpot) => {
    const searchScore = ((spot.searchCount || 0) / 1000) * 0.4
    const recentFishReleaseScore =
      (spot.fishReleases || []).filter((release) => {
        const releaseDate = new Date(release.date)
        const today = new Date()
        const diffDays = Math.floor((today.getTime() - releaseDate.getTime()) / (1000 * 3600 * 24))
        return diffDays <= 10
      }).length * 0.2
    const hotSpotReviewScore = ((spot.reviews || 0) / 1000) * 0.2
    const ratingScore = (spot.rating || 0) * 0.2
    return searchScore + recentFishReleaseScore + hotSpotReviewScore + ratingScore
  }, [])

  const displayedSpots = useMemo(() => {
    let filteredSpots = allSpots.filter((spot) => {
      const keywordMatch = !selectedKeyword || (spot.tags || []).includes(selectedKeyword)
      const fishSpeciesMatch =
        selectedFishSpecies.length === 0 || selectedFishSpecies.every((species) => spot.fishSpecies.includes(species))
      const fishReleaseTimeMatch =
        !selectedFishReleaseTime ||
        (spot.fishReleases || []).some((release) => {
          const releaseDate = new Date(release.date)
          const today = new Date()
          const diffDays = Math.floor((today.getTime() - releaseDate.getTime()) / (1000 * 3600 * 24))
          switch (selectedFishReleaseTime) {
            case "今天":
              return diffDays === 0
            case "昨天":
              return diffDays === 1
            case "3天":
              return diffDays <= 3
            case "7天":
              return diffDays <= 7
            case "10天":
              return diffDays <= 10
            case "30天":
              return diffDays <= 30
            default:
              return true
          }
        })
      return keywordMatch && fishSpeciesMatch && fishReleaseTimeMatch
    })

    // 应用基于选定类别的排序
    if (selectedCategories.includes("综合推荐")) {
      filteredSpots.sort((a, b) => calculateComprehensiveScore(b) - calculateComprehensiveScore(a))
    } else if (selectedCategories.includes("热门钓场")) {
      filteredSpots.sort((a, b) => calculateHotSpotScore(b) - calculateHotSpotScore(a))
    } else if (selectedCategories.includes("附近 5km")) {
      filteredSpots = filteredSpots.filter((spot) => Number.parseFloat(spot.distance) <= 5)
    } else if (selectedCategories.includes("钓场赛事")) {
      filteredSpots = filteredSpots.filter((spot) => spot.hasEvent)
    }

    // 添加默认的距离排序
    if (!selectedCategories.includes("综合推荐") && !selectedCategories.includes("热门钓场")) {
      filteredSpots.sort((a, b) => Number.parseFloat(a.distance) - Number.parseFloat(b.distance))
    }

    return filteredSpots
  }, [
    allSpots,
    selectedKeyword,
    selectedFishSpecies,
    selectedFishReleaseTime,
    selectedCategories,
    calculateComprehensiveScore,
    calculateHotSpotScore,
  ])

  const handleSelectCategory = useCallback((category: string) => {
    setSelectedSpotId(null) // Reset selected spot when a category is selected
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        const recommendedOptions = ["附近 5km", "综合推荐", "热门钓场", "钓场赛事", "鱼讯"]
        if (recommendedOptions.includes(category)) {
          return [category]
        }
        return [...prev, category]
      }
    })
  }, [])

  const handleSelectKeyword = (keyword: string) => {
    setSelectedSpotId(null)
    setSelectedKeyword(keyword === selectedKeyword ? "" : keyword)
  }

  const handleSelectFishSpecies = (species: string) => {
    setSelectedSpotId(null)
    setSelectedFishSpecies((prev) => (prev.includes(species) ? prev.filter((s) => s !== species) : [...prev, species]))
  }

  const handleSelectFishReleaseTime = (time: string) => {
    setSelectedSpotId(null)
    setSelectedFishReleaseTime((prev) => (prev === time ? "" : time))
  }

  const handleSpotClick = useCallback((spotId: string) => {
    setSelectedSpotId(spotId)
  }, [])

  const handleCloseDetail = useCallback(() => {
    setSelectedSpotId(null)
  }, [])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-100 pb-safe-area-inset-bottom">
        <WeChatShare
          title="路亚钓场评分"
          desc="发现周边优质钓场，分享钓鱼体验"
          link="https://your-domain.com"
          imgUrl="https://your-domain.com/share-image.jpg"
        />

        <Header />

        <div className="pt-16">
          <Categories
            selectedCategories={selectedCategories}
            onSelectCategory={handleSelectCategory}
            selectedKeyword={selectedKeyword}
            onSelectKeyword={handleSelectKeyword}
            selectedFishSpecies={selectedFishSpecies}
            onSelectFishSpecies={handleSelectFishSpecies}
            selectedFishReleaseTime={selectedFishReleaseTime}
            onSelectFishReleaseTime={handleSelectFishReleaseTime}
          />

          <div className="bg-white mt-2">
            {selectedCategories.includes("鱼讯") ? (
              <FishNewsPage
                selectedKeyword={selectedKeyword}
                selectedFishSpecies={selectedFishSpecies}
                selectedFishReleaseTime={selectedFishReleaseTime}
                onSpotClick={handleSpotClick}
              />
            ) : (
              <>
                {selectedSpotId ? (
                  <FishingSpotDetail spotId={selectedSpotId} />
                ) : displayedSpots.length > 0 ? (
                  displayedSpots.map((spot) => (
                    <FishingSpotCard
                      key={spot.id}
                      {...spot}
                      isToday={spot.fishReleases.some((release) => release.date === today)}
                      onClick={() => handleSpotClick(spot.id)}
                      matchedFishSpecies={selectedFishSpecies.filter((species) => spot.fishSpecies.includes(species))}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 px-4 py-2">没有找到完全匹配所有选择条件的钓场。请尝试减少筛选条件。</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

