import { ChevronDown, ChevronRight, FileCode2, Folder, FolderOpen, Info, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import type { ModuleInfo } from '../../features/architecture/domain'
import { WindowFrame } from '../ui/WindowFrame'

export type TreeNode = {
  id: string
  name: string
  kind?: 'folder' | 'file'
  moduleId?: string
  description?: string
  children?: TreeNode[]
}
type SelectedNode = { label: string; description: string; module?: ModuleInfo }

export function ArchitectureTree({
  tree,
  modules,
  defaultExpanded,
  initialSelectedId,
}: {
  tree: TreeNode
  modules: ModuleInfo[]
  defaultExpanded?: string[]
  initialSelectedId?: string
}) {
  const moduleById = Object.fromEntries(modules.map((module) => [module.id, module]))
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries((defaultExpanded ?? [tree.id]).map((id) => [id, true])),
  )
  const initialNode = initialSelectedId ? findNode(tree, initialSelectedId) : (tree.children?.[0] ?? tree)
  const [selected, setSelected] = useState<SelectedNode>({
    label: initialNode?.name ?? tree.name,
    description: initialNode?.description ?? 'Selecione um item para ver detalhes.',
    module: initialNode?.moduleId ? moduleById[initialNode.moduleId] : undefined,
  })
  const toggle = (id: string) => setExpanded((previous) => ({ ...previous, [id]: !previous[id] }))
  const select = (node: TreeNode) =>
    setSelected({
      label: node.name,
      description: node.description ?? 'Arquivo de suporte para manter a responsabilidade do módulo clara.',
      module: node.moduleId ? moduleById[node.moduleId] : undefined,
    })

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,.75fr)]">
      <WindowFrame>
        <p className="mb-4 flex items-start gap-2 text-xs leading-5 text-fg-subtle">
          <Info size={15} className="mt-0.5 shrink-0 text-fg-subtle" />
          Clique em uma pasta para entender sua responsabilidade. Use a seta para expandir ou recolher o
          conteúdo.
        </p>
        <div className="rounded-lg border border-[#26262e] bg-[#0b0b0e] p-4 font-mono text-[13px] leading-7 text-[#d6d6dd]">
          <TreeBranch
            nodes={[tree]}
            level={0}
            expanded={expanded}
            onToggle={toggle}
            onSelect={select}
            selected={selected.label}
          />
        </div>
      </WindowFrame>
      <ArchitectureInspector selected={selected} />
    </section>
  )
}

export function collectFolderIds(node: TreeNode): string[] {
  if (!node.children) return []
  return [node.id, ...node.children.flatMap(collectFolderIds)]
}

function findNode(node: TreeNode, id: string): TreeNode | undefined {
  if (node.id === id) return node
  for (const child of node.children ?? []) {
    const found = findNode(child, id)
    if (found) return found
  }
  return undefined
}

function TreeBranch({
  nodes,
  level,
  expanded,
  onToggle,
  onSelect,
  selected,
}: {
  nodes: TreeNode[]
  level: number
  expanded: Record<string, boolean>
  onToggle: (id: string) => void
  onSelect: (node: TreeNode) => void
  selected: string
}) {
  return (
    <ul
      role={level === 0 ? 'tree' : 'group'}
      className={level > 0 ? 'ml-5 border-l border-[#26262e] pl-3' : ''}
    >
      {nodes.map((node) => {
        const isFolder = node.kind === 'folder' || node.name.endsWith('/')
        const isOpen = expanded[node.id]
        const isSelected = isFolder && selected === node.name
        return (
          <li key={node.id}>
            <div
              className={`flex min-h-8 items-center gap-1 rounded-md px-1 transition ${isSelected ? 'bg-[#9a8cff]/20 text-white' : isFolder ? 'text-[#d6d6dd] hover:bg-white/5' : 'text-[#75757f]'}`}
            >
              <button
                type="button"
                onClick={() => isFolder && onToggle(node.id)}
                aria-label={isFolder ? `${isOpen ? 'Recolher' : 'Expandir'} ${node.name}` : undefined}
                className="grid h-6 w-5 place-items-center text-[#75757f] disabled:opacity-0"
                disabled={!isFolder}
              >
                {isFolder && (isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
              </button>
              {isFolder ? (
                <button
                  type="button"
                  onClick={() => onSelect(node)}
                  className="flex flex-1 items-center gap-2 py-1 text-left"
                >
                  <TreeIcon folder open={isOpen} />
                  <span>{node.name}</span>
                  {node.moduleId && (
                    <span className="ml-auto hidden text-[10px] text-[#75757f] sm:inline">
                      {node.moduleId}
                    </span>
                  )}
                </button>
              ) : (
                <span className="flex flex-1 cursor-default items-center gap-2 py-1">
                  <TreeIcon folder={false} />
                  <span>{node.name}</span>
                </span>
              )}
            </div>
            {isFolder && isOpen && node.children && (
              <TreeBranch
                nodes={node.children}
                level={level + 1}
                expanded={expanded}
                onToggle={onToggle}
                onSelect={onSelect}
                selected={selected}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}
function TreeIcon({ folder, open }: { folder: boolean; open?: boolean }) {
  const Icon = folder ? (open ? FolderOpen : Folder) : FileCode2
  return (
    <Icon
      size={15}
      className={folder ? 'shrink-0 text-highlight-orange' : 'shrink-0 text-[#75757f]'}
      aria-hidden="true"
    />
  )
}

function ArchitectureInspector({ selected }: { selected: SelectedNode }) {
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
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 font-mono text-xs leading-5 text-fg-muted">
            <span className="text-fg-subtle">›</span>
            {item}
          </li>
        ))}
      </ul>
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
