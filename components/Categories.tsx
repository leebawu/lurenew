import { Button } from "@/components/ui/button"
import { getFishSpecies } from "@/lib/fishSpeciesUtils"

interface CategoriesProps {
  selectedCategories: string[]
  onSelectCategory: (category: string) => void
  selectedKeyword: string
  onSelectKeyword: (keyword: string) => void
  selectedFishSpecies: string[]
  onSelectFishSpecies: (species: string) => void
  selectedFishReleaseTime: string
  onSelectFishReleaseTime: (time: string) => void
}

export default function Categories({
  selectedCategories,
  onSelectCategory,
  selectedKeyword,
  onSelectKeyword,
  selectedFishSpecies,
  onSelectFishSpecies,
  selectedFishReleaseTime,
  onSelectFishReleaseTime,
}: CategoriesProps) {
  const keywords = ["休闲钓场", "竞技钓场", "船钓场", "溪流钓场"]
  const fishSpeciesOptions = getFishSpecies()
  const fishReleaseTimes = ["今天", "昨天", "3天", "7天", "10天", "30天"]
  const mainCategories = ["钓场种类", "目标鱼种", "放鱼时间", "相关推荐"]
  const recommendedOptions = ["附近 5km", "综合推荐", "热门钓场", "钓场赛事", "鱼讯"]

  return (
    <div className="bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {mainCategories.map((category, index) => (
          <div key={category} className={`px-4 py-3 overflow-x-auto scrollbar-hide ${index !== 0 ? "border-t" : ""}`}>
            <div className="flex items-center">
              <span className="text-sm font-medium whitespace-nowrap mr-2 flex-shrink-0">{category}：</span>
              <div className="flex flex-wrap gap-2">
                {category === "相关推荐" &&
                  recommendedOptions.map((option) => (
                    <Button
                      key={option}
                      variant={selectedCategories.includes(option) ? "default" : "outline"}
                      size="sm"
                      className="whitespace-nowrap text-xs sm:text-sm"
                      onClick={() => onSelectCategory(option)}
                    >
                      {option}
                    </Button>
                  ))}
                {category === "钓场种类" &&
                  keywords.map((keyword) => (
                    <Button
                      key={keyword}
                      variant={selectedKeyword === keyword ? "default" : "outline"}
                      size="sm"
                      className="whitespace-nowrap text-xs sm:text-sm"
                      onClick={() => onSelectKeyword(keyword)}
                    >
                      {keyword}
                    </Button>
                  ))}
                {category === "目标鱼种" &&
                  fishSpeciesOptions.map((species) => (
                    <Button
                      key={species}
                      variant={selectedFishSpecies.includes(species) ? "default" : "outline"}
                      size="sm"
                      className="whitespace-nowrap text-xs sm:text-sm"
                      onClick={() => onSelectFishSpecies(species)}
                    >
                      {species}
                    </Button>
                  ))}
                {category === "放鱼时间" &&
                  fishReleaseTimes.map((time) => (
                    <Button
                      key={time}
                      variant={selectedFishReleaseTime === time ? "default" : "outline"}
                      size="sm"
                      className="whitespace-nowrap text-xs sm:text-sm"
                      onClick={() => onSelectFishReleaseTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

