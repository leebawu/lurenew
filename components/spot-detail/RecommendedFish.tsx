import type React from "react"
import { Fish } from "lucide-react"

interface FishItem {
  name: string
  recommendations: number
  icon?: React.ReactNode
}

interface RecommendedFishProps {
  items: FishItem[]
}

export default function RecommendedFish({ items }: RecommendedFishProps) {
  return (
    <div className="bg-white mt-2">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">推荐鱼种</h3>
          <span className="text-sm text-gray-500">查看全部 &gt;</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {items.map((fish) => (
            <div key={fish.name} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                {fish.icon || <Fish className="w-6 h-6 text-blue-500" />}
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">{fish.name}</div>
                <div className="text-xs text-gray-500">{fish.recommendations}人推荐</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

