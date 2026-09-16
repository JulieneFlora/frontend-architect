import { useState } from 'react'
import { Check, ChevronLeft, Copy, RotateCcw } from 'lucide-react'
import { icons3d } from '../../assets/icons-3d'
import { PathLabel } from '../../components/ui/PathLabel'
import { WindowFrame } from '../../components/ui/WindowFrame'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { defaults, options, type ArchitectureChoices, type ChoiceKey } from './domain'
import { generateRecommendation } from './recommendationEngine'
const steps: { title: string; fields: ChoiceKey[] }[] = [
  { title: 'Contexto do produto', fields: ['appType'] },
  {
    title: 'Tecnologias',
    fields: ['framework', 'language', 'state', 'serverState', 'forms', 'validation', 'styling', 'tests'],
  },
]
const labels: Record<ChoiceKey, string> = {
  appType: 'Tipo de aplicação',
  framework: 'Framework',
  language: 'Linguagem',
  state: 'Gerenciamento de estado',
  serverState: 'Server state',
  forms: 'Formulários',
  validation: 'Validação',
  styling: 'Estilização',
  tests: 'Testes',
}
function WipNotice() {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-xl border border-warning/30 bg-warning-light p-4">
      <img src={icons3d.hourglassNotDone} alt="" className="h-9 w-9 shrink-0" />
      <p className="text-sm leading-6 text-fg-muted">
        <strong className="text-fg">Ainda em construção:</strong> o recomendador já funciona, mas as regras
        por trás das sugestões ainda estão sendo ajustadas. Sinta-se à vontade para explorar, só não leve
        o resultado como palavra final por enquanto.
      </p>
    </div>
  )
}
export function BuilderPage() {
  const [step, setStep] = useState(0)
  const [choices, setChoices] = useState<ArchitectureChoices>(defaults)
  const [copied, setCopied] = useState(false)
  const result = generateRecommendation(choices)
  const field = (key: ChoiceKey) => (
    <fieldset key={key} className="mb-6">
      <legend className="mb-3 text-sm font-semibold text-fg">{labels[key]}</legend>
      <div className="flex flex-wrap gap-2">
        {options[key].map((value) => (
          <button
            type="button"
            aria-pressed={choices[key] === value}
            onClick={() => setChoices({ ...choices, [key]: value } as ArchitectureChoices)}
            className={`rounded-md border px-3 py-2 text-sm transition ${choices[key] === value ? 'border-primary bg-primary-light text-primary' : 'border-border bg-panel text-fg-muted hover:border-primary/50'}`}
            key={value}
          >
            {value}
          </button>
        ))}
      </div>
    </fieldset>
  )
  if (step === 2)
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
            onClick={() => setStep(0)}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-fg-muted hover:text-fg"
          >
            <RotateCcw size={15} /> revisar escolhas
          </button>
        </div>
        <WipNotice />
        <div className="mt-6 mb-6 flex flex-wrap gap-2">
          {Object.entries(choices).map(([key, value]) => (
            <span
              className="rounded-full border border-border bg-panel px-3 py-1 text-xs text-fg-muted"
              key={key}
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
                onClick={() => {
                  navigator.clipboard?.writeText(result.tree.join('\n'))
                  setCopied(true)
                  setTimeout(() => setCopied(false), 1500)
                }}
                className="inline-flex items-center gap-2 text-xs text-fg-muted hover:text-fg"
              >
                <Copy size={14} />
                {copied ? 'copiado' : 'copiar'}
              </button>
            </div>
            <pre className="mt-4 overflow-auto rounded-lg bg-panel-strong p-4 font-mono text-xs leading-6 text-fg-muted">
              {result.tree.join('\n')}
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
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <PathLabel segments={['recomendador', step === 0 ? 'contexto' : 'tecnologias']} />
      <h1 className="mt-2 font-display text-3xl font-bold text-fg">{steps[step].title}</h1>
      <p className="mt-2 text-fg-muted">
        Etapa {step + 1} de 2. Suas escolhas alimentam regras de recomendação testáveis.
      </p>
      {step === 0 && <WipNotice />}
      <div className="mt-8 h-1 overflow-hidden rounded-full bg-border">
        <div className="h-full bg-primary transition-all" style={{ width: `${(step + 1) * 50}%` }} />
      </div>
      <WindowFrame as="section" title="recomendador.tsx" className="mt-8">
        {steps[step].fields.map(field)}
        <div className="mt-8 flex justify-between border-t border-border pt-5">
          <button
            disabled={!step}
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-2 text-sm text-fg-muted disabled:opacity-30"
          >
            <ChevronLeft size={16} /> voltar
          </button>
          <button
            onClick={() => setStep(step + 1)}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-medium"
          >
            {step === 1 ? 'gerar arquitetura' : 'continuar'}
          </button>
        </div>
      </WindowFrame>
    </div>
  )
}
