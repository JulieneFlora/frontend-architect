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
