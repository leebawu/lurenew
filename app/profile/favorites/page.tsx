"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface FavoriteFishingSpot {
  id: string
  name: string
  image: string
  rating: number
  distance: string
}

export default function FavoritesPage() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<FavoriteFishingSpot[]>([
    {
      id: "1",
      name: "青山湖路亚基地",
      image: "/placeholder.svg",
      rating: 4.5,
      distance: "2.5km",
    },
    {
      id: "2",
      name: "鄱阳湖钓鱼天堂",
      image: "/placeholder.svg",
      rating: 4.2,
      distance: "5.1km",
    },
    {
      id: "3",
      name: "赣江路亚基地",
      image: "/placeholder.svg",
      rating: 4.8,
      distance: "1.8km",
    },
  ])

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((spot) => spot.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">我的收藏</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((spot) => (
          <Card key={spot.id} className="overflow-hidden">
            <Image
              src={spot.image || "/placeholder.svg"}
              alt={spot.name}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle>{spot.name}</CardTitle>
              <CardDescription>
                评分: {spot.rating} | 距离: {spot.distance}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push(`/fishing-spot/${spot.id}`)}>
                查看详情
              </Button>
              <Button variant="destructive" onClick={() => removeFavorite(spot.id)}>
                取消收藏
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

