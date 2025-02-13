"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { submitReview } from "../lib/api"

export default function RatingForm({ spotId }: { spotId: string }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitReview(spotId, rating, comment)
    setRating(0)
    setComment("")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h3 className="text-xl font-semibold mb-4">添加评分</h3>
      <div className="mb-4">
        <label className="block mb-2">评分</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block mb-2">
          评论
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        提交评分
      </button>
    </form>
  )
}

