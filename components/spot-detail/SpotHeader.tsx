"use client"

import { ArrowLeft, Share2, Star, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SpotHeaderProps {
  name: string
  rating: number
  reviews: number
  pricePerPerson: number
  category: string
  location: string
}

export default function SpotHeader({ name, rating, reviews, pricePerPerson, category, location }: SpotHeaderProps) {
  return (
    <div className="relative">
      {/* 顶部导航 */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-12 bg-white/80 backdrop-blur-md">
        <Link href="/" className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center gap-4">
          <button className="text-orange-500">
            <Star className="w-6 h-6 fill-orange-500" />
          </button>
          <button>
            <Share2 className="w-6 h-6" />
          </button>
          <button>
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 春节通知 */}
      <div className="bg-red-50 p-4 flex items-center justify-between mt-12">
        <div className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7510.PNG-AU5srXc9tgXnqFM266jUKDVkcOw0tG.png"
            alt="春节图标"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-red-500">春节期间 (2.10-2.17) 正常营业</span>
        </div>
        <ArrowLeft className="w-5 h-5 rotate-180 text-red-500" />
      </div>

      {/* 钓场封面图 */}
      <div className="relative w-full h-64 bg-yellow-400">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7510.PNG-AU5srXc9tgXnqFM266jUKDVkcOw0tG.png"
          alt={name}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button className="px-3 py-1 bg-black/70 text-white rounded-full text-sm">视频</button>
          <button className="px-3 py-1 bg-black/70 text-white rounded-full text-sm">相册</button>
        </div>
      </div>

      {/* 钓场信息 */}
      <div className="bg-white p-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">{name}</h1>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7510.PNG-AU5srXc9tgXnqFM266jUKDVkcOw0tG.png"
            alt="认证"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-blue-500">{rating}</span>
          <span className="text-gray-500">详情 &gt;</span>
          <span className="text-gray-500">{reviews}条</span>
          <span className="text-gray-500">¥{pricePerPerson}/人</span>
        </div>
      </div>
    </div>
  )
}

