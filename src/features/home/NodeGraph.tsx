type Node = {
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

const nodes: Node[] = rawPositions.map(([x, y, r], index) => ({
  id: `n${index}`,
  x,
  y,
  r,
  accent: index % 3 === 0 ? accents[(index / 3) % accents.length] : undefined,
  floatDur: 7 + (index % 5) * 1.3,
  floatDelay: (index % 7) * -0.9,
}))

function edgeKey(a: string, b: string) {
  return [a, b].sort().join('-')
}

const edgeSet = new Map<string, [Node, Node]>()
for (const node of nodes) {
  const nearest = [...nodes]
    .filter((other) => other.id !== node.id)
    .sort((a, b) => Math.hypot(a.x - node.x, a.y - node.y) - Math.hypot(b.x - node.x, b.y - node.y))
    .slice(0, 2)
  for (const other of nearest) edgeSet.set(edgeKey(node.id, other.id), [node, other])
}
const edges = [...edgeSet.values()]
const signalEdges = edges.filter((_, index) => index % 4 === 0).slice(0, 6)

/**
 * Fundo ambiente contínuo: uma malha de nós que nunca para de se mover,
 * com sinais viajando entre alguns pontos — um sistema vivo, sempre em
 * evolução, discreto o bastante para não competir com o conteúdo.
 */
export function NodeGraph() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.55]">
      <svg viewBox="0 0 1200 480" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        {edges.map(([from, to]) => (
          <line
            key={edgeKey(from.id, to.id)}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="var(--border)"
            strokeWidth={1}
          />
        ))}
        {signalEdges.map(([from, to], index) => (
          <circle key={`signal-${edgeKey(from.id, to.id)}`} r={2.4} fill="var(--primary)">
            <animateMotion
              dur={`${6 + (index % 3)}s`}
              begin={`${index * 1.4}s`}
              repeatCount="indefinite"
              path={`M${from.x},${from.y} L${to.x},${to.y} L${from.x},${from.y}`}
            />
          </circle>
        ))}
        {nodes.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={node.accent ?? 'var(--fg-subtle)'}
            opacity={node.accent ? 0.9 : 0.5}
            className="graph-float"
            style={{ animationDuration: `${node.floatDur}s`, animationDelay: `${node.floatDelay}s` }}
          />
        ))}
      </svg>
    </div>
  )
}
