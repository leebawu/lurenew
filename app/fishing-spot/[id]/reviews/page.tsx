"use client"

import { useParams, useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import ReviewsSection from "@/components/ReviewsSection"

export default function AllReviews() {
  const params = useParams()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 bg-white z-50 px-4 py-3 flex items-center border-b">
        <button onClick={() => router.back()} className="p-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium ml-2">全部评价</h1>
      </div>

      <div className="pt-14">
        <ReviewsSection totalReviews={2699} onSeeAll={() => {}} />
      </div>
    </div>
  )
}

