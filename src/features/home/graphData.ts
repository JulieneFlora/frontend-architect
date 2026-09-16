export type GraphNode = {
  id: string
  x: number
  y: number
  r: number
  accent?: string
  floatDur: number
  floatDelay: number
}

const accents = [
  'var(--primary)',
  'var(--highlight-teal)',
  'var(--highlight-orange)',
  'var(--success)',
  'var(--highlight-pink)',
]

const rawPositions: [number, number, number][] = [
  [60, 90, 4],
  [190, 230, 3],
  [330, 70, 5],
  [300, 330, 3],
  [470, 160, 6],
  [560, 390, 3],
  [630, 70, 4],
  [710, 250, 3],
  [810, 130, 5],
  [870, 350, 3],
  [950, 70, 4],
  [1010, 230, 3],
  [1090, 390, 5],
  [1150, 130, 3],
  [430, 430, 4],
  [770, 430, 3],
  [180, 40, 3],
  [880, 40, 3],
]

export const nodes: GraphNode[] = rawPositions.map(([x, y, r], index) => ({
  id: `n${index}`,
  x,
  y,
  r,
  accent: index % 3 === 0 ? accents[(index / 3) % accents.length] : undefined,
  floatDur: 7 + (index % 5) * 1.3,
  floatDelay: (index % 7) * -0.9,
}))

export function edgeKey(a: string, b: string) {
  return [a, b].sort().join('-')
}

// Liga cada nó aos dois vizinhos mais próximos; o Map deduplica os pares A-B/B-A.
const edgeSet = new Map<string, [GraphNode, GraphNode]>()
for (const node of nodes) {
  const nearest = [...nodes]
    .filter((other) => other.id !== node.id)
    .sort((a, b) => Math.hypot(a.x - node.x, a.y - node.y) - Math.hypot(b.x - node.x, b.y - node.y))
    .slice(0, 2)
  for (const other of nearest) edgeSet.set(edgeKey(node.id, other.id), [node, other])
}

export const edges = [...edgeSet.values()]
export const signalEdges = edges.filter((_, index) => index % 4 === 0).slice(0, 6)
