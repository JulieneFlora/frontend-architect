import { Info } from 'lucide-react'
import { useState } from 'react'
import type { ModuleInfo } from '../../features/architecture/domain'
import { WindowFrame } from '../ui/WindowFrame'
import { ArchitectureInspector } from './ArchitectureInspector'
import { TreeBranch } from './TreeBranch'
import type { SelectedNode, TreeNode } from './types'

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
        <div className="overflow-x-auto rounded-lg border border-[#26262e] bg-[#0b0b0e] p-3 font-mono text-[13px] leading-7 text-[#d6d6dd] sm:p-4">
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
