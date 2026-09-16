import { ChevronLeft } from 'lucide-react'
import { PathLabel } from '../../components/ui/PathLabel'
import { WindowFrame } from '../../components/ui/WindowFrame'
import { options, type ArchitectureChoices, type ChoiceKey } from './domain'
import { WipNotice } from './WipNotice'

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

export const stepCount = steps.length

export function BuilderWizard({
  step,
  choices,
  onChange,
  onStepChange,
}: {
  step: number
  choices: ArchitectureChoices
  onChange: (choices: ArchitectureChoices) => void
  onStepChange: (step: number) => void
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <PathLabel segments={['recomendador', step === 0 ? 'contexto' : 'tecnologias']} />
      <h1 className="mt-2 font-display text-3xl font-bold text-fg">{steps[step].title}</h1>
      <p className="mt-2 text-fg-muted">
        Etapa {step + 1} de {stepCount}. Suas escolhas alimentam regras de recomendação testáveis.
      </p>
      {step === 0 && <WipNotice />}
      <div className="mt-8 h-1 overflow-hidden rounded-full bg-border">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${((step + 1) / stepCount) * 100}%` }}
        />
      </div>
      <WindowFrame as="section" title="recomendador.tsx" className="mt-8">
        {steps[step].fields.map((key) => (
          <ChoiceField
            key={key}
            field={key}
            value={choices[key]}
            onSelect={(value) => onChange({ ...choices, [key]: value } as ArchitectureChoices)}
          />
        ))}
        <div className="mt-8 flex justify-between border-t border-border pt-5">
          <button
            disabled={!step}
            onClick={() => onStepChange(step - 1)}
            className="inline-flex items-center gap-2 text-sm text-fg-muted disabled:opacity-30"
          >
            <ChevronLeft size={16} /> voltar
          </button>
          <button
            onClick={() => onStepChange(step + 1)}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-medium"
          >
            {step === stepCount - 1 ? 'gerar arquitetura' : 'continuar'}
          </button>
        </div>
      </WindowFrame>
    </div>
  )
}

function ChoiceField({
  field,
  value,
  onSelect,
}: {
  field: ChoiceKey
  value: string
  onSelect: (value: string) => void
}) {
  return (
    <fieldset className="mb-6">
      <legend className="mb-3 text-sm font-semibold text-fg">{labels[field]}</legend>
      <div className="flex flex-wrap gap-2">
        {options[field].map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onSelect(option)}
            className={`rounded-md border px-3 py-2 text-sm transition ${value === option ? 'border-primary bg-primary-light text-primary' : 'border-border bg-panel text-fg-muted hover:border-primary/50'}`}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
