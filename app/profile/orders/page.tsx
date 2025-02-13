"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: string
  fishingSpotId: string
  fishingSpotName: string
  date: string
  amount: number
  status: "pending" | "completed" | "cancelled"
}

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      fishingSpotId: "1",
      fishingSpotName: "青山湖路亚基地",
      date: "2023-06-20",
      amount: 150,
      status: "completed",
    },
    {
      id: "2",
      fishingSpotId: "2",
      fishingSpotName: "鄱阳湖钓鱼天堂",
      date: "2023-07-05",
      amount: 200,
      status: "pending",
    },
    {
      id: "3",
      fishingSpotId: "3",
      fishingSpotName: "赣江路亚基地",
      date: "2023-07-10",
      amount: 180,
      status: "cancelled",
    },
  ])

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">待支付</Badge>
      case "completed":
        return <Badge variant="success">已完成</Badge>
      case "cancelled":
        return <Badge variant="destructive">已取消</Badge>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">我的订单</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle>{order.fishingSpotName}</CardTitle>
              <CardDescription>订单日期: {order.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">金额: ¥{order.amount}</p>
              <div className="mt-2">{getStatusBadge(order.status)}</div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push(`/fishing-spot/${order.fishingSpotId}`)}>
                查看钓场
              </Button>
              {order.status === "pending" && (
                <Button
                  variant="destructive"
                  onClick={() => setOrders(orders.map((o) => (o.id === order.id ? { ...o, status: "cancelled" } : o)))}
                >
                  取消订单
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

