import type { ReactNode } from "react"

interface SiteLayoutProps {
  children: ReactNode
}

export const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
    </div>
  )
}

