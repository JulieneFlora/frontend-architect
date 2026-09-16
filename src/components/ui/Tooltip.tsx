import type { ReactNode } from 'react'

const positionClasses = {
  top: '-top-2 left-1/2 -translate-x-1/2 -translate-y-full',
  bottom: '-bottom-2 left-1/2 -translate-x-1/2 translate-y-full',
}

export function Tooltip({
  label,
  position = 'top',
  children,
}: {
  label: string
  position?: 'top' | 'bottom'
  children: ReactNode
}) {
  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute z-30 w-max max-w-52 rounded-md border border-border bg-panel-strong px-3 py-2 text-center text-xs leading-5 text-fg opacity-0 shadow-lg transition-opacity duration-150 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100 ${positionClasses[position]}`}
      >
        {label}
      </span>
    </span>
  )
}
