"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  title: string
  content: string
  date: string
  type: "info" | "warning" | "success"
  isRead: boolean
}

export default function NotificationsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "新钓场开放",
      content: "青山湖新开放了一个路亚钓场，快来体验吧！",
      date: "2023-07-01",
      type: "info",
      isRead: false,
    },
    {
      id: "2",
      title: "订单确认",
      content: "您的订单 #12345 已确认，请按时到达钓场。",
      date: "2023-07-05",
      type: "success",
      isRead: true,
    },
    {
      id: "3",
      title: "天气预警",
      content: "明天可能有暴雨，请注意安全。",
      date: "2023-07-10",
      type: "warning",
      isRead: false,
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getTypeBadge = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Badge variant="secondary">信息</Badge>
      case "warning":
        return <Badge variant="warning">警告</Badge>
      case "success":
        return <Badge variant="success">成功</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">消息通知</h1>
      <div className="space-y-6">
        {notifications.map((notification) => (
          <Card key={notification.id} className={notification.isRead ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{notification.title}</CardTitle>
                {getTypeBadge(notification.type)}
              </div>
              <CardDescription>日期: {notification.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{notification.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              {!notification.isRead && (
                <Button variant="outline" onClick={() => markAsRead(notification.id)}>
                  标记为已读
                </Button>
              )}
              <Button variant="destructive" onClick={() => deleteNotification(notification.id)}>
                删除通知
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

