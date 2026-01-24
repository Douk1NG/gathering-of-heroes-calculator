import * as React from "react"
import { cn } from "../../lib/utils"

const Progress = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value?: number }
>(({ className, value, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "relative h-3 w-full overflow-hidden rounded-full bg-white/10",
            className
        )}
        {...props}
    >
        <div
            className="h-full w-full flex-1 bg-linear-to-r from-yellow-600 to-yellow-400 transition-all duration-500 ease-out"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </div>
))
Progress.displayName = "Progress"

export { Progress }
