import { edgeKey, edges, nodes, signalEdges } from './graphData'

export function NodeGraph() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.8]">
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
