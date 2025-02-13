"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function EditProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState({
    name: "钓鱼爱好者",
    email: "fisher@example.com",
    avatar: "/placeholder.svg",
    bio: "热爱钓鱼，喜欢分享钓鱼经验。",
  })

  const handleSave = () => {
    // TODO: Implement actual save logic
    console.log("Saving user data:", user)
    router.push("/profile")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>编辑个人资料</CardTitle>
          <CardDescription>更新您的个人信息和偏好设置</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <Button variant="outline">更换头像</Button>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                名称
              </label>
              <Input id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                邮箱
              </label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                个人简介
              </label>
              <textarea
                id="bio"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows={3}
                value={user.bio}
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
              />
            </div>
          </div>
          <CardContent className="flex justify-between pt-6">
            <Button variant="outline" onClick={() => router.push("/profile")}>
              取消
            </Button>
            <Button onClick={handleSave}>保存更改</Button>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  )
}

