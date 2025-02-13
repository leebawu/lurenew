import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// 首先,定义所有可能的鱼种
const allFishSpecies = [
  "黑鱼",
  "鲈鱼",
  "清江鱼",
  "青鱼",
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
  "草鱼",
  "鲤鱼",
  "鲫鱼",
  "鲢鱼",
  "鳙鱼",
]

// 辅助函数:随机选择鱼种
export function getRandomFishSpecies(count: number): string[] {
  const shuffled = [...allFishSpecies].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

