import { ArchitectureTree } from '../../components/architecture-tree/ArchitectureTree'
import { createBuilderTree } from './builderTree'
import type { ModuleInfo } from './domain'

export function ArchitectureDiagram({ modules }: { modules: ModuleInfo[] }) {
  const hasQueries = modules.some((module) => module.id === 'queries')
  return (
    <ArchitectureTree
      tree={createBuilderTree(hasQueries)}
      modules={modules}
      defaultExpanded={['src', 'app', 'features', 'users', 'components', 'services']}
      initialSelectedId="users"
    />
  )
}
