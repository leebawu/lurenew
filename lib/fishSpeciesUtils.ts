// 初始鱼种列表
const initialFishSpecies = [
  "黑鱼",
  "鲈鱼",
  "清江鱼",
  "鳜鱼",
  "白鱼",
  "翘嘴",
  "鲟鱼",
  "重唇鱼",
  "龙纹斑",
  "虹鳟",
  "褐鳟",
  "花鲢",
  "七彩神仙鱼",
  "柳根",
  "华子鲢",
  "军鱼",
]

const fishSpecies = [...initialFishSpecies]

export function getFishSpecies(): string[] {
  return fishSpecies
}

export function addFishSpecies(newSpecies: string): void {
  if (!fishSpecies.includes(newSpecies)) {
    fishSpecies.push(newSpecies)
  }
}

export function generateFishNews(allFishingSpots: any[]): any[] {
  const news: any[] = []
  const today = new Date()

  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const formattedDate = date.toISOString().split("T")[0]

    allFishingSpots.forEach((spot) => {
      if (Math.random() < 0.3) {
        const availableFishSpecies = spot.fishSpecies.filter((species: string) => fishSpecies.includes(species))
        if (availableFishSpecies.length > 0) {
          const fishType = availableFishSpecies[Math.floor(Math.random() * availableFishSpecies.length)]
          news.push({
            date: formattedDate,
            spotId: spot.id,
            spotName: spot.name,
            fishType: fishType,
            weight: Math.floor(Math.random() * 50) + 10,
            tags: spot.tags,
            fishSpecies: availableFishSpecies,
          })
        }
      }
    })
  }

  return news.sort((a, b) => b.date.localeCompare(a.date))
}

