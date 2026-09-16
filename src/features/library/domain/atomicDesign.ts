import type { ArchitecturePattern } from './types'

export const atomicDesign: ArchitecturePattern = {
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
      responsibility:
        'Menores blocos de UI: não podem ser quebrados em partes menores sem deixar de ter função.',
      keep: 'Botões, inputs, labels, ícones, cada um com uma única responsabilidade visual.',
      avoid: 'Qualquer composição de mais de um elemento ou lógica de negócio.',
      alternative: 'Importar de uma biblioteca de UI headless (Radix, Ark UI) e estilizar por cima.',
      contents: ['Button.tsx', 'Input.tsx', 'Icon.tsx', 'Badge.tsx'],
      examples: ['Variantes de cor e tamanho', 'Estados de foco e desabilitado'],
    },
    {
      id: 'ad-molecules',
      responsibility: 'Agrupam poucos átomos para formar uma unidade funcional simples.',
      keep: 'Combinações reutilizáveis como campo de busca ou campo de formulário com label e erro.',
      avoid: 'Regras de negócio ou chamadas de API.',
      alternative: 'Pular direto para organismos em design systems mais enxutos.',
      contents: ['SearchField.tsx', 'FormField.tsx', 'Card.tsx'],
      examples: ['Validação visual de um campo', 'Combinar ícone e texto em um chip'],
    },
    {
      id: 'ad-organisms',
      responsibility: 'Seções complexas e reconhecíveis da interface, muitas vezes já conectadas a dados.',
      keep: 'Cabeçalhos, tabelas completas, formulários inteiros.',
      avoid: 'Regras de roteamento: isso é responsabilidade da página.',
      alternative: 'Dividir um organismo grande demais em organismos menores e mais focados.',
      contents: ['SiteHeader.tsx', 'UserTable.tsx', 'CheckoutForm.tsx'],
      examples: ['Tabela com paginação', 'Formulário com múltiplos campos e submissão'],
    },
    {
      id: 'ad-templates',
      responsibility: 'Definem a disposição de organismos na página, sem dados reais, só a estrutura.',
      keep: 'Grid de layout, posicionamento de header/sidebar/conteúdo.',
      avoid: 'Buscar dados ou conhecer a origem do conteúdo que vai preenchê-los.',
      alternative:
        'Compor o layout direto na página, em projetos pequenos sem múltiplas variações de layout.',
      contents: ['DashboardTemplate.tsx', 'AuthTemplate.tsx'],
      examples: ['Layout responsivo com sidebar colapsável', 'Slots para conteúdo variável'],
    },
    {
      id: 'ad-pages',
      responsibility: 'Preenchem um template com dados reais, conectando à API e ao estado da aplicação.',
      keep: 'Busca de dados, roteamento e composição final da tela.',
      avoid: 'Definir a estrutura visual do zero: isso é papel do template.',
      alternative: 'Route modules do framework de roteamento, se ele suportar loaders.',
      contents: ['DashboardPage.tsx', 'LoginPage.tsx'],
      examples: ['Buscar dados do usuário logado', 'Passar dados reais para o template'],
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
