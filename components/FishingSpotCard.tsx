import Image from "next/image"
import { Star } from "lucide-react"
import { useRouter } from "next/navigation"
import cn from "classnames"
import { Badge } from "@/components/ui/badge"

interface FishRelease {
  date: string
  fishType: string
  weight: number
}

interface FishingSpotCardProps {
  id: string
  name: string
  image: string
  rating: number
  reviews: number
  distance: string
  openingHours: string
  todayFish: string | null
  regionalRanking: number
  anniversaryEvent: string
  fishReleases: FishRelease[]
  fishSpecies: string[]
  hasEvent: boolean
  onClick?: () => void
  isToday: boolean
  matchedFishSpecies: string[]
}

export default function FishingSpotCard({
  id,
  name,
  image,
  rating,
  reviews,
  distance,
  openingHours,
  todayFish,
  regionalRanking,
  anniversaryEvent,
  fishReleases,
  fishSpecies,
  hasEvent,
  onClick,
  isToday,
  matchedFishSpecies,
}: FishingSpotCardProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push(`/fishing-spot/${id}`)
    }
  }

  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-lg shadow-md transition-all hover:shadow-lg mx-4 my-4 sm:mx-0",
      )}
      onClick={handleClick}
    >
      <div className="flex flex-col sm:flex-row p-4">
        <div className="relative h-40 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-md mb-4 sm:mb-0 sm:mr-4">
          <Image src={image || "/placeholder.svg"} alt={name} layout="fill" objectFit="cover" className="bg-muted" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{name}</h2>
          <div className="mt-1 flex items-center">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="ml-1 font-medium">{rating}</span>
            <span className="ml-2 text-sm text-muted-foreground">{reviews} 条点评</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            距离: {distance}km | 营业时间: {openingHours}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {todayFish && <Badge variant="secondary">今日放鱼: {todayFish}</Badge>}
            {regionalRanking && <Badge variant="outline">区域排名: 第 {regionalRanking} 名</Badge>}
            {anniversaryEvent && <Badge>{anniversaryEvent}</Badge>}
            {hasEvent && <Badge variant="destructive">有赛事</Badge>}
          </div>
          {matchedFishSpecies.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-600">匹配鱼种：</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {matchedFishSpecies.map((species, index) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                    {species}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {!isToday && (
        <div className="border-t p-4">
          <p className="font-medium">钓场鱼种:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {fishSpecies.map((species, index) => (
              <Badge key={index} variant="outline">
                {species}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

