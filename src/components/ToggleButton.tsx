import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean
}

function ToggleButton({ children, className = "", pressed = false, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      aria-pressed={pressed}
      className={`border border-black/40 size-8 cursor-pointer text-lg ${pressed ? "bg-gray-200/80" : ""} ${className}`}
    >
      {children}
    </button>
  )
}

export default ToggleButton