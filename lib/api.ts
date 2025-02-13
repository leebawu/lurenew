import type { FishingSpot, Event, FishSpecies } from "./types"
import { allFishingSpots } from "./data"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com"

export async function getFishingSpots(): Promise<FishingSpot[]> {
  // 使用模拟数据
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allFishingSpots)
    }, 1000)
  })
}

export async function getFishingSpotById(id: string): Promise<FishingSpot | null> {
  try {
    // 使用模拟数据
    return new Promise((resolve) => {
      setTimeout(() => {
        const spot = allFishingSpots.find((spot) => spot.id === id)
        resolve(spot || null)
      }, 1000)
    })
  } catch (error) {
    console.error("Error fetching fishing spot:", error)
    return null
  }
}

export async function getEventById(id: string): Promise<Event> {
  // 模拟 API 调用
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "1",
        title: "2025年春季路亚钓鱼大赛",
        date: "2025年4月15日",
        time: "08:00 - 17:00",
        location: "青山湖路亚基地",
        participants: 75,
        maxParticipants: 100,
        description:
          "欢迎参加2025年春季路亚钓鱼大赛！这是一个绝佳的机会展示您的钓鱼技巧，结识志同道合的钓友，并有机会赢得丰厚奖品。比赛将在风景优美的青山湖路亚基地举行，为期一天。",
        image: "/placeholder.svg",
        organizer: {
          name: "钓鱼爱好者协会",
          avatar: "/placeholder.svg",
        },
        prizes: ["冠军: ¥5000 + 高端路亚套装", "亚军: ¥3000 + 中端路亚套装", "季军: ¥1000 + 入门路亚套装"],
      })
    }, 1000)
  })
}

// 新增：获取所有鱼种
export async function getAllFishSpecies(): Promise<FishSpecies[]> {
  // 模拟 API 调用
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "1", name: "鲤鱼" },
        { id: "2", name: "鲫鱼" },
        { id: "3", name: "草鱼" },
        { id: "4", name: "鲈鱼" },
        { id: "5", name: "黑鱼" },
        // ... 其他鱼种
      ])
    }, 1000)
  })
}

