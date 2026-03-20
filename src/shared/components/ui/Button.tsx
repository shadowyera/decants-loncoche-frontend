import type { ButtonHTMLAttributes } from "react"
import { cn } from "../../utils/cn"

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {

  const variants = {

    primary:
      [
        "bg-gradient-to-b",
        "from-[hsl(var(--gold-grad-a))]",
        "to-[hsl(var(--gold-grad-b))]",
        "text-[hsl(var(--color-warm-white))]",
        "shadow-sm",
        "hover:shadow-md",
        "hover:-translate-y-[1px]",
        "active:translate-y-0",
      ].join(" "),

    secondary:
      [
        "border",
        "border-border",
        "bg-surface",
        "text-text",
        "hover:border-accent/40",
        "hover:bg-surfaceSoft",
      ].join(" "),

    ghost:
      [
        "text-muted",
        "hover:text-text",
        "hover:bg-surfaceSoft/40",
      ].join(" "),

    outline:
      [
        "border",
        "border-accent",
        "text-accent",
        "hover:bg-accent",
        "hover:text-black",
      ].join(" "),
  }

  const sizes = {

    sm: "px-3 py-1.5 text-sm",

    md: "px-4 py-2 text-sm",

    lg: "px-5 py-2.5 text-base",
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-lg font-medium",
        "transition-all duration-normal ease-premium",
        "cursor-pointer",
        "disabled:opacity-50 disabled:pointer-events-none",
        "focus:outline-none focus:ring-2 focus:ring-accent/30",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
}