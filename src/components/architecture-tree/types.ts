import type { ModuleInfo } from '../../features/architecture/domain'

export type TreeNode = {
  id: string
  name: string
  kind?: 'folder' | 'file'
  moduleId?: string
  description?: string
  children?: TreeNode[]
}

export type SelectedNode = { label: string; description: string; module?: ModuleInfo }
