import { CodeBlock } from '../../components/ui/CodeBlock'
import { WindowFrame } from '../../components/ui/WindowFrame'
import type { ComposedExample } from './domain'

export function ComposedExampleSection({ example }: { example: ComposedExample }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-xl font-semibold text-fg">{example.title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-fg-muted">{example.description}</p>
      <ol className="mt-6 space-y-6">
        {example.steps.map((step, index) => (
          <WindowFrame key={step.file} as="li" title={step.file}>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-fg-subtle">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-[11px] font-bold text-white">
                {index + 1}
              </span>
              {step.level}
            </span>
            <p className="mt-3 text-sm leading-6 text-fg-muted">{step.explanation}</p>
            <div className="mt-4">
              <CodeBlock code={step.code} />
            </div>
          </WindowFrame>
        ))}
      </ol>
    </section>
  )
}
