import SpotHeader from "@/components/spot-detail/SpotHeader"
import SpotRatings from "@/components/spot-detail/SpotRatings"
import SpotTabs from "@/components/spot-detail/SpotTabs"
import RecommendedFish from "@/components/spot-detail/RecommendedFish"
import ReviewsList from "@/components/spot-detail/ReviewsList"
import SpotActions from "@/components/spot-detail/SpotActions"
import { allFishingSpots } from "@/lib/data" // Assuming we move the mock data to a separate file

export default function SpotDetail({ params }: { params: { id: string } }) {
  const spotData = allFishingSpots.find((spot) => spot.id === params.id)

  if (!spotData) {
    return <div>Spot not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <SpotHeader {...spotData} />
      <SpotRatings />

      <div className="bg-white mt-2 px-4 py-3">
        <div className="flex items-center gap-2 text-blue-500 bg-blue-50 px-3 py-2 rounded-lg">
          <span className="text-sm font-medium">
            {spotData.location}钓场好评榜第{spotData.regionalRanking}名 &gt;
          </span>
        </div>
      </div>

      <div className="bg-white mt-2 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">必备攻略</h3>
          <span className="text-gray-400">&gt;</span>
        </div>
        <div className="space-y-2 text-gray-600 text-sm">
          <p>• 建议携带自己的钓具，现场租赁价格较高</p>
          <p>• 周末人较多，建议提前在线预约</p>
        </div>
      </div>

      <div className="bg-white mt-2 px-4 py-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-500 px-2 py-0.5 rounded text-sm">8</span>
            <span>收录8年</span>
          </div>
          <span className="text-gray-400">&gt;</span>
        </div>
        <div className="flex gap-4">
          <span className="text-sm text-gray-600">有停车位</span>
          <span className="text-sm text-gray-600">提供渔具</span>
          <span className="text-sm text-gray-600">免费WiFi</span>
          <span className="text-sm text-gray-600">提供饵料</span>
        </div>
      </div>

      <SpotTabs />
      <RecommendedFish items={spotData.recommendedFish || []} />
      <ReviewsList />
      <SpotActions />
    </div>
  )
}

