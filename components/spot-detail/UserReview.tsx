import { Star } from "lucide-react"
import Image from "next/image"

interface UserReviewProps {
  avatar: string
  nickname: string
  level: number
  rating: number
  cost: number
  time: string
  content: string
}

export default function UserReview({ avatar, nickname, level, rating, cost, time, content }: UserReviewProps) {
  return (
    <div className="border-t p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image src={avatar || "/placeholder.svg"} alt={nickname} fill className="object-cover" />
          </div>
          <span className="font-medium">{nickname}</span>
          <span className="px-1 text-xs bg-yellow-50 text-yellow-600 rounded">Lv{level}</span>
        </div>
        <span className="text-sm text-gray-500">{time}</span>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">人均 ¥{cost}</span>
      </div>

      <p className="mt-2 text-gray-700 leading-relaxed">{content}</p>
    </div>
  )
}

