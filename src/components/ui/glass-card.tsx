import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "./card"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: "cyan" | "emerald" | "teal"
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, gradient, children, ...props }, ref) => {
    return (
      <div className="relative group">
        {gradient && (
          <div
            className={cn(
              "absolute inset-0 rounded-xl opacity-50 blur-xl transition-all duration-300 group-hover:opacity-70",
              {
                "bg-gradient-cyan": gradient === "cyan",
                "bg-gradient-emerald": gradient === "emerald",
                "bg-gradient-teal": gradient === "teal",
              }
            )}
          />
        )}
        <Card
          ref={ref}
          className={cn(
            "relative glass-card",
            "transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]",
            className
          )}
          {...props}
        >
          {children}
        </Card>
      </div>
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }