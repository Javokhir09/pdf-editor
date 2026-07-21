import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button type="button" className={`border border-black/40 size-8 cursor-pointer text-lg ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button