"use client"

import { useParams } from "next/navigation"
import FishingSpotDetail from "@/components/FishingSpotDetail"

export default function FishingSpotPage() {
  const params = useParams()
  const spotId = params.id as string

  return <FishingSpotDetail spotId={spotId} onClose={() => {}} />
}

