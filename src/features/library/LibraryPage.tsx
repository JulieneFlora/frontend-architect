import { ArrowRight, Library } from 'lucide-react'
import { Link } from 'react-router'
import { icons3d } from '../../assets/icons-3d'
import { architecturePatterns, upcomingArchitecturePatterns } from './domain'
import { patternIcons } from './patternIcons'

export function LibraryPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-fg-subtle">
        <Library size={14} /> Biblioteca de arquiteturas
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-fg">Conheça arquiteturas de frontend</h1>
      <p className="mt-2 max-w-2xl text-fg-muted">
        Estude padrões conhecidos do ecossistema, um de cada vez: como cada um organiza pastas e
        responsabilidades, quando vale usar e quais trade-offs ele assume. Diferente do recomendador, aqui
        você não recebe uma sugestão para o seu projeto — você explora o padrão para entender como ele
        funciona.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {architecturePatterns.map((pattern) => (
          <Link
            key={pattern.id}
            to={`/biblioteca/${pattern.id}`}
            className="group flex flex-col rounded-2xl border border-border bg-panel p-6 transition hover:border-primary/50 hover:shadow-md hover:shadow-black/5"
          >
            <img src={patternIcons[pattern.id]} alt="" className="h-12 w-12" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[.16em] text-fg-subtle">
              {pattern.shortName}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-fg">{pattern.name}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-fg-muted">{pattern.tagline}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:underline">
              Explorar arquitetura <ArrowRight size={15} />
            </span>
          </Link>
        ))}
        {upcomingArchitecturePatterns.map((pattern) => (
          <div
            key={pattern.id}
            aria-disabled="true"
            className="flex flex-col rounded-2xl border border-dashed border-border p-6 opacity-70"
          >
            <img src={icons3d.hourglassNotDone} alt="" className="h-12 w-12 grayscale" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[.16em] text-fg-subtle">
              {pattern.shortName}
            </p>
            <p className="mt-3 flex-1 text-sm leading-6 text-fg-subtle">{pattern.tagline}</p>
            <span className="mt-5 text-sm font-semibold text-fg-subtle">Em breve</span>
          </div>
        ))}
      </div>
    </div>
  )
}
