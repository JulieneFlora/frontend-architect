import type { UpcomingArchitecturePattern } from './types'

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
