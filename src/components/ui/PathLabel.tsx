/**
 * Substitui o "eyebrow" tracked-uppercase genérico por algo que já é a
 * linguagem do produto: um caminho de arquivo. Todo lugar que precisaria
 * de um rótulo decorativo acima do título vira, em vez disso, uma
 * localização real dentro da árvore do site.
 */
export function PathLabel({ segments, className = '' }: { segments: string[]; className?: string }) {
  return (
    <p className={`font-mono text-xs text-fg-subtle ${className}`}>
      {segments.map((segment, index) => (
        <span key={segment}>
          {index > 0 && <span className="text-fg-subtle/50">/</span>}
          {segment}
        </span>
      ))}
    </p>
  )
}
