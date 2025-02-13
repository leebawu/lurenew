interface RatingItemProps {
  label: string
  score: number
}

function RatingItem({ label, score }: RatingItemProps) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-gray-600">{label}</span>
      <span className="text-blue-500">{score.toFixed(1)}</span>
    </div>
  )
}

export default function SpotRatings() {
  return (
    <div className="bg-white px-4 py-3 border-t">
      <div className="flex justify-between text-sm">
        <RatingItem label="环境" score={4.8} />
        <RatingItem label="服务" score={4.4} />
        <RatingItem label="设施" score={4.5} />
        <RatingItem label="性价比" score={4.8} />
      </div>
    </div>
  )
}

