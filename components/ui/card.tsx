import { cn } from "@/lib/utils"
import type React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card = ({ children, className }: CardProps) => {
  return <div className={cn("bg-white rounded-lg shadow-md p-4", className)}>{children}</div>
}

interface CardHeaderProps {
  children: React.ReactNode
}

export const CardHeader = ({ children }: CardHeaderProps) => {
  return <div className="mb-2">{children}</div>
}

interface CardTitleProps {
  children: React.ReactNode
}

export const CardTitle = ({ children }: CardTitleProps) => {
  return <h2 className="text-lg font-semibold">{children}</h2>
}

interface CardContentProps {
  children: React.ReactNode
}

export const CardContent = ({ children }: CardContentProps) => {
  return <div>{children}</div>
}

interface BadgeProps {
  variant?: "default" | "outline" | "secondary" | "destructive"
  children: React.ReactNode
}

export const Badge = ({ variant = "default", children }: BadgeProps) => {
  const bgClass = {
    default: "bg-primary text-white",
    outline: "border border-primary text-primary",
    secondary: "bg-secondary text-white",
    destructive: "bg-destructive text-white",
  }[variant]
  return <span className={`px-2 py-1 rounded-md text-xs font-medium ${bgClass}`}>{children}</span>
}

