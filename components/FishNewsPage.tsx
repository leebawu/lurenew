"use client"

import { useState, useEffect, useCallback } from "react"
import { format, parseISO } from "date-fns"
import { allFishingSpots } from "@/lib/data"
import { generateFishNews, addFishSpecies, getFishSpecies } from "@/lib/fishSpeciesUtils"
import FishingSpotDetail from "@/components/FishingSpotDetail"

interface FishNews {
  date: string
  spotId: string
  spotName: string
  fishType: string
  weight: number
  tags: string[]
  fishSpecies: string[]
}

interface GroupedFishNews {
  [date: string]: FishNews[]
}

interface FishNewsPageProps {
  selectedKeyword: string
  selectedFishSpecies: string[]
  selectedFishReleaseTime: string
}

export default function FishNewsPage({
  selectedKeyword,
  selectedFishSpecies,
  selectedFishReleaseTime,
}: FishNewsPageProps) {
  const [groupedFishNews, setGroupedFishNews] = useState<GroupedFishNews>({})
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null)

  useEffect(() => {
    const allNews = generateFishNews(allFishingSpots)
    const filteredNews = allNews.filter((news) => {
      const isKeywordMatch = selectedKeyword ? news.tags.includes(selectedKeyword) : true
      const isFishSpeciesMatch =
        selectedFishSpecies.length === 0 || selectedFishSpecies.some((species) => news.fishType === species)
      const isDateMatch = (() => {
        const newsDate = parseISO(news.date)
        const today = new Date()
        const diffDays = Math.floor((today.getTime() - newsDate.getTime()) / (1000 * 3600 * 24))

        switch (selectedFishReleaseTime) {
          case "今天":
            return diffDays === 0
          case "昨天":
            return diffDays === 1
          case "3天":
            return diffDays < 3
          case "7天":
            return diffDays < 7
          case "10天":
            return diffDays < 10
          case "30天":
            return diffDays < 30
          default:
            return true
        }
      })()

      return isKeywordMatch && isFishSpeciesMatch && isDateMatch
    })

    // 添加新的鱼种到目标鱼种列表
    filteredNews.forEach((news) => {
      if (!getFishSpecies().includes(news.fishType)) {
        addFishSpecies(news.fishType)
      }
    })

    const grouped = filteredNews.reduce((acc, news) => {
      if (!acc[news.date]) {
        acc[news.date] = []
      }
      acc[news.date].push(news)
      return acc
    }, {} as GroupedFishNews)

    setGroupedFishNews(grouped)
  }, [selectedKeyword, selectedFishSpecies, selectedFishReleaseTime])

  const handleSpotClick = useCallback((spotId: string) => {
    setSelectedSpotId((prevId) => (prevId === spotId ? null : spotId))
  }, [])

  const handleCloseDetail = useCallback(() => {
    setSelectedSpotId(null)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">钓场放鱼资讯</h1>
      {Object.entries(groupedFishNews).length > 0 ? (
        Object.entries(groupedFishNews)
          .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
          .map(([date, newsItems]) => (
            <div key={date} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{format(parseISO(date), "yyyy年MM月dd日")}</h2>
              <div className="space-y-2">
                {newsItems.map((news, index) => (
                  <div key={`${news.spotId}-${index}`}>
                    <div
                      className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => handleSpotClick(news.spotId)}
                    >
                      <p className="text-sm">
                        <span className="font-medium">{news.spotName}</span> ({news.tags.join(", ")}) - {news.fishType}{" "}
                        {news.weight}kg
                      </p>
                    </div>
                    {selectedSpotId === news.spotId && (
                      <div className="mt-2">
                        <FishingSpotDetail spotId={news.spotId} onClose={handleCloseDetail} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
      ) : (
        <p className="text-muted-foreground">没有符合条件的放鱼信息。</p>
      )}
    </div>
  )
}

