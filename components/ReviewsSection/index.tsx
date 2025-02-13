import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import ReviewSummary from "./ReviewSummary"
import UserReview from "./UserReview"

interface ReviewsSectionProps {
  onSeeAll: () => void
  totalReviews: number
}

export default function ReviewsSection({ onSeeAll, totalReviews }: ReviewsSectionProps) {
  const aiSummary =
    "该钓场环境优良^16，设施完善^8。场地维护到位^12，服务态度好^22。水质清澈^4，适合各类钓法。周末人流量较大，建议提前预约。性价比较高，停车方便，适合亲友聚会。"

  const reviews = [
    {
      userName: "浅绿色嘴巴的淡紫色猩猩",
      userAvatar: "/placeholder.svg",
      userLevel: 2,
      rating: 4.5,
      price: 110,
      content:
        "钓场环境不错，水质很好。场地规划合理，遮阳设施齐全。服务人员态度也很好，设备租赁便捷。就是周末人太多了，建议错峰来。最后收获了两条大鲫鱼，很满意！",
      date: "18小时前",
      images: ["/placeholder.svg", "/placeholder.svg"],
    },
    {
      userName: "快乐钓鱼人",
      userLevel: 3,
      rating: 5,
      price: 150,
      content:
        "这里是我最喜欢的钓场之一，已经来过很多次了。场地宽敞，水质保持得很好，鱼获也不错。特别是路亚区，面积够大，适合练习各种技巧。",
      date: "2天前",
    },
  ]

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium">评价 ({totalReviews})</h2>
        <Button variant="ghost" onClick={onSeeAll} className="text-gray-500">
          查看全部 <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <div className="p-4">
        <ReviewSummary summary={aiSummary} reviewCount={totalReviews} />

        <div className="space-y-4">
          {reviews.map((review, index) => (
            <UserReview key={index} {...review} />
          ))}
        </div>
      </div>
    </div>
  )
}

