import { ArchitectureTree, type TreeNode } from '../../components/architecture-tree/ArchitectureTree'
import type { ModuleInfo } from './domain'

export function ArchitectureDiagram({ modules }: { modules: ModuleInfo[] }) {
  const moduleById = Object.fromEntries(modules.map((module) => [module.id, module]))
  const hasQueries = Boolean(moduleById.queries)
  const tree = createTree(hasQueries)
  return (
    <ArchitectureTree
      tree={tree}
      modules={modules}
      defaultExpanded={['src', 'app', 'features', 'users', 'components', 'services']}
      initialSelectedId="users"
    />
  )
}

function createTree(hasQueries: boolean): TreeNode {
  const usersChildren: TreeNode[] = [
    {
      id: 'users-components',
      name: 'components/',
      description: 'Componentes específicos da capacidade de usuários.',
    },
    { id: 'users-hooks', name: 'hooks/', description: 'Hooks que orquestram comportamento de usuários.' },
    { id: 'users-schemas', name: 'schemas/', description: 'Schemas e validações de entradas da feature.' },
  ]
  if (hasQueries)
    usersChildren.push({
      id: 'users-api',
      name: 'api/',
      description: 'Queries, mutations e query keys da feature.',
      moduleId: 'queries',
      children: [
        { id: 'users-query', name: 'useUsersQuery.ts', description: 'Consulta paginada de usuários.' },
        {
          id: 'users-mutation',
          name: 'useCreateUserMutation.ts',
          description: 'Mutation para criação de usuários.',
        },
      ],
    })
  return {
    id: 'src',
    name: 'src/',
    description: 'Código-fonte da aplicação.',
    children: [
      {
        id: 'app',
        name: 'app/',
        moduleId: 'app',
        children: [
          { id: 'providers', name: 'providers/', description: 'Providers de contexto global.' },
          { id: 'router', name: 'router/', description: 'Rotas e proteções de acesso.' },
          { id: 'app-file', name: 'App.tsx', description: 'Composição global da aplicação.' },
        ],
      },
      {
        id: 'pages',
        name: 'pages/',
        moduleId: 'pages',
        children: [
          { id: 'dashboard-page', name: 'DashboardPage.tsx', description: 'Entrada da rota de dashboard.' },
        ],
      },
      {
        id: 'features',
        name: 'features/',
        moduleId: 'features',
        children: [
          { id: 'auth', name: 'auth/', description: 'Capacidade de autenticação.' },
          { id: 'dashboard', name: 'dashboard/', description: 'Capacidade de dashboard.' },
          {
            id: 'users',
            name: 'users/',
            moduleId: 'features',
            description: 'Capacidade completa de gestão de usuários.',
            children: usersChildren,
          },
        ],
      },
      {
        id: 'components',
        name: 'components/',
        children: [
          {
            id: 'ui',
            name: 'ui/',
            moduleId: 'shared',
            children: [
              { id: 'button', name: 'Button.tsx', description: 'Primitivo visual reutilizável.' },
              { id: 'empty-state', name: 'EmptyState.tsx', description: 'Estado vazio reutilizável.' },
            ],
          },
        ],
      },
      {
        id: 'services',
        name: 'services/',
        moduleId: 'services',
        children: [
          {
            id: 'http-client',
            name: 'httpClient.ts',
            description: 'Cliente HTTP com interceptação de erros.',
          },
          {
            id: 'users-service',
            name: 'users.service.ts',
            description: 'Contrato REST do recurso de usuários.',
          },
        ],
      },
      { id: 'lib', name: 'lib/', description: 'Configurações e integrações compartilhadas.' },
      { id: 'types', name: 'types/', description: 'Tipos compartilhados entre domínios.' },
    ],
  }
}
