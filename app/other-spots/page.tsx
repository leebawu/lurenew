"use client"

import Header from "../../components/Header"
import Categories from "../../components/Categories"
import FishingSpotCard from "../../components/FishingSpotCard"
import WeChatShare from "../../components/WeChatShare"

const otherFishingSpots = [
  {
    name: "清水湾海钓基地",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.6,
    reviews: 156,
    pricePerPerson: 200,
    category: "海钓",
    location: "三亚市",
    distance: "25km",
    tags: ["海钓", "旗鱼", "金枪鱼"],
    openingTime: "6:00-18:00",
    coupon: {
      price: 50,
      condition: "300元代金券",
    },
  },
  {
    name: "龙王山溪流钓场",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.3,
    reviews: 89,
    pricePerPerson: 80,
    category: "溪流钓",
    location: "黄山市",
    distance: "10km",
    tags: ["溪流钓", "鲤鱼", "鲫鱼"],
    openingTime: "全天开放",
    discount: {
      price: 60,
      originalPrice: 80,
      description: "单人全天畅钓套餐",
    },
  },
  {
    name: "金沙湾冰钓营地",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviews: 203,
    pricePerPerson: 300,
    category: "冰钓",
    location: "哈尔滨市",
    distance: "40km",
    tags: ["冰钓", "鲟鱼", "北极鳕"],
    openingTime: "8:00-16:00 (冬季限定)",
    coupon: {
      price: 100,
      condition: "500元代金券",
    },
  },
  {
    name: "红树林夜钓基地",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.5,
    reviews: 178,
    pricePerPerson: 150,
    category: "夜钓",
    location: "深圳市",
    distance: "15km",
    tags: ["夜钓", "鲈鱼", "鲶鱼"],
    openingTime: "18:00-次日6:00",
    discount: {
      price: 120,
      originalPrice: 150,
      description: "单人夜钓套餐",
    },
  },
  {
    name: "彩虹湖飞蝇钓场",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
    reviews: 134,
    pricePerPerson: 250,
    category: "飞蝇钓",
    location: "杭州市",
    distance: "20km",
    tags: ["飞蝇钓", "鳟鱼", "鲑鱼"],
    openingTime: "7:00-17:00",
    coupon: {
      price: 80,
      condition: "400元代金券",
    },
  },
]

export default function OtherSpots() {
  return (
    <div className="min-h-screen bg-gray-100 pb-safe-area-inset-bottom">
      <WeChatShare
        title="其他钓场评分"
        desc="发现多样化钓场，体验不同钓鱼乐趣"
        link="https://your-domain.com/other-spots"
        imgUrl="https://your-domain.com/other-spots-image.jpg"
      />

      <Header />

      <div className="pt-12">
        <Categories />

        <div className="bg-white mt-2">
          {otherFishingSpots.map((spot, index) => (
            <FishingSpotCard key={index} {...spot} />
          ))}
        </div>
      </div>
    </div>
  )
}

