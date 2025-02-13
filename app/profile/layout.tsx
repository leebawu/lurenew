import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "用户中心",
  description: "管理您的个人资料、收藏、评价、订单等",
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>
}

