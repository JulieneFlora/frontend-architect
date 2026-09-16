import { ChevronDown, ChevronRight, FileCode2, Folder, FolderOpen } from 'lucide-react'
import type { TreeNode } from './types'

export function TreeBranch({
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
      className={level > 0 ? 'ml-2 border-l border-[#26262e] pl-2 sm:ml-5 sm:pl-3' : ''}
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
