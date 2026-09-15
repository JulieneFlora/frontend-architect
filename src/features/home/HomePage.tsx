import { Compass, Library, Sparkles } from 'lucide-react'
import { Link } from 'react-router'
import { CardLink } from '../../components/ui/CardLink'
import { PathLabel } from '../../components/ui/PathLabel'
import { Reveal } from '../../components/ui/Reveal'
import { WindowFrame } from '../../components/ui/WindowFrame'
import { architecturePatterns } from '../library/domain'
import { patternIcons } from '../library/patternIcons'
import { NodeGraph } from './NodeGraph'

export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-5">
      <section className="relative min-h-[62vh] overflow-hidden py-16 lg:py-24">
        <NodeGraph />
        <div className="via-bg/95 absolute inset-0 bg-gradient-to-r from-bg to-transparent lg:w-2/3" />
        <div className="relative">
          <h1 className="max-w-lg font-display text-4xl font-bold tracking-tight text-fg">
            Projete um frontend que <span className="text-primary">continua claro</span>.
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-medium"
            >
              <Sparkles size={17} /> Recomendador
            </Link>
            <Link
              to="/explorar"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-panel px-5 py-3 text-fg hover:border-primary/50"
            >
              <Library size={17} /> Explorar arquiteturas
            </Link>
          </div>
        </div>
      </section>

      <Reveal className="grid gap-4 pb-14 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-panel p-6">
          <Compass className="text-primary" size={22} />
          <h2 className="mt-4 font-display text-xl font-bold text-fg">Não sabe qual arquitetura usar?</h2>
          <p className="mt-2 text-sm leading-6 text-fg-muted">
            Responda perguntas sobre o seu projeto e o recomendador sugere uma estrutura, com o porquê de cada
            escolha e o trade-off que ela assume.
          </p>
          <Link
            to="/builder"
            className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
          >
            usar o recomendador
          </Link>
        </div>
        <div className="rounded-xl border border-border bg-panel p-6">
          <Library className="text-primary" size={22} />
          <h2 className="mt-4 font-display text-xl font-bold text-fg">Estude padrões arquiteturais</h2>
          <p className="mt-2 text-sm leading-6 text-fg-muted">
            Explore Atomic Design, Feature-Based e Clean Architecture: como cada um organiza pastas, quando
            vale usar e o que ele assume que você não vai fazer.
          </p>
          <Link
            to="/explorar"
            className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
          >
            explorar arquiteturas
          </Link>
        </div>
      </Reveal>

      <Reveal className="pb-14" delay={100}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <PathLabel segments={['explorar']} />
            <h2 className="mt-2 font-display text-2xl font-bold text-fg">
              Entenda os padrões antes de escolher um
            </h2>
          </div>
          <Link to="/explorar" className="text-sm text-primary hover:underline">
            ver todos
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {architecturePatterns.map((pattern) => (
            <CardLink key={pattern.id} to={`/explorar/${pattern.id}`}>
              <WindowFrame
                title={`${pattern.id}.tsx`}
                className="h-full transition group-hover:border-primary/50"
                contentClassName="flex items-start gap-4 p-5"
              >
                <img src={patternIcons[pattern.id]} alt="" className="h-10 w-10 shrink-0" />
                <div>
                  <p className="font-semibold text-fg">{pattern.shortName}</p>
                  <p className="mt-2 text-sm leading-6 text-fg-muted">{pattern.tagline}</p>
                </div>
              </WindowFrame>
            </CardLink>
          ))}
        </div>
      </Reveal>
    </div>
  )
}
