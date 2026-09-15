import type { ArchitectureChoices, ModuleInfo, Recommendation } from './domain'
const core: ModuleInfo[] = [
  {
    id: 'app',
    label: 'App',
    shortLabel: 'Configuração global',
    category: 'foundation',
    responsibility: 'Composição global: providers, roteamento e inicialização.',
    keep: 'Providers, configuração de rotas e boundaries.',
    avoid: 'Regras de produto e chamadas HTTP.',
    alternative: 'Um app shell por plataforma.',
    contents: ['App.tsx', 'providers/', 'router/', 'ErrorBoundary.tsx'],
    examples: ['QueryClientProvider', 'ThemeProvider', 'rotas protegidas'],
    dependsOn: [],
  },
  {
    id: 'pages',
    label: 'Pages',
    shortLabel: 'Rotas e composição',
    category: 'experience',
    responsibility: 'Orquestram uma rota e sua experiência de tela.',
    keep: 'Layout de página e composição de features.',
    avoid: 'Regras de domínio reutilizáveis.',
    alternative: 'Route modules quando suportados.',
    contents: ['DashboardPage.tsx', 'UsersPage.tsx', 'PageHeader.tsx'],
    examples: ['Ler params da rota', 'Compor UserList e UserFilters'],
    dependsOn: ['app', 'features', 'shared'],
  },
  {
    id: 'features',
    label: 'Features',
    shortLabel: 'Capacidades de produto',
    category: 'domain',
    responsibility: 'Agrupam comportamento por capacidade do produto.',
    keep: 'UI, hooks e regras de auth, usuários e dashboard.',
    avoid: 'Componentes puramente genéricos.',
    alternative: 'Organização por domínio em produtos maiores.',
    contents: ['users/components/', 'users/hooks/', 'users/schemas/', 'users/api/'],
    examples: ['Criar usuário', 'Filtrar pedidos', 'Aplicar permissão'],
    dependsOn: ['shared', 'services'],
  },
  {
    id: 'shared',
    label: 'Shared UI',
    shortLabel: 'Primitivos reutilizáveis',
    category: 'shared',
    responsibility: 'Blocos visuais sem conhecimento de negócio.',
    keep: 'Button, Dialog, Input e tokens.',
    avoid: 'Fluxos específicos de uma feature.',
    alternative: 'Design system publicado.',
    contents: ['Button.tsx', 'Input.tsx', 'Dialog.tsx', 'EmptyState.tsx'],
    examples: ['Variantes visuais', 'Acessibilidade', 'Tokens de design'],
    dependsOn: [],
  },
  {
    id: 'services',
    label: 'Services',
    shortLabel: 'Fronteira com backend',
    category: 'data',
    responsibility: 'Fronteira de I/O com REST API e serialização.',
    keep: 'Clientes HTTP, DTOs e mapeamentos.',
    avoid: 'Estado de interface.',
    alternative: 'BFF ou SDK gerado por OpenAPI.',
    contents: ['httpClient.ts', 'users.service.ts', 'dto/', 'mappers/'],
    examples: ['GET /users', 'mapUserDto', 'Normalizar ApiError'],
    dependsOn: [],
  },
]
export function generateRecommendation(choices: ArchitectureChoices): Recommendation {
  const modules = [...core]
  const reasons = [
    {
      title: 'Organização por feature',
      body: `Para ${choices.appType}, capacidades de negócio evoluem em ritmos diferentes. Co-localizar o que muda junto reduz acoplamento entre telas.`,
      tradeoff: 'Exige disciplina para promover abstrações realmente compartilhadas.',
    },
  ]
  const tree = [
    'src/',
    '├── app/  # providers e router',
    '├── pages/',
    '├── features/',
    '│   ├── auth/',
    '│   ├── dashboard/',
    '│   └── users/',
    '├── components/ui/',
    '├── lib/',
    '└── types/',
  ]
  if (choices.serverState === 'TanStack Query') {
    modules.push({
      id: 'queries',
      label: 'Query hooks',
      shortLabel: 'Cache e sincronização',
      category: 'data',
      responsibility: 'Modelam cache, loading, erro e invalidação de dados remotos.',
      keep: 'useQuery/useMutation por recurso dentro da feature.',
      avoid: 'Estado visual local.',
      alternative: 'Fetch direto em casos pequenos e sem cache.',
      contents: ['useUsersQuery.ts', 'useCreateUserMutation.ts', 'queryKeys.ts'],
      examples: ['Cache por query key', 'Invalidação após mutation', 'Retry e loading'],
      dependsOn: ['services'],
    })
    tree.splice(7, 0, '│   └── */api/  # queries e mutations')
    reasons.push({
      title: 'TanStack Query para server state',
      body: 'Dados remotos ganham cache, invalidação, refetch e estados previsíveis sem transformar o store global em cache HTTP.',
      tradeoff: 'Há convenções adicionais de query keys e invalidação.',
    })
  }
  if (choices.state !== 'Nenhum')
    reasons.push({
      title: `${choices.state} para estado cliente`,
      body: 'Use-o apenas para preferências, fluxos cross-page ou estado que não pertence ao servidor.',
      tradeoff: 'Um store global demais esconde dependências e dificulta testes.',
    })
  if (choices.forms === 'React Hook Form')
    reasons.push({
      title: 'Formulários orientados a performance',
      body: 'React Hook Form reduz renders e integra validação declarativa.',
      tradeoff: 'Formulários minúsculos podem ser mais claros com estado local.',
    })
  if (choices.validation === 'Zod')
    reasons.push({
      title: 'Contrato de validação com Zod',
      body: 'Schemas reutilizáveis validam entradas e mantêm tipos próximos ao contrato.',
      tradeoff: 'O schema precisa evoluir junto da API.',
    })
  return {
    title: `${choices.appType} orientado a features`,
    summary:
      'Uma base modular para evoluir o produto sem concentrar regra de negócio em páginas ou componentes compartilhados.',
    modules,
    reasons,
    tree,
    versions: [
      'React 19.2.x',
      'TypeScript 6.0.x',
      'TanStack Query 5.102.x',
      'React Hook Form 7.88.x',
      'Zod 4.6.x',
      'Última validação: 14/09/2026',
    ],
  }
}
