"use client"

import { useState } from "react"
import { Search, MapPin, Sun, Cloud, CloudRain, ChevronDown, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const popularCities = ["北京", "上海", "广州", "深圳", "成都", "杭州", "南昌"]

// 为每个城市创建模拟天气数据
const mockWeatherData: {
  [key: string]: { temperature: number; condition: string; humidity: number; windSpeed: number }
} = {
  北京: { temperature: 28, condition: "晴", humidity: 40, windSpeed: 3.0 },
  上海: { temperature: 26, condition: "多云", humidity: 65, windSpeed: 4.5 },
  广州: { temperature: 32, condition: "阴", humidity: 70, windSpeed: 2.5 },
  深圳: { temperature: 30, condition: "雨", humidity: 75, windSpeed: 5.0 },
  成都: { temperature: 25, condition: "多云", humidity: 60, windSpeed: 2.0 },
  杭州: { temperature: 27, condition: "晴", humidity: 55, windSpeed: 3.5 },
  南昌: { temperature: 29, condition: "晴", humidity: 50, windSpeed: 3.0 },
}

// 计算钓鱼指数
const calculateFishingIndex = (weather: { temperature: number; humidity: number; windSpeed: number }): number => {
  const temperatureWeight = (weather.temperature - 10) / 20
  const humidityWeight = (100 - weather.humidity) / 100
  const windSpeedWeight = Math.max(0, 1 - weather.windSpeed / 10)

  const rawIndex = temperatureWeight * 0.4 + humidityWeight * 0.3 + windSpeedWeight * 0.3
  return Math.min(Math.max(rawIndex * 10, 0), 10)
}

export default function Header() {
  const router = useRouter()
  const [selectedCity, setSelectedCity] = useState("南昌")
  const [searchCity, setSearchCity] = useState("")

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchCity.trim()) {
      setSelectedCity(searchCity.trim())
      setSearchCity("")
    }
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "晴":
        return <Sun className="text-yellow-500" size={20} />
      case "多云":
        return <Cloud className="text-gray-500" size={20} />
      case "阴":
      case "雨":
        return <CloudRain className="text-blue-500" size={20} />
      default:
        return <Sun className="text-yellow-500" size={20} />
    }
  }

  const currentWeather = mockWeatherData[selectedCity] || mockWeatherData["南昌"]
  const fishingIndex = calculateFishingIndex(currentWeather)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-14 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span className="font-medium">{selectedCity}</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-2">
                  {popularCities.map((city) => (
                    <Button
                      key={city}
                      variant="outline"
                      onClick={() => setSelectedCity(city)}
                      className="justify-start"
                    >
                      {city}
                    </Button>
                  ))}
                </div>
                <div className="grid gap-2">
                  <form onSubmit={handleCitySearch}>
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder="搜索城市..."
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                      />
                      <Button type="submit">搜索</Button>
                    </div>
                  </form>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <div className="hidden sm:block">
            <form className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="搜索钓场、鱼种..." className="pl-8 pr-4 w-40 md:w-60 lg:w-80" />
            </form>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center space-x-2">
                  {getWeatherIcon(currentWeather.condition)}
                  <span className="font-medium text-sm">
                    {currentWeather.temperature}°C | 钓鱼指数: {fishingIndex.toFixed(1)}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>城市: {selectedCity}</p>
                <p>天气: {currentWeather.condition}</p>
                <p>温度: {currentWeather.temperature}°C</p>
                <p>钓鱼指数: {fishingIndex.toFixed(1)}</p>
                <p>湿度: {currentWeather.humidity}%</p>
                <p>风速: {currentWeather.windSpeed} m/s</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="ghost" size="icon" onClick={() => router.push("/profile")}>
            <User className="h-5 w-5" />
            <span className="sr-only">个人中心</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

