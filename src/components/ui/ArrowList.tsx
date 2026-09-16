export function ArrowList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true" className="text-fg-subtle">
            ›
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}
