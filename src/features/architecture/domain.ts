export const options = {
  appType: ['Dashboard', 'SaaS', 'E-commerce', 'Blog', 'Sistema administrativo', 'Aplicação mobile'],
  framework: ['React'],
  language: ['TypeScript'],
  state: ['Context API', 'Zustand', 'Redux Toolkit', 'Nenhum'],
  serverState: ['TanStack Query', 'Nenhum'],
  forms: ['React Hook Form', 'Controle manual'],
  validation: ['Zod', 'Validação manual'],
  styling: ['Tailwind CSS', 'CSS Modules', 'Styled Components'],
  tests: ['Vitest', 'Jest'],
} as const
export type ChoiceKey = keyof typeof options
export type ArchitectureChoices = { [K in ChoiceKey]: (typeof options)[K][number] }
export const defaults: ArchitectureChoices = {
  appType: 'SaaS',
  framework: 'React',
  language: 'TypeScript',
  state: 'Zustand',
  serverState: 'TanStack Query',
  forms: 'React Hook Form',
  validation: 'Zod',
  styling: 'Tailwind CSS',
  tests: 'Vitest',
}
export type ModuleInfo = {
  id: string
  responsibility: string
  keep: string
  avoid: string
  alternative: string
  contents: string[]
  examples: string[]
}
export type Recommendation = {
  title: string
  summary: string
  modules: ModuleInfo[]
  reasons: { title: string; body: string; tradeoff: string }[]
  tree: string[]
  versions: string[]
}
