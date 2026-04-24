"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ContentCardProps {
  title: string
  description?: string
  category?: string
  href: string
  color?: "primary" | "accent" | "secondary"
  icon?: React.ReactNode
}

export function ContentCard({
  title,
  description,
  category,
  href,
  color = "primary",
  icon,
}: ContentCardProps) {
  const colorClasses = {
    primary: "from-primary/20 to-primary/5 hover:from-primary/30 hover:to-primary/10",
    accent: "from-accent/20 to-accent/5 hover:from-accent/30 hover:to-accent/10",
    secondary: "from-secondary to-secondary/50 hover:from-secondary/80 hover:to-secondary/30",
  }

  return (
    <Link href={href}>
      <Card
        className={cn(
          "group relative overflow-hidden border-0 bg-gradient-to-br transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
          colorClasses[color]
        )}
      >
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
          {icon}
        </div>
        <CardHeader className="pb-2">
          {category && (
            <Badge variant="secondary" className="w-fit text-xs">
              {category}
            </Badge>
          )}
          <CardTitle className="text-lg font-semibold text-foreground">
            {title}
          </CardTitle>
        </CardHeader>
        {description && (
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}
