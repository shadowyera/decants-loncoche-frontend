import type { HTMLAttributes } from "react"
import { clsx } from "clsx"

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-surface",
        "border border-border",
        "rounded-xl",

        "shadow-sm",

        "transition-all duration-normal ease-premium",

        "hover:bg-surfaceSoft",
        "hover:border-accent/40",
        "hover:shadow-md",
        "hover:-translate-y-1",

        className
      )}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "p-6",
        className
      )}
      {...props}
    />
  )
}