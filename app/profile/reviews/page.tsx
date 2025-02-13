"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Review {
  id: string
  fishingSpotId: string
  fishingSpotName: string
  rating: number
  content: string
  date: string
}

export default function ReviewsPage() {
  const router = useRouter()
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      fishingSpotId: "1",
      fishingSpotName: "青山湖路亚基地",
      rating: 4,
      content: "环境很好，鱼获不错。设施完善，服务态度也很好。就是周末人太多了。",
      date: "2023-06-15",
    },
    {
      id: "2",
      fishingSpotId: "2",
      fishingSpotName: "鄱阳湖钓鱼天堂",
      rating: 5,
      content: "风景优美，鱼种丰富。非常适合周末放松。希望以后能多举办一些钓鱼比赛。",
      date: "2023-05-30",
    },
  ])

  const deleteReview = (id: string) => {
    setReviews(reviews.filter((review) => review.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">我的评价</h1>
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <CardTitle>{review.fishingSpotName}</CardTitle>
              <CardDescription>评价日期: {review.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${index < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p>{review.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push(`/fishing-spot/${review.fishingSpotId}`)}>
                查看钓场
              </Button>
              <Button variant="destructive" onClick={() => deleteReview(review.id)}>
                删除评价
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

