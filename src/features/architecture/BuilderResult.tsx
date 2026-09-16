import { Check, Copy, RotateCcw } from 'lucide-react'
import { icons3d } from '../../assets/icons-3d'
import { PathLabel } from '../../components/ui/PathLabel'
import { WindowFrame } from '../../components/ui/WindowFrame'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import type { ArchitectureChoices, Recommendation } from './domain'
import { WipNotice } from './WipNotice'

export function BuilderResult({
  result,
  choices,
  onReview,
}: {
  result: Recommendation
  choices: ArchitectureChoices
  onReview: () => void
}) {
  const { copied, copy } = useCopyToClipboard()
  const tree = result.tree.join('\n')

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-start gap-4">
          <img src={icons3d.rocket} alt="" className="h-14 w-14 shrink-0" />
          <div>
            <PathLabel segments={['recomendador', 'resultado']} />
            <h1 className="mt-2 font-display text-3xl font-bold text-fg">{result.title}</h1>
            <p className="mt-2 max-w-2xl text-fg-muted">{result.summary}</p>
          </div>
        </div>
        <button
          onClick={onReview}
          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-fg-muted hover:text-fg"
        >
          <RotateCcw size={15} /> revisar escolhas
        </button>
      </div>
      <WipNotice />
      <div className="mt-6 mb-6 flex flex-wrap gap-2">
        {Object.entries(choices).map(([key, value]) => (
          <span
            key={key}
            className="rounded-full border border-border bg-panel px-3 py-1 text-xs text-fg-muted"
          >
            {value}
          </span>
        ))}
      </div>
      <ArchitectureDiagram modules={result.modules} />
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <WindowFrame title="estrutura.txt">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-fg">Estrutura sugerida</h2>
            <button
              onClick={() => copy(tree)}
              className="inline-flex items-center gap-2 text-xs text-fg-muted hover:text-fg"
            >
              <Copy size={14} />
              {copied ? 'copiado' : 'copiar'}
            </button>
          </div>
          <pre className="mt-4 overflow-auto rounded-lg bg-panel-strong p-4 font-mono text-xs leading-6 text-fg-muted">
            {tree}
          </pre>
        </WindowFrame>
        <WindowFrame title="versoes.json">
          <h2 className="font-semibold text-fg">Versões para esta recomendação</h2>
          <ul className="mt-4 space-y-2 font-mono text-sm text-fg-muted">
            {result.versions.map((version) => (
              <li key={version} className="flex gap-2">
                <Check size={16} className="mt-0.5 text-success" />
                {version}
              </li>
            ))}
          </ul>
        </WindowFrame>
      </div>
      <section className="mt-6">
        <h2 className="mb-4 font-display text-xl font-semibold text-fg">Decisões e trade-offs</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {result.reasons.map((reason) => (
            <WindowFrame key={reason.title} as="article" contentClassName="p-5">
              <h3 className="font-semibold text-fg">{reason.title}</h3>
              <p className="mt-2 text-sm leading-6 text-fg-muted">{reason.body}</p>
              <p className="mt-4 border-l-2 border-warning pl-3 text-xs leading-5 text-warning">
                <strong>Trade-off: </strong>
                {reason.tradeoff}
              </p>
            </WindowFrame>
          ))}
        </div>
      </section>
    </div>
  )
}
