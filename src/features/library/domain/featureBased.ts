import type { ArchitecturePattern } from './types'

export const featureBased: ArchitecturePattern = {
  id: 'feature-based',
  name: 'Arquitetura por Features (Feature-Based)',
  shortName: 'Feature-Based',
  tagline: 'Organiza o código pelo que ele faz no produto, não pela camada técnica.',
  origin:
    'Popularizada em comunidades React e Angular como reação a estruturas "por tipo de arquivo" (todos os componentes juntos, todos os reducers juntos) que ficam difíceis de navegar em SPAs grandes.',
  summary:
    'Cada capacidade de produto (usuários, pedidos, autenticação) ganha uma pasta própria com tudo que ela precisa: componentes, hooks, chamadas de API e validações. Código que muda junto fica junto, e o que é genérico o suficiente para todas as features vive em uma camada compartilhada.',
  whenToUse: [
    'Produtos com várias capacidades de negócio que evoluem em ritmos diferentes (SaaS, dashboards, sistemas administrativos).',
    'Times com mais de uma pessoa, onde cada um trabalha em uma feature sem pisar no código dos outros.',
    'Bases de código que crescem ao longo de anos e precisam permanecer navegáveis.',
  ],
  avoidWhen: [
    'Protótipos pequenos e de vida curta, onde a organização por features é overhead sem benefício.',
    'Aplicações com pouquíssimas telas, onde uma estrutura mais simples já é suficiente.',
  ],
  tradeoffs: [
    {
      title: 'Acoplamento entre telas cai',
      body: 'Mudar a feature de pedidos não arrisca quebrar a de usuários, porque elas não compartilham estado nem componentes internos.',
    },
    {
      title: 'Exige disciplina para compartilhar',
      body: 'É fácil duplicar componentes "quase iguais" entre features. Promover algo para a camada compartilhada exige critério: só sobe quando o reuso é real, não hipotético.',
    },
    {
      title: 'Fronteiras nem sempre são óbvias',
      body: 'Uma funcionalidade que cruza duas features (ex: notificações que aparecem em pedidos e usuários) exige uma decisão explícita de onde ela mora.',
    },
  ],
  tree: {
    id: 'src',
    name: 'src/',
    description: 'Código-fonte da aplicação.',
    children: [
      {
        id: 'app',
        name: 'app/',
        moduleId: 'fb-app',
        children: [
          {
            id: 'app-providers',
            name: 'providers/',
            description: 'Providers de contexto global (tema, autenticação, cliente de dados).',
          },
          { id: 'app-router', name: 'router/', description: 'Definição de rotas e proteção de acesso.' },
          { id: 'app-file', name: 'App.tsx', description: 'Composição raiz: monta providers e router.' },
        ],
      },
      {
        id: 'pages',
        name: 'pages/',
        moduleId: 'fb-pages',
        children: [
          {
            id: 'orders-page',
            name: 'OrdersPage.tsx',
            description: 'Entrada da rota de pedidos; compõe a feature orders.',
          },
          {
            id: 'users-page',
            name: 'UsersPage.tsx',
            description: 'Entrada da rota de usuários; compõe a feature users.',
          },
        ],
      },
      {
        id: 'features',
        name: 'features/',
        moduleId: 'fb-features',
        children: [
          {
            id: 'orders',
            name: 'orders/',
            moduleId: 'fb-features',
            description: 'Tudo que a capacidade de pedidos precisa.',
            children: [
              {
                id: 'orders-components',
                name: 'components/',
                description: 'UI específica de pedidos: tabela, filtros, badge de status.',
              },
              {
                id: 'orders-hooks',
                name: 'hooks/',
                description: 'Hooks que orquestram comportamento de pedidos.',
              },
              {
                id: 'orders-api',
                name: 'api/',
                description: 'Queries e mutations do recurso de pedidos.',
                moduleId: 'fb-queries',
              },
              {
                id: 'orders-schemas',
                name: 'schemas.ts',
                description: 'Validação Zod dos formulários de pedidos.',
              },
            ],
          },
          {
            id: 'users',
            name: 'users/',
            moduleId: 'fb-features',
            description: 'Tudo que a capacidade de usuários precisa.',
            children: [
              {
                id: 'users-components',
                name: 'components/',
                description: 'UI específica de usuários: lista, formulário, avatar.',
              },
              {
                id: 'users-hooks',
                name: 'hooks/',
                description: 'Hooks que orquestram comportamento de usuários.',
              },
              {
                id: 'users-api',
                name: 'api/',
                description: 'Queries e mutations do recurso de usuários.',
                moduleId: 'fb-queries',
              },
            ],
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
            moduleId: 'fb-shared',
            children: [
              {
                id: 'button',
                name: 'Button.tsx',
                description: 'Primitivo visual reutilizável, sem regra de negócio.',
              },
              { id: 'dialog', name: 'Dialog.tsx', description: 'Modal reutilizável entre features.' },
            ],
          },
        ],
      },
      {
        id: 'services',
        name: 'services/',
        moduleId: 'fb-services',
        children: [
          {
            id: 'http-client',
            name: 'httpClient.ts',
            description: 'Cliente HTTP central com interceptação de erros.',
          },
        ],
      },
    ],
  },
  modules: [
    {
      id: 'fb-app',
      responsibility: 'Composição global: providers, roteamento e inicialização.',
      keep: 'Providers, configuração de rotas e error boundaries.',
      avoid: 'Regras de produto e chamadas HTTP diretas.',
      alternative: 'Um app shell por plataforma, se houver web e mobile no mesmo monorepo.',
      contents: ['App.tsx', 'providers/', 'router/'],
      examples: ['Montar QueryClientProvider', 'Registrar rotas protegidas'],
    },
    {
      id: 'fb-pages',
      responsibility: 'Orquestram uma rota, lendo params e compondo a feature correspondente.',
      keep: 'Layout de página e composição de componentes de feature.',
      avoid: 'Regras de domínio reutilizáveis ou lógica de negócio.',
      alternative: 'Route modules, quando o framework de roteamento suportar loaders/actions.',
      contents: ['OrdersPage.tsx', 'UsersPage.tsx'],
      examples: ['Ler parâmetros da URL', 'Compor lista + filtros de uma feature'],
    },
    {
      id: 'fb-features',
      responsibility: 'Agrupam UI, hooks e regras de uma capacidade específica do produto.',
      keep: 'Componentes, hooks, schemas e chamadas de API específicos da feature.',
      avoid:
        'Componentes genéricos demais para viverem só aqui: isso é sinal de que devem subir para shared.',
      alternative: 'Domínios mais ricos (DDD) em produtos com regras de negócio complexas.',
      contents: ['orders/components/', 'orders/hooks/', 'orders/api/', 'users/components/'],
      examples: ['Criar pedido', 'Filtrar usuários por status', 'Aplicar permissão de edição'],
    },
    {
      id: 'fb-queries',
      responsibility: 'Modelam cache, loading, erro e invalidação de dados remotos dentro da feature.',
      keep: 'useQuery/useMutation por recurso, com query keys próximas do uso.',
      avoid: 'Estado puramente visual, que não veio do servidor.',
      alternative: 'Fetch direto em casos pequenos, sem necessidade de cache.',
      contents: ['useOrdersQuery.ts', 'useCreateOrderMutation.ts', 'queryKeys.ts'],
      examples: ['Cache por query key', 'Invalidação após mutation', 'Retry automático'],
    },
    {
      id: 'fb-shared',
      responsibility: 'Blocos visuais sem conhecimento de negócio, usados por várias features.',
      keep: 'Button, Dialog, Input, tokens de design.',
      avoid: 'Fluxos específicos de uma única feature.',
      alternative: 'Design system publicado como pacote separado, em produtos maiores.',
      contents: ['Button.tsx', 'Dialog.tsx', 'Input.tsx'],
      examples: ['Variantes visuais', 'Acessibilidade', 'Tokens de espaçamento e cor'],
    },
    {
      id: 'fb-services',
      responsibility: 'Fronteira de I/O com a API: clientes HTTP, DTOs e normalização de erros.',
      keep: 'Clientes HTTP, mapeamento de DTO para modelo de UI.',
      avoid: 'Estado de interface ou cache: isso é responsabilidade dos query hooks.',
      alternative: 'BFF ou SDK gerado a partir de um contrato OpenAPI.',
      contents: ['httpClient.ts', 'apiError.ts'],
      examples: ['Normalizar erros HTTP', 'Configurar base URL e headers'],
    },
  ],
}
