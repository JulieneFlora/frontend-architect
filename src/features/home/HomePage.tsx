import { ArrowRight, Compass, Library } from 'lucide-react'
import { Link } from 'react-router'
import { Reveal } from '../../components/ui/Reveal'
import { Tooltip } from '../../components/ui/Tooltip'
import { HeroSection } from './HeroSection'
import { NodeGraph } from './NodeGraph'
import { PatternPreviewGrid } from './PatternPreviewGrid'

export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-5">
      <NodeGraph />
      <HeroSection />

      <Reveal className="relative z-10 grid gap-4 pb-14 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-panel/50 p-6 backdrop-blur-sm">
          <Compass className="text-primary" size={22} />
          <h2 className="mt-4 font-display text-xl font-bold text-fg">Não sabe qual arquitetura usar?</h2>
          <p className="mt-2 text-sm leading-6 text-fg-muted">
            Responda perguntas sobre o seu projeto e o recomendador sugere uma estrutura, com o porquê de cada
            escolha e o trade-off que ela assume.
          </p>
          <Tooltip label="Em construção. Volte em breve para usar o recomendador.">
            <span
              aria-disabled="true"
              className="mt-4 inline-flex cursor-not-allowed items-center gap-1 text-sm font-semibold text-fg-subtle"
            >
              usar o recomendador
              <span className="font-normal text-fg-subtle sm:hidden">(em construção)</span>
            </span>
          </Tooltip>
        </div>
        <div className="rounded-xl border border-border bg-panel/50 p-6 backdrop-blur-sm">
          <Library className="text-primary" size={22} />
          <h2 className="mt-4 font-display text-xl font-bold text-fg">Estude padrões arquiteturais</h2>
          <p className="mt-2 text-sm leading-6 text-fg-muted">
            Explore Atomic Design, Feature-Based e Clean Architecture: como cada um organiza pastas, quando
            vale usar e o que ele assume que você não vai fazer.
          </p>
          <Link
            to="/explorar"
            className="group mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            explorar arquiteturas
            <ArrowRight
              size={14}
              className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
            />
          </Link>
        </div>
      </Reveal>

      <Reveal className="relative z-10 pb-14" delay={100}>
        <PatternPreviewGrid />
      </Reveal>
    </div>
  )
}
