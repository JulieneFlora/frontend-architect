import type { ReactNode } from 'react'

const positionClasses = {
  top: '-top-2 -translate-y-full',
  bottom: '-bottom-2 translate-y-full',
}

// `end` alinha o balão pela direita do gatilho: sem isso ele estoura a viewport
// quando o gatilho fica colado na borda, como no botão do header.
const alignClasses = {
  center: 'left-1/2 -translate-x-1/2',
  end: 'right-0',
}

export function Tooltip({
  label,
  position = 'top',
  align = 'center',
  children,
}: {
  label: string
  position?: 'top' | 'bottom'
  align?: 'center' | 'end'
  children: ReactNode
}) {
  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute z-30 hidden w-max max-w-52 rounded-md border border-border bg-panel-strong px-3 py-2 text-center text-xs leading-5 text-fg opacity-0 shadow-lg transition-opacity duration-150 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100 sm:block ${positionClasses[position]} ${alignClasses[align]}`}
      >
        {label}
      </span>
    </span>
  )
}
