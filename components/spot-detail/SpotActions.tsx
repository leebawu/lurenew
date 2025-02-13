import { MapPin, PenSquare, MessageSquare } from "lucide-react"

export default function SpotActions() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2 flex justify-around">
      <button className="flex flex-col items-center gap-1">
        <MapPin className="w-6 h-6" />
        <span className="text-xs">打卡</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <PenSquare className="w-6 h-6" />
        <span className="text-xs">发笔记</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <MessageSquare className="w-6 h-6" />
        <span className="text-xs">写评价</span>
      </button>
    </div>
  )
}

