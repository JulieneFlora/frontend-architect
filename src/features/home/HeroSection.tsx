import { Library, Sparkles } from 'lucide-react'
import { Link } from 'react-router'
import { Tooltip } from '../../components/ui/Tooltip'

const wipLabel = 'Em construção. Volte em breve para usar o recomendador.'

export function HeroSection() {
  return (
    <section className="relative z-10 flex min-h-[52vh] flex-col items-center justify-center py-12 text-center lg:min-h-[62vh] lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--bg)_25%,transparent_70%)]" />
      <div className="relative w-full">
        <h1 className="font-display text-[clamp(1.5rem,6.5vw,2rem)] font-bold tracking-tight text-fg md:whitespace-nowrap md:text-[clamp(0.65rem,3.4vw,2.25rem)]">
          Explorando diferentes formas de estruturar um <span className="text-primary">frontend</span>.
        </h1>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Tooltip label={wipLabel}>
            <button
              type="button"
              aria-disabled="true"
              className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-md bg-primary/50 px-5 py-3 font-semibold text-white/70 sm:w-auto"
            >
              <Sparkles size={17} /> Recomendador
            </button>
          </Tooltip>
          <Link
            to="/explorar"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-panel px-5 py-3 text-fg hover:border-primary/50 sm:w-auto"
          >
            <Library size={17} /> Explorar arquiteturas
          </Link>
        </div>
        {/* O tooltip é hover-only, então no mobile o aviso precisa ser texto fixo. */}
        <p className="mt-4 text-xs text-fg-subtle sm:hidden">
          O recomendador está em construção. Volte em breve.
        </p>
      </div>
    </section>
  )
}
