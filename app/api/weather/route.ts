import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // 模拟天气数据
  const mockWeatherData = {
    temperature: 25,
    condition: "晴",
    humidity: 60,
    windSpeed: 3.5,
  }

  // 模拟计算钓鱼指数
  const calculateFishingIndex = (weather: typeof mockWeatherData): number => {
    const temperatureWeight = (weather.temperature - 10) / 20
    const humidityWeight = (100 - weather.humidity) / 100
    const windSpeedWeight = Math.max(0, 1 - weather.windSpeed / 10)

    const rawIndex = temperatureWeight * 0.4 + humidityWeight * 0.3 + windSpeedWeight * 0.3
    return Math.min(Math.max(rawIndex * 10, 0), 10)
  }

  const fishingIndex = calculateFishingIndex(mockWeatherData)

  return NextResponse.json({
    weather: mockWeatherData,
    fishingIndex: fishingIndex.toFixed(1),
  })
}

