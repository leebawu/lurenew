"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronLeft, Calendar, Clock, MapPin, Users, Trophy, Share2 } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getEventById } from "@/lib/api"
import type { Event } from "@/lib/types"
import ErrorBoundary from "@/components/ErrorBoundary"

interface EventDetailProps {
  eventId: string
}

export default function EventDetail({ eventId }: EventDetailProps) {
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function loadEventData() {
      try {
        setIsLoading(true)
        const data = await getEventById(eventId)
        setEvent(data)
      } catch (err) {
        setError("Failed to load event data")
      } finally {
        setIsLoading(false)
      }
    }
    loadEventData()
  }, [eventId])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error || !event) {
    return <div className="text-red-500 text-center">{error || "Failed to load event data"}</div>
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 bg-white z-50 px-4 py-3 flex items-center justify-between border-b">
          <button onClick={() => router.back()} className="p-2">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">赛事详情</h1>
          <button className="p-2">
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        <div className="pt-16 pb-24">
          {/* Event Image */}
          <div className="relative h-48 w-full">
            <Image src={event.image || "/placeholder.svg"} alt={event.title} layout="fill" objectFit="cover" />
          </div>

          {/* Event Details */}
          <div className="bg-white p-4 space-y-4">
            <h2 className="text-2xl font-bold">{event.title}</h2>

            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>{event.date}</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span>
                {event.participants}/{event.maxParticipants} 人已报名
              </span>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">赛事说明</h3>
              <p className="text-gray-600">{event.description}</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">奖项设置</h3>
              <ul className="list-disc list-inside text-gray-600">
                {event.prizes.map((prize, index) => (
                  <li key={index}>{prize}</li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">主办方</h3>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={event.organizer.avatar} />
                  <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
                </Avatar>
                <span>{event.organizer.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-around">
          <Button className="flex-1 mr-2">
            <Trophy className="w-5 h-5 mr-2" />
            报名参赛
          </Button>
          <Button variant="outline" className="flex-1 ml-2">
            添加到日历
          </Button>
        </div>
      </div>
    </ErrorBoundary>
  )
}

