"use client"

import { useParams } from "next/navigation"
import EventDetail from "@/components/EventDetail"

export default function EventPage() {
  const params = useParams()
  const eventId = params.id as string

  return <EventDetail eventId={eventId} />
}

