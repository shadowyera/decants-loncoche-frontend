import type { HTMLAttributes } from "react"
import { cn } from "../../utils/cn"

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "container mx-auto w-full",

        /* padding horizontal más suave para UI premium */
        "px-5 sm:px-6 lg:px-8",

        className
      )}
      {...props}
    />
  )
}