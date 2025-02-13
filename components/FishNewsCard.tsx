import { CalendarIcon, ScaleIcon, FishIcon } from "lucide-react"

interface FishNewsCardProps {
  spotName: string
  date: string
  fishType: string
  weight: number
}

export default function FishNewsCard({ spotName, date, fishType, weight }: FishNewsCardProps) {
  return (
    <div className="bg-white p-4 mb-2 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">{spotName}</h3>
      <div className="flex items-center text-sm text-gray-600 mb-1">
        <CalendarIcon className="w-4 h-4 mr-2" />
        <span>{date}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-1">
        <FishIcon className="w-4 h-4 mr-2" />
        <span>{fishType}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <ScaleIcon className="w-4 h-4 mr-2" />
        <span>{weight} 斤</span>
      </div>
    </div>
  )
}

