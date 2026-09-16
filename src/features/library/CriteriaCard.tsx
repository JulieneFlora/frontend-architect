import type { LucideIcon } from 'lucide-react'
import { ArrowList } from '../../components/ui/ArrowList'
import { WindowFrame } from '../../components/ui/WindowFrame'

export function CriteriaCard({
  icon: Icon,
  iconClassName,
  title,
  items,
}: {
  icon: LucideIcon
  iconClassName: string
  title: string
  items: string[]
}) {
  return (
    <WindowFrame>
      <h2 className="flex items-center gap-2 font-semibold text-fg">
        <Icon size={16} className={iconClassName} /> {title}
      </h2>
      <ArrowList items={items} className="mt-4 space-y-3 text-sm leading-6 text-fg-muted" />
    </WindowFrame>
  )
}
