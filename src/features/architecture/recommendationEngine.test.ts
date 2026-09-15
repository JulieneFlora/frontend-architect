import { describe, expect, it } from 'vitest'
import { defaults } from './domain'
import { generateRecommendation } from './recommendationEngine'
describe('generateRecommendation', () => {
  it('inclui query hooks quando TanStack Query é selecionado', () => {
    const result = generateRecommendation(defaults)
    expect(result.modules.some((module) => module.id === 'queries')).toBe(true)
    expect(result.tree.join('\n')).toContain('queries e mutations')
  })
  it('não sugere query hooks sem server state', () => {
    const result = generateRecommendation({ ...defaults, serverState: 'Nenhum' })
    expect(result.modules.some((module) => module.id === 'queries')).toBe(false)
  })
})
