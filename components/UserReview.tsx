import { Star } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface UserReviewProps {
  userName: string
  userAvatar?: string
  userLevel?: number
  rating: number
  price: number
  content: string
  date: string
  images?: string[]
}

export default function UserReview({
  userName,
  userAvatar,
  userLevel,
  rating,
  price,
  content,
  date,
  images,
}: UserReviewProps) {
  return (
    <div className="border-b border-gray-100 py-4 last:border-none">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={userAvatar} />
            <AvatarFallback>{userName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{userName}</span>
              {userLevel && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-600 hover:bg-orange-100">
                  Lv{userLevel}
                </Badge>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2">¥{price}/人</span>
            </div>
          </div>
        </div>
        <span className="text-sm text-gray-400">{date}</span>
      </div>

      <p className="text-gray-600 text-sm mb-2 line-clamp-3">{content}</p>

      {images && images.length > 0 && (
        <div className="flex gap-2 mb-2 overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image || "/placeholder.svg"}
              alt={`Review image ${index + 1}`}
              width={80}
              height={80}
              className="rounded-lg object-cover flex-shrink-0"
            />
          ))}
        </div>
      )}
    </div>
  )
}

