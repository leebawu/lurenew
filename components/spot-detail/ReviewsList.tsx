import AIReviewSummary from "./AIReviewSummary"
import UserReview from "./UserReview"
import Link from "next/link"

const mockReviews = [
  {
    avatar: "/placeholder.svg?height=32&width=32",
    nickname: "钓鱼达人",
    level: 2,
    rating: 5,
    cost: 110,
    time: "18小时前",
    content:
      "水质非常好，鱼获也很丰富。钓场环境整洁，服务态度也很好。特别是黑鱼区域，设施完善，是个不错的路亚场地。周末人稍微多一些，建议早点去。",
  },
  // ... (其他评论数据)
]

export default function ReviewsList() {
  return (
    <div className="bg-white mt-2">
      <AIReviewSummary
        content="「环境优美」是这个钓场的特色，水质清澈，场地宽敞。有顾客提到「设施完善」，配套服务齐全。「路亚区域」规划合理，特别适合路亚爱好者。钓场管理规范，服务态度好，性价比较高。"
        reviewCount={2699}
      />

      <div className="mt-2">
        {mockReviews.map((review, index) => (
          <UserReview key={index} {...review} />
        ))}
      </div>

      <div className="p-4 flex justify-between items-center border-t">
        <span className="text-gray-500">共 {mockReviews.length} 条评价</span>
        <Link href="/reviews" className="text-blue-500 hover:underline">
          查看全部评价 &gt;
        </Link>
      </div>
    </div>
  )
}

