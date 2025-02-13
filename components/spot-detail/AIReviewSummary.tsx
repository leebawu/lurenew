"use client"

import { ThumbsUp, HelpCircle } from "lucide-react"

interface AIReviewSummaryProps {
  content: string
  reviewCount: number
}

export default function AIReviewSummary({ content, reviewCount }: AIReviewSummaryProps) {
  return (
    <div className="bg-white p-4">
      <div className="flex items-start gap-2">
        <div className="flex items-center gap-2 bg-blue-50 px-2 py-1 rounded-md">
          <span className="text-blue-600 font-semibold">AI</span>
          <span className="text-blue-600">总结：</span>
        </div>
        <div className="flex-1">
          <p className="text-gray-700 leading-relaxed">{content}</p>
          <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
            <span>AI 结合 {reviewCount} 条用户评价智能生成</span>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-gray-500">
                <ThumbsUp className="w-4 h-4" />
                <span>有帮助</span>
              </button>
              <button>
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

