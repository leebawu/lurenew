import { Star } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Review {
  id: string
  userName: string
  userAvatar?: string
  rating: number
  price: number
  content: string
  date: string
  images?: string[]
  helpful: number
}

interface FishingSpotReviewsProps {
  reviews: Review[]
  aiSummary: string
  totalReviews: number
  onSeeAll: () => void
}

export default function FishingSpotReviews({ reviews, aiSummary, totalReviews, onSeeAll }: FishingSpotReviewsProps) {
  return (
    <div className="bg-white">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">评价 ({totalReviews})</h2>
          <Button variant="ghost" onClick={onSeeAll} className="text-gray-500">
            查看全部 &gt;
          </Button>
        </div>

        {/* AI Summary */}
        <div className="mb-6 bg-gray-50 rounded-lg p-4">
          <div className="flex items-start gap-2 mb-2">
            <div className="bg-blue-100 rounded-lg p-1">
              <span className="text-blue-600 font-semibold">AI</span>
            </div>
            <span className="font-medium">总结：</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{aiSummary}</p>
          <div className="flex justify-end mt-2 gap-2">
            <Button variant="outline" size="sm" className="text-gray-500">
              <span className="mr-1">👍</span> 有帮助
            </Button>
            <Button variant="outline" size="sm" className="text-gray-500">
              <span className="mr-1">👎</span>
            </Button>
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={review.userAvatar} />
                    <AvatarFallback>{review.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.userName}</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="mx-2">¥{review.price}/人</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-600 mb-2">{review.content}</p>
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-2">
                  {review.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`Review image ${index + 1}`}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <span className="mr-1">👍</span> {review.helpful}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

