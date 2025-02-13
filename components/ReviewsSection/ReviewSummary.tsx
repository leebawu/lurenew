import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReviewSummaryProps {
  summary: string
  reviewCount: number
}

export default function ReviewSummary({ summary, reviewCount }: ReviewSummaryProps) {
  const formatNumber = (num: number) => {
    if (num >= 10000) {
      return `${Math.floor(num / 10000)}万+`
    }
    return num.toString()
  }

  const processSummaryText = (text: string) => {
    const parts = text.split(/(\^\d+)/)
    return parts.map((part, index) => {
      if (part.startsWith("^")) {
        return (
          <sup key={index} className="text-xs text-blue-500 mx-0.5">
            {part.slice(1)}
          </sup>
        )
      }
      return part
    })
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-2 mb-3">
        <div className="bg-blue-100 rounded px-2 py-1">
          <span className="text-blue-600 font-semibold">AI</span>
        </div>
        <div className="flex-1">
          <div className="font-medium mb-1">总结：</div>
          <p className="text-gray-600 text-sm leading-relaxed">{processSummaryText(summary)}</p>
          <div className="text-xs text-gray-400 mt-1">AI 结合 {formatNumber(reviewCount)} 条用户评价智能生成</div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" className="text-gray-600">
          <ThumbsUp className="w-4 h-4 mr-1" />
          有帮助
        </Button>
        <Button variant="outline" size="sm" className="text-gray-600">
          <ThumbsDown className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

