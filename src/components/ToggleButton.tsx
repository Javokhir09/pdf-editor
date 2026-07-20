import { useState, type ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function ToggleButton({ children, className = "", ...props }: ButtonProps) {
  const [toggled, setToggled] = useState<boolean>(false)

  return (
    <button 
      {...props}
      className={`border border-black/40 size-8 cursor-pointer text-lg ${toggled ? "bg-gray-200/80" : ""} ${className}`} 
      onClick={(e) => {setToggled((prev) => !prev); props.onClick?.(e)}} 
    >
      {children}
    </button>
  )
}

export default ToggleButton