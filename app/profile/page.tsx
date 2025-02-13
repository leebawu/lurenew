import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, ThumbsUp, Fish, ShoppingBag, Heart, FileText, ChevronRight } from "lucide-react"
import Header from "@/components/Header"

export const metadata: Metadata = {
  title: "用户中心 | 路亚钓场评分",
  description: "管理您的个人资料、收藏、评价、订单和钓场",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 用户信息头部 */}
      <div className="bg-gradient-to-r from-orange-50 to-rose-50 p-6 pt-16">
        <div className="container mx-auto">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Avatar className="w-20 h-20 border-4 border-white">
                <AvatarImage src="/placeholder.svg" alt="用户头像" />
                <AvatarFallback>钓友</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold">钓鱼爱好者</h1>
                  <Badge variant="secondary">Lv4</Badge>
                  <Badge variant="outline">VIP</Badge>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>IP: 南昌市</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["路亚", "休闲钓", "野钓", "竞技"].map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-white/50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <Button variant="outline" className="bg-white">
              编辑资料
            </Button>
          </div>

          {/* 统计数据 */}
          <div className="flex justify-between mt-6 bg-white rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">1</div>
              <div className="text-gray-600">粉丝</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">7</div>
              <div className="text-gray-600">关注</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">28</div>
              <div className="text-gray-600">获赞</div>
            </div>
          </div>
        </div>
      </div>

      {/* 功能区域 */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-5 gap-4 mb-6">
          <Link href="/profile/orders" className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-sm">订单</span>
          </Link>
          <Link href="/profile/reviews" className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Star className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-sm">我的评价</span>
          </Link>
          <Link href="/profile/favorites" className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
              <Heart className="w-6 h-6 text-pink-500" />
            </div>
            <span className="text-sm">收藏</span>
          </Link>
          <Link href="/profile/likes" className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center relative">
              <ThumbsUp className="w-6 h-6 text-yellow-500" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                43
              </span>
            </div>
            <span className="text-sm">获赞</span>
          </Link>
          <Link href="/profile/fishing-spots" className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Fish className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-sm">我的钓场</span>
          </Link>
        </div>

        {/* 内容标签页 */}
        <div className="bg-white rounded-lg">
          <div className="flex border-b">
            <button className="flex-1 px-4 py-3 text-center border-b-2 border-primary font-medium">通知</button>
            <button className="flex-1 px-4 py-3 text-center text-gray-500">草稿</button>
            <button className="flex-1 px-4 py-3 text-center text-gray-500">评价详情</button>
          </div>

          {/* 草稿箱 */}
          <div className="p-4">
            <Card className="bg-gray-50">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span>草稿箱</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <span>4 条草稿待发布</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

