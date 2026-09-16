import type { TreeNode } from '../../../components/architecture-tree/types'
import type { ModuleInfo } from '../../architecture/domain'

export type ComposedExampleStep = {
  level: string
  file: string
  explanation: string
  code: string
}
export type ComposedExample = {
  title: string
  description: string
  steps: ComposedExampleStep[]
}
export type ArchitecturePattern = {
  id: string
  name: string
  shortName: string
  tagline: string
  origin: string
  summary: string
  whenToUse: string[]
  avoidWhen: string[]
  tradeoffs: { title: string; body: string }[]
  tree: TreeNode
  modules: ModuleInfo[]
  example?: ComposedExample
}

export type UpcomingArchitecturePattern = {
  id: string
  shortName: string
  tagline: string
}
