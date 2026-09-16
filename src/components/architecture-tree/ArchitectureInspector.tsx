import { FolderOpen, Info, type LucideIcon } from 'lucide-react'
import { ArrowList } from '../ui/ArrowList'
import { WindowFrame } from '../ui/WindowFrame'
import type { SelectedNode } from './types'

export function ArchitectureInspector({ selected }: { selected: SelectedNode }) {
  const module = selected.module
  return (
    <WindowFrame as="aside" title="inspector">
      <p aria-live="polite" className="break-all font-mono text-lg font-semibold text-fg">
        {selected.label}
      </p>
      <p className="mt-4 text-sm leading-6 text-fg-muted">{module?.responsibility ?? selected.description}</p>
      {module && (
        <>
          <InspectorSection icon={FolderOpen} title="O que deve existir aqui" items={module.contents} />
          <InspectorSection icon={Info} title="Responsabilidades" items={module.examples} />
          <div className="mt-6 space-y-3 border-t border-border pt-5">
            <Rule title="Inclua" text={module.keep} />
            <Rule title="Evite" text={module.avoid} />
            <Rule title="Alternativa" text={module.alternative} />
          </div>
        </>
      )}
    </WindowFrame>
  )
}

function InspectorSection({
  icon: Icon,
  title,
  items,
}: {
  icon: LucideIcon
  title: string
  items: string[]
}) {
  return (
    <section className="mt-6">
      <div className="flex items-center gap-2">
        <Icon size={15} className="text-fg-subtle" />
        <h4 className="text-sm font-semibold text-fg">{title}</h4>
      </div>
      <ArrowList items={items} className="mt-3 space-y-2 font-mono text-xs leading-5 text-fg-muted" />
    </section>
  )
}

function Rule({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-fg-subtle">{title}</p>
      <p className="mt-1 text-sm leading-5 text-fg-muted">{text}</p>
    </div>
  )
}
