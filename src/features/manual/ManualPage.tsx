import { Link } from 'react-router'
import { icons3d } from '../../assets/icons-3d'
const topics = [
  [
    'Como criar',
    'Escolha o contexto do produto, defina tecnologias e gere a recomendação. Você pode revisar as escolhas a qualquer momento.',
  ],
  [
    'Como ler o diagrama',
    'Cada nó representa uma responsabilidade. Clique em um deles para ver o que pertence ao módulo, o que evitar e uma alternativa possível.',
  ],
  [
    'Como interpretar decisões',
    'Uma recomendação traz o motivo, o trade-off e não afirma que uma ferramenta é universalmente correta.',
  ],
  [
    'Versões',
    'Toda recomendação informa o conjunto de versões para o qual foi validada. Consulte docs/versions.md antes de atualizar dependências.',
  ],
  [
    'Evolução',
    'Para adicionar tecnologia ou regra, amplie o catálogo e o motor de recomendação; mantenha as regras sem dependência de React.',
  ],
]
export function ManualPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <img src={icons3d.openBook} alt="" className="h-14 w-14" />
      <p className="mt-4 text-xs font-semibold uppercase tracking-[.2em] text-fg-subtle">
        Manual de instruções
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-fg">
        Entenda a recomendação antes de adotá-la.
      </h1>
      <p className="mt-4 leading-7 text-fg-muted">
        O Frontend Architect ajuda a transformar decisões de arquitetura em uma conversa concreta sobre
        responsabilidades, contexto e manutenção. Ele não substitui a análise do time.
      </p>
      <div className="mt-8 space-y-3">
        {topics.map(([title, body]) => (
          <article key={title} className="rounded-xl border border-border bg-panel p-5">
            <h2 className="font-semibold text-fg">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-fg-muted">{body}</p>
          </article>
        ))}
      </div>
      <Link
        to="/builder"
        className="mt-8 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-medium"
      >
        Criar uma arquitetura
      </Link>
    </div>
  )
}
