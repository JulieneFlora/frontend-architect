import { type MouseEvent, type ReactNode, useState } from 'react'
import { useNavigate } from 'react-router'

// Preserva Ctrl/Cmd/Shift/clique do meio para abrir em nova aba.
export function CardLink({
  to,
  className = '',
  children,
}: {
  to: string
  className?: string
  children: ReactNode
}) {
  const navigate = useNavigate()
  const [pressed, setPressed] = useState(false)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setPressed(true)
    window.setTimeout(() => navigate(to), 170)
  }

  return (
    <a
      href={to}
      onClick={handleClick}
      className={`group block transform-gpu transition-transform duration-200 ease-out ${pressed ? '-translate-y-3' : 'hover:-translate-y-1'} ${className}`}
    >
      {children}
    </a>
  )
}
