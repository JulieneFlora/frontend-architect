import type { ElementType, ReactNode } from 'react'

// flex-col: a barra de título tem altura fixa e o conteúdo ocupa o espaço
// restante (flex-1), então um `h-full` no conteúdo não vaza pra fora do card.
export function WindowFrame({
  as: Component = 'div',
  title,
  className = '',
  contentClassName = 'p-5',
  children,
}: {
  as?: ElementType
  title?: string
  className?: string
  contentClassName?: string
  children: ReactNode
}) {
  return (
    <Component
      className={`flex flex-col overflow-hidden rounded-xl border border-border bg-panel ${className}`}
    >
      <div className="flex shrink-0 items-center gap-1.5 border-b border-border bg-panel-strong px-4 py-2.5">
        <Dot color="var(--traffic-red)" />
        <Dot color="var(--traffic-yellow)" />
        <Dot color="var(--traffic-green)" />
        {title && <span className="ml-2 truncate font-mono text-[11px] text-fg-subtle">{title}</span>}
      </div>
      <div className={`min-h-0 flex-1 ${contentClassName}`}>{children}</div>
    </Component>
  )
}

function Dot({ color }: { color: string }) {
  return (
    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: color }} />
  )
}
