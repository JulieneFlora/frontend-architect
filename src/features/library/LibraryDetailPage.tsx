import { ArrowLeft, Check, CircleX } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router'
import { ArchitectureTree, collectFolderIds } from '../../components/architecture-tree/ArchitectureTree'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { PathLabel } from '../../components/ui/PathLabel'
import { WindowFrame } from '../../components/ui/WindowFrame'
import { getArchitecturePattern } from './domain'
import { patternIcons } from './patternIcons'

export function LibraryDetailPage() {
  const { id } = useParams()
  const pattern = id ? getArchitecturePattern(id) : undefined
  if (!pattern) return <Navigate to="/explorar" replace />

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <Link to="/explorar" className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg">
        <ArrowLeft size={15} /> explorar arquiteturas
      </Link>
      <div className="mt-6 flex items-center gap-4">
        <img src={patternIcons[pattern.id]} alt="" className="h-14 w-14 shrink-0" />
        <PathLabel segments={['explorar', pattern.id]} />
      </div>
      <h1 className="mt-2 font-display text-3xl font-bold text-fg">{pattern.name}</h1>
      <p className="mt-2 max-w-2xl text-fg-muted">{pattern.tagline}</p>
      <p className="mt-6 max-w-3xl text-sm leading-6 text-fg-muted">{pattern.summary}</p>
      <p className="mt-4 max-w-3xl border-l-2 border-border pl-3 text-xs leading-5 text-fg-subtle">
        <strong className="text-fg-muted">Origem: </strong>
        {pattern.origin}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <WindowFrame>
          <h2 className="flex items-center gap-2 font-semibold text-fg">
            <Check size={16} className="text-success" /> Quando usar
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-fg-muted">
            {pattern.whenToUse.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 text-fg-subtle">›</span>
                {item}
              </li>
            ))}
          </ul>
        </WindowFrame>
        <WindowFrame>
          <h2 className="flex items-center gap-2 font-semibold text-fg">
            <CircleX size={16} className="text-error" /> Quando evitar
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-fg-muted">
            {pattern.avoidWhen.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 text-fg-subtle">›</span>
                {item}
              </li>
            ))}
          </ul>
        </WindowFrame>
      </div>

      <section className="mt-8">
        <h2 className="mb-4 font-display text-xl font-semibold text-fg">Estrutura de pastas</h2>
        <ArchitectureTree
          tree={pattern.tree}
          modules={pattern.modules}
          defaultExpanded={collectFolderIds(pattern.tree)}
        />
      </section>

      {pattern.example && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold text-fg">{pattern.example.title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-fg-muted">{pattern.example.description}</p>
          <ol className="mt-6 space-y-6">
            {pattern.example.steps.map((step, index) => (
              <WindowFrame key={step.file} as="li" title={step.file}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-fg-subtle">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-[11px] font-bold text-white">
                      {index + 1}
                    </span>
                    {step.level}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-fg-muted">{step.explanation}</p>
                <div className="mt-4">
                  <CodeBlock code={step.code} />
                </div>
              </WindowFrame>
            ))}
          </ol>
        </section>
      )}

      <section className="mt-8">
        <h2 className="mb-4 font-display text-xl font-semibold text-fg">Trade-offs</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pattern.tradeoffs.map((tradeoff) => (
            <WindowFrame key={tradeoff.title} as="article" contentClassName="p-5">
              <h3 className="font-semibold text-fg">{tradeoff.title}</h3>
              <p className="mt-2 text-sm leading-6 text-fg-muted">{tradeoff.body}</p>
            </WindowFrame>
          ))}
        </div>
      </section>
    </div>
  )
}
