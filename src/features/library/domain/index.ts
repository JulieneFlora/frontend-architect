import { atomicDesign } from './atomicDesign'
import { featureBased } from './featureBased'
import { layeredClean } from './layeredClean'
import type { ArchitecturePattern } from './types'

export type {
  ArchitecturePattern,
  ComposedExample,
  ComposedExampleStep,
  UpcomingArchitecturePattern,
} from './types'
export { upcomingArchitecturePatterns } from './upcoming'

export const architecturePatterns: ArchitecturePattern[] = [featureBased, atomicDesign, layeredClean]

export function getArchitecturePattern(id: string): ArchitecturePattern | undefined {
  return architecturePatterns.find((pattern) => pattern.id === id)
}
