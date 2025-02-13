"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const tabs = ["优惠", "钓场", "评价", "笔记"]

export default function SpotTabs() {
  const [activeTab, setActiveTab] = useState("优惠")

  return (
    <div className="sticky top-12 bg-white z-40">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={cn("flex-1 py-3 text-center relative", activeTab === tab && "text-blue-500")}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
          </button>
        ))}
      </div>
    </div>
  )
}

