import type { TreeNode } from '../../components/architecture-tree/ArchitectureTree'
import type { ModuleInfo } from '../architecture/domain'

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

const featureBased: ArchitecturePattern = {
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
      label: 'App',
      shortLabel: 'Configuração global',
      category: 'foundation',
      responsibility: 'Composição global: providers, roteamento e inicialização.',
      keep: 'Providers, configuração de rotas e error boundaries.',
      avoid: 'Regras de produto e chamadas HTTP diretas.',
      alternative: 'Um app shell por plataforma, se houver web e mobile no mesmo monorepo.',
      contents: ['App.tsx', 'providers/', 'router/'],
      examples: ['Montar QueryClientProvider', 'Registrar rotas protegidas'],
      dependsOn: [],
    },
    {
      id: 'fb-pages',
      label: 'Pages',
      shortLabel: 'Rotas e composição',
      category: 'experience',
      responsibility: 'Orquestram uma rota, lendo params e compondo a feature correspondente.',
      keep: 'Layout de página e composição de componentes de feature.',
      avoid: 'Regras de domínio reutilizáveis ou lógica de negócio.',
      alternative: 'Route modules, quando o framework de roteamento suportar loaders/actions.',
      contents: ['OrdersPage.tsx', 'UsersPage.tsx'],
      examples: ['Ler parâmetros da URL', 'Compor lista + filtros de uma feature'],
      dependsOn: ['fb-app', 'fb-features', 'fb-shared'],
    },
    {
      id: 'fb-features',
      label: 'Features',
      shortLabel: 'Capacidades de produto',
      category: 'domain',
      responsibility: 'Agrupam UI, hooks e regras de uma capacidade específica do produto.',
      keep: 'Componentes, hooks, schemas e chamadas de API específicos da feature.',
      avoid:
        'Componentes genéricos demais para viverem só aqui: isso é sinal de que devem subir para shared.',
      alternative: 'Domínios mais ricos (DDD) em produtos com regras de negócio complexas.',
      contents: ['orders/components/', 'orders/hooks/', 'orders/api/', 'users/components/'],
      examples: ['Criar pedido', 'Filtrar usuários por status', 'Aplicar permissão de edição'],
      dependsOn: ['fb-shared', 'fb-services'],
    },
    {
      id: 'fb-queries',
      label: 'Query hooks',
      shortLabel: 'Cache e sincronização',
      category: 'data',
      responsibility: 'Modelam cache, loading, erro e invalidação de dados remotos dentro da feature.',
      keep: 'useQuery/useMutation por recurso, com query keys próximas do uso.',
      avoid: 'Estado puramente visual, que não veio do servidor.',
      alternative: 'Fetch direto em casos pequenos, sem necessidade de cache.',
      contents: ['useOrdersQuery.ts', 'useCreateOrderMutation.ts', 'queryKeys.ts'],
      examples: ['Cache por query key', 'Invalidação após mutation', 'Retry automático'],
      dependsOn: ['fb-services'],
    },
    {
      id: 'fb-shared',
      label: 'Shared UI',
      shortLabel: 'Primitivos reutilizáveis',
      category: 'shared',
      responsibility: 'Blocos visuais sem conhecimento de negócio, usados por várias features.',
      keep: 'Button, Dialog, Input, tokens de design.',
      avoid: 'Fluxos específicos de uma única feature.',
      alternative: 'Design system publicado como pacote separado, em produtos maiores.',
      contents: ['Button.tsx', 'Dialog.tsx', 'Input.tsx'],
      examples: ['Variantes visuais', 'Acessibilidade', 'Tokens de espaçamento e cor'],
      dependsOn: [],
    },
    {
      id: 'fb-services',
      label: 'Services',
      shortLabel: 'Fronteira com backend',
      category: 'data',
      responsibility: 'Fronteira de I/O com a API: clientes HTTP, DTOs e normalização de erros.',
      keep: 'Clientes HTTP, mapeamento de DTO para modelo de UI.',
      avoid: 'Estado de interface ou cache: isso é responsabilidade dos query hooks.',
      alternative: 'BFF ou SDK gerado a partir de um contrato OpenAPI.',
      contents: ['httpClient.ts', 'apiError.ts'],
      examples: ['Normalizar erros HTTP', 'Configurar base URL e headers'],
      dependsOn: [],
    },
  ],
}

const atomicDesign: ArchitecturePattern = {
  id: 'atomic-design',
  name: 'Atomic Design',
  shortName: 'Atomic Design',
  tagline: 'Componentes de UI organizados em uma hierarquia de complexidade crescente.',
  origin:
    'Criado por Brad Frost em 2013 como metodologia para sistemas de design, adaptado depois para estrutura de pastas em projetos React, Vue e afins.',
  summary:
    'A interface é decomposta em cinco níveis (átomos, moléculas, organismos, templates e páginas), onde cada nível é construído combinando o anterior. É uma arquitetura focada em componentes visuais e no vocabulário de um design system, não em regras de negócio.',
  whenToUse: [
    'Produtos com um design system próprio ou a intenção de construir um, onde consistência visual é prioridade.',
    'Times com designers e desenvolvedores colaborando com uma linguagem visual compartilhada.',
    'Bibliotecas de componentes que serão publicadas e reusadas em múltiplos produtos.',
  ],
  avoidWhen: [
    'Aplicações com lógica de negócio complexa: Atomic Design não diz nada sobre onde colocar regras de domínio, então costuma ser combinado com outra arquitetura para isso.',
    'Times pequenos sem preocupação com design system, onde a categorização em 5 níveis vira burocracia.',
  ],
  tradeoffs: [
    {
      title: 'Vocabulário visual compartilhado',
      body: 'Designers e desenvolvedores passam a falar a mesma língua: "esse organismo" em vez de "aquele componente lá".',
    },
    {
      title: 'Categorizar é subjetivo',
      body: 'A linha entre molécula e organismo nem sempre é clara, e times gastam tempo debatendo em qual pasta um componente deveria estar.',
    },
    {
      title: 'Não resolve onde fica a lógica de negócio',
      body: 'Atomic Design organiza UI, não domínio. Times costumam combiná-lo com uma estrutura por features para as regras de produto.',
    },
  ],
  tree: {
    id: 'src',
    name: 'src/',
    description: 'Código-fonte da aplicação.',
    children: [
      {
        id: 'components',
        name: 'components/',
        description: 'Biblioteca de componentes organizada por complexidade.',
        children: [
          {
            id: 'atoms',
            name: 'atoms/',
            moduleId: 'ad-atoms',
            children: [
              {
                id: 'button',
                name: 'Button.tsx',
                description: 'Elemento indivisível: um botão com variantes visuais.',
              },
              {
                id: 'input',
                name: 'Input.tsx',
                description: 'Campo de texto sem validação ou label acoplados.',
              },
              { id: 'icon', name: 'Icon.tsx', description: 'Wrapper de ícones do design system.' },
            ],
          },
          {
            id: 'molecules',
            name: 'molecules/',
            moduleId: 'ad-molecules',
            children: [
              {
                id: 'search-field',
                name: 'SearchField.tsx',
                description: 'Combina Input + Icon + Button em um campo de busca.',
              },
              {
                id: 'form-field',
                name: 'FormField.tsx',
                description:
                  'Combina label + Input + mensagem de erro. Usada no exemplo prático de login abaixo.',
              },
            ],
          },
          {
            id: 'organisms',
            name: 'organisms/',
            moduleId: 'ad-organisms',
            children: [
              {
                id: 'header',
                name: 'SiteHeader.tsx',
                description: 'Cabeçalho completo: logo, navegação e busca.',
              },
              {
                id: 'user-table',
                name: 'UserTable.tsx',
                description: 'Tabela com paginação, ordenação e ações por linha.',
              },
              {
                id: 'login-form',
                name: 'LoginForm.tsx',
                description:
                  'Duas moléculas FormField (email e senha) mais um Button, compostos em um formulário. Veja o exemplo prático completo abaixo.',
              },
            ],
          },
        ],
      },
      {
        id: 'templates',
        name: 'templates/',
        moduleId: 'ad-templates',
        children: [
          {
            id: 'dashboard-template',
            name: 'DashboardTemplate.tsx',
            description: 'Esqueleto de layout: onde cabeçalho, sidebar e conteúdo ficam, sem dados reais.',
          },
          {
            id: 'auth-template',
            name: 'AuthTemplate.tsx',
            description:
              'Esqueleto de layout para telas de autenticação: coluna de branding + área central para o formulário. Veja o exemplo prático completo abaixo.',
          },
        ],
      },
      {
        id: 'pages',
        name: 'pages/',
        moduleId: 'ad-pages',
        children: [
          {
            id: 'dashboard-page',
            name: 'DashboardPage.tsx',
            description: 'Preenche o template com dados reais e conecta à API.',
          },
          {
            id: 'login-page',
            name: 'LoginPage.tsx',
            description:
              'Conecta o LoginForm (organismo) à API de autenticação dentro do AuthTemplate. Veja o exemplo prático completo abaixo.',
          },
        ],
      },
    ],
  },
  modules: [
    {
      id: 'ad-atoms',
      label: 'Atoms',
      shortLabel: 'Elementos indivisíveis',
      category: 'shared',
      responsibility:
        'Menores blocos de UI: não podem ser quebrados em partes menores sem deixar de ter função.',
      keep: 'Botões, inputs, labels, ícones, cada um com uma única responsabilidade visual.',
      avoid: 'Qualquer composição de mais de um elemento ou lógica de negócio.',
      alternative: 'Importar de uma biblioteca de UI headless (Radix, Ark UI) e estilizar por cima.',
      contents: ['Button.tsx', 'Input.tsx', 'Icon.tsx', 'Badge.tsx'],
      examples: ['Variantes de cor e tamanho', 'Estados de foco e desabilitado'],
      dependsOn: [],
    },
    {
      id: 'ad-molecules',
      label: 'Molecules',
      shortLabel: 'Combinações simples',
      category: 'shared',
      responsibility: 'Agrupam poucos átomos para formar uma unidade funcional simples.',
      keep: 'Combinações reutilizáveis como campo de busca ou campo de formulário com label e erro.',
      avoid: 'Regras de negócio ou chamadas de API.',
      alternative: 'Pular direto para organismos em design systems mais enxutos.',
      contents: ['SearchField.tsx', 'FormField.tsx', 'Card.tsx'],
      examples: ['Validação visual de um campo', 'Combinar ícone e texto em um chip'],
      dependsOn: ['ad-atoms'],
    },
    {
      id: 'ad-organisms',
      label: 'Organisms',
      shortLabel: 'Seções completas de UI',
      category: 'experience',
      responsibility: 'Seções complexas e reconhecíveis da interface, muitas vezes já conectadas a dados.',
      keep: 'Cabeçalhos, tabelas completas, formulários inteiros.',
      avoid: 'Regras de roteamento: isso é responsabilidade da página.',
      alternative: 'Dividir um organismo grande demais em organismos menores e mais focados.',
      contents: ['SiteHeader.tsx', 'UserTable.tsx', 'CheckoutForm.tsx'],
      examples: ['Tabela com paginação', 'Formulário com múltiplos campos e submissão'],
      dependsOn: ['ad-molecules', 'ad-atoms'],
    },
    {
      id: 'ad-templates',
      label: 'Templates',
      shortLabel: 'Esqueleto de layout',
      category: 'experience',
      responsibility: 'Definem a disposição de organismos na página, sem dados reais, só a estrutura.',
      keep: 'Grid de layout, posicionamento de header/sidebar/conteúdo.',
      avoid: 'Buscar dados ou conhecer a origem do conteúdo que vai preenchê-los.',
      alternative:
        'Compor o layout direto na página, em projetos pequenos sem múltiplas variações de layout.',
      contents: ['DashboardTemplate.tsx', 'AuthTemplate.tsx'],
      examples: ['Layout responsivo com sidebar colapsável', 'Slots para conteúdo variável'],
      dependsOn: ['ad-organisms'],
    },
    {
      id: 'ad-pages',
      label: 'Pages',
      shortLabel: 'Instâncias com dados reais',
      category: 'domain',
      responsibility: 'Preenchem um template com dados reais, conectando à API e ao estado da aplicação.',
      keep: 'Busca de dados, roteamento e composição final da tela.',
      avoid: 'Definir a estrutura visual do zero: isso é papel do template.',
      alternative: 'Route modules do framework de roteamento, se ele suportar loaders.',
      contents: ['DashboardPage.tsx', 'LoginPage.tsx'],
      examples: ['Buscar dados do usuário logado', 'Passar dados reais para o template'],
      dependsOn: ['ad-templates'],
    },
  ],
  example: {
    title: 'Construindo uma tela de login, nível por nível',
    description:
      'O mesmo pedaço de interface passa pelos cinco níveis: primeiro os elementos indivisíveis, depois composições cada vez maiores, até virar uma página real conectada a dados. Repare que cada nível só importa do nível imediatamente abaixo: um organismo nunca importa outro organismo, e um átomo nunca sabe que existe um formulário de login.',
    steps: [
      {
        level: '1. Átomo',
        file: 'components/atoms/Input.tsx',
        explanation:
          'O menor elemento possível: um campo de texto que não sabe se vai ser usado para email, senha ou busca. Sem label, sem validação, sem lógica.',
        code: `export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
    />
  )
}`,
      },
      {
        level: '2. Molécula',
        file: 'components/molecules/FormField.tsx',
        explanation:
          'Combina o átomo Input com um label e uma mensagem de erro. Já é reconhecível como "um campo de formulário", mas ainda não sabe que existe uma tela de login.',
        code: `import { Input } from '../atoms/Input'

type Props = {
  label: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export function FormField({ label, error, ...inputProps }: Props) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">{label}</span>
      <Input {...inputProps} />
      {error && <span className="text-xs text-rose-400">{error}</span>}
    </label>
  )
}`,
      },
      {
        level: '3. Organismo',
        file: 'components/organisms/LoginForm.tsx',
        explanation:
          'Aqui a tela de login "nasce": duas moléculas FormField (email e senha) mais um Button viram um formulário completo, com seu próprio estado local de submit. Ainda não sabe de onde vieram os dados nem para onde vai depois do login.',
        code: `import { useState } from 'react'
import { FormField } from '../molecules/FormField'
import { Button } from '../atoms/Button'

export function LoginForm({ onSubmit }: { onSubmit: (email: string, password: string) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(email, password) }}>
      <FormField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <FormField label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit">Entrar</Button>
    </form>
  )
}`,
      },
      {
        level: '4. Template',
        file: 'templates/AuthTemplate.tsx',
        explanation:
          'Define onde o organismo fica na tela (centralizado, com uma coluna de branding ao lado), sem receber dados reais. O mesmo template serve para login, cadastro ou recuperação de senha, cada um passando um organismo diferente por children.',
        code: `export function AuthTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="hidden bg-slate-900 lg:block" />
      <main className="flex items-center justify-center p-8">{children}</main>
    </div>
  )
}`,
      },
      {
        level: '5. Página',
        file: 'pages/LoginPage.tsx',
        explanation:
          'Só aqui a lógica de negócio entra: chamar a API de autenticação, redirecionar em caso de sucesso, mostrar erro em caso de falha. A página conecta o LoginForm (organismo) ao mundo real, dentro do AuthTemplate (template).',
        code: `import { useNavigate } from 'react-router'
import { AuthTemplate } from '../templates/AuthTemplate'
import { LoginForm } from '../components/organisms/LoginForm'
import { loginWithPassword } from '../services/auth.service'

export function LoginPage() {
  const navigate = useNavigate()
  const handleSubmit = async (email: string, password: string) => {
    await loginWithPassword(email, password)
    navigate('/dashboard')
  }
  return (
    <AuthTemplate>
      <LoginForm onSubmit={handleSubmit} />
    </AuthTemplate>
  )
}`,
      },
    ],
  },
}

const layeredClean: ArchitecturePattern = {
  id: 'layered-clean',
  name: 'Arquitetura em Camadas (Clean Architecture)',
  shortName: 'Clean Architecture',
  tagline: 'Camadas concêntricas onde as dependências sempre apontam para dentro, em direção ao domínio.',
  origin:
    'Inspirada na Clean Architecture de Robert C. Martin (2012) e em arquiteturas hexagonais, adaptada para frontends com lógica de negócio relevante: casos como apps financeiros, de saúde ou com regras complexas de cálculo.',
  summary:
    'A aplicação é dividida em camadas concêntricas: domínio no centro (entidades e regras de negócio puras), aplicação ao redor (casos de uso que orquestram o domínio), e apresentação e infraestrutura nas bordas (UI e detalhes técnicos como HTTP e storage). A regra central é que camadas internas nunca conhecem as externas.',
  whenToUse: [
    'Aplicações com regras de negócio complexas e valiosas o suficiente para merecer testes isolados de UI e de rede.',
    'Produtos onde a lógica de domínio pode ser reaproveitada em mais de uma interface (web e mobile, por exemplo).',
    'Times que precisam trocar peças de infraestrutura (ex: outro provedor de API) sem tocar nas regras de negócio.',
  ],
  avoidWhen: [
    'CRUDs simples sem lógica de negócio real: a separação em camadas vira burocracia sem ganho.',
    'Times pequenos ou protótipos, onde o custo de indireção supera o benefício de isolamento.',
  ],
  tradeoffs: [
    {
      title: 'Domínio testável sem UI nem rede',
      body: 'Regras de negócio em entidades e casos de uso puros podem ser testadas com testes unitários rápidos, sem mocks de fetch ou renderização de componentes.',
    },
    {
      title: 'Trocar infraestrutura fica barato',
      body: 'Migrar de REST para GraphQL, ou trocar o provedor de autenticação, afeta só a camada de infraestrutura: domínio e aplicação não mudam.',
    },
    {
      title: 'Mais indireção e boilerplate',
      body: 'Um fluxo simples de "salvar formulário" passa por várias camadas (hook → caso de uso → repositório → cliente HTTP), o que pode ser excessivo fora dos casos que realmente precisam.',
    },
  ],
  tree: {
    id: 'src',
    name: 'src/',
    description: 'Código-fonte da aplicação.',
    children: [
      {
        id: 'presentation',
        name: 'presentation/',
        moduleId: 'cl-presentation',
        description: 'Camada mais externa: componentes e páginas.',
        children: [
          { id: 'components', name: 'components/', description: 'Componentes de UI, sem regra de negócio.' },
          { id: 'pages', name: 'pages/', description: 'Páginas que conectam hooks de aplicação à UI.' },
        ],
      },
      {
        id: 'application',
        name: 'application/',
        moduleId: 'cl-application',
        description: 'Casos de uso que orquestram o domínio para atender uma ação do usuário.',
        children: [
          {
            id: 'use-cases',
            name: 'use-cases/',
            description: 'Um caso de uso por ação relevante do negócio.',
            children: [
              {
                id: 'create-order',
                name: 'createOrder.ts',
                description: 'Orquestra validação, cálculo de total e persistência de um pedido.',
              },
            ],
          },
          {
            id: 'app-hooks',
            name: 'hooks/',
            description: 'Hooks React que expõem casos de uso para a camada de apresentação.',
          },
        ],
      },
      {
        id: 'domain',
        name: 'domain/',
        moduleId: 'cl-domain',
        description:
          'Núcleo da aplicação: entidades e regras de negócio puras, sem dependência de React ou HTTP.',
        children: [
          {
            id: 'entities',
            name: 'entities/',
            description: 'Modelos de negócio com invariantes (ex: Order, Money).',
          },
          {
            id: 'domain-services',
            name: 'services/',
            description: 'Regras de negócio que não pertencem a uma única entidade.',
          },
          {
            id: 'repository-interfaces',
            name: 'repositories.ts',
            description: 'Contratos (interfaces) que a infraestrutura deve implementar.',
          },
        ],
      },
      {
        id: 'infrastructure',
        name: 'infrastructure/',
        moduleId: 'cl-infrastructure',
        description: 'Camada mais externa do lado dos dados: implementações concretas de I/O.',
        children: [
          {
            id: 'http-order-repo',
            name: 'HttpOrderRepository.ts',
            description: 'Implementa a interface de repositório usando a API REST.',
          },
          { id: 'http-client', name: 'httpClient.ts', description: 'Cliente HTTP de baixo nível.' },
        ],
      },
    ],
  },
  modules: [
    {
      id: 'cl-presentation',
      label: 'Presentation',
      shortLabel: 'UI e páginas',
      category: 'experience',
      responsibility:
        'Renderiza a interface e captura interações, delegando toda decisão de negócio para a aplicação.',
      keep: 'Componentes visuais, formulários, chamadas aos hooks de aplicação.',
      avoid: 'Cálculos de negócio ou chamadas diretas a repositórios/HTTP.',
      alternative: 'Fundir com a camada de aplicação em projetos pequenos, aceitando o acoplamento.',
      contents: ['components/', 'pages/'],
      examples: ['Formulário de criação de pedido', 'Exibir erros de validação'],
      dependsOn: ['cl-application'],
    },
    {
      id: 'cl-application',
      label: 'Application',
      shortLabel: 'Casos de uso',
      category: 'domain',
      responsibility:
        'Orquestra entidades e repositórios do domínio para realizar uma ação completa (um caso de uso).',
      keep: 'Uma função por ação de negócio relevante, coordenando validação, cálculo e persistência.',
      avoid: 'Detalhes de UI (JSX) ou detalhes de infraestrutura (URLs, headers HTTP).',
      alternative: 'Custom hooks que já embutem a orquestração, quando o caso de uso é trivial.',
      contents: ['use-cases/createOrder.ts', 'hooks/useCreateOrder.ts'],
      examples: ['Validar e salvar um pedido', 'Cancelar um pedido e notificar o usuário'],
      dependsOn: ['cl-domain'],
    },
    {
      id: 'cl-domain',
      label: 'Domain',
      shortLabel: 'Regras de negócio puras',
      category: 'foundation',
      responsibility:
        'Núcleo da aplicação: entidades, invariantes e regras de negócio, sem depender de nada externo.',
      keep: 'Classes/funções puras de negócio e as interfaces que a infraestrutura precisa implementar.',
      avoid:
        'Qualquer import de React, HTTP client ou biblioteca de UI: o domínio não pode depender de detalhes.',
      alternative:
        'Modelagem mais simples com tipos e funções, sem entidades ricas, se as regras forem poucas.',
      contents: ['entities/Order.ts', 'services/pricing.ts', 'repositories.ts'],
      examples: ['Calcular total de um pedido com desconto', 'Validar que um pedido tem ao menos um item'],
      dependsOn: [],
    },
    {
      id: 'cl-infrastructure',
      label: 'Infrastructure',
      shortLabel: 'Detalhes técnicos',
      category: 'data',
      responsibility:
        'Implementações concretas dos contratos definidos pelo domínio: HTTP, storage, terceiros.',
      keep: 'Implementações de repositório, clientes HTTP, adaptadores de serviços externos.',
      avoid: 'Regra de negócio: a infraestrutura só traduz dados entre o mundo externo e o domínio.',
      alternative: 'SDK gerado a partir de um contrato OpenAPI para reduzir boilerplate de cliente HTTP.',
      contents: ['HttpOrderRepository.ts', 'httpClient.ts'],
      examples: ['Implementar OrderRepository usando fetch', 'Mapear DTO da API para a entidade Order'],
      dependsOn: [],
    },
  ],
}

export const architecturePatterns: ArchitecturePattern[] = [featureBased, atomicDesign, layeredClean]

export function getArchitecturePattern(id: string): ArchitecturePattern | undefined {
  return architecturePatterns.find((pattern) => pattern.id === id)
}

export type UpcomingArchitecturePattern = {
  id: string
  shortName: string
  tagline: string
}

export const upcomingArchitecturePatterns: UpcomingArchitecturePattern[] = [
  {
    id: 'hexagonal',
    shortName: 'Hexagonal (Ports & Adapters)',
    tagline: 'Isola o domínio do mundo externo através de portas e adaptadores plugáveis.',
  },
  {
    id: 'mvc',
    shortName: 'MVC clássico',
    tagline:
      'Separação tradicional entre Model, View e Controller, origem de boa parte do vocabulário atual.',
  },
  {
    id: 'ddd',
    shortName: 'Domain-Driven Design (DDD)',
    tagline: 'Modela o software em torno de um domínio de negócio rico, com bounded contexts explícitos.',
  },
  {
    id: 'micro-frontends',
    shortName: 'Micro-frontends',
    tagline: 'Divide o frontend em aplicações independentes, publicadas e implantadas separadamente.',
  },
]
