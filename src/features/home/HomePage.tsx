import { ArrowRight, BookOpen, Library, Sparkles } from 'lucide-react'
import { Link } from 'react-router'
import { icons3d } from '../../assets/icons-3d'
import { architecturePatterns } from '../library/domain'
import { patternIcons } from '../library/patternIcons'

const features = [
  {
    icon: icons3d.barChart,
    title: 'Escolhas com contexto',
    text: 'Tecnologias são avaliadas pelo tipo de produto e não por moda.',
  },
  {
    icon: icons3d.puzzlePiece,
    title: 'Regras isoladas',
    text: 'O motor de recomendação evolui sem espalhar condicionais na UI.',
  },
  {
    icon: icons3d.books,
    title: 'Trade-offs explícitos',
    text: 'Recomendação, alternativa e limite de cada escolha no mesmo lugar.',
  },
]

export function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-5">
      <section className="grid min-h-[70vh] items-center gap-12 py-16 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-panel py-1 pr-3 pl-2 text-xs font-semibold text-primary">
            <img src={icons3d.sparkles} alt="" className="h-5 w-5" />
            Decisões técnicas com contexto
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-fg sm:text-6xl">
            Projete um frontend que <span className="text-primary">continua claro</span> quando cresce.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-fg-muted">
            Duas formas de evoluir: use o recomendador para ver qual arquitetura se encaixa no seu projeto, ou
            explore a biblioteca para estudar como diferentes padrões funcionam.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white shadow-sm shadow-primary/20 hover:bg-primary-medium"
            >
              <Sparkles size={17} /> Recomendador <ArrowRight size={17} />
            </Link>
            <Link
              to="/biblioteca"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-panel px-5 py-3 text-fg hover:border-primary/50"
            >
              <Library size={17} /> Biblioteca de arquiteturas
            </Link>
          </div>
          <Link
            to="/manual"
            className="mt-4 inline-flex items-center gap-2 text-sm text-fg-subtle hover:text-fg-muted"
          >
            <BookOpen size={15} /> Ler o manual
          </Link>
        </div>
        <div className="relative rounded-2xl border border-border bg-panel p-6 shadow-xl shadow-black/5">
          <img
            src={icons3d.rocket}
            alt=""
            className="pointer-events-none absolute -top-7 -right-5 h-20 w-20 rotate-12 drop-shadow-lg"
          />
          <div className="flex items-center justify-between text-xs text-fg-subtle">
            <span>ARQUITETURA EXEMPLO</span>
            <span className="text-success">validada · 14 set 2026</span>
          </div>
          <div className="mt-6 rounded-xl border border-border bg-panel-strong p-5 font-mono text-sm leading-8 text-fg-muted">
            <p className="text-fg">Application</p>
            <p>├── app / providers + router</p>
            <p>├── features / regras de produto</p>
            <p>├── services / REST boundary</p>
            <p>└── shared-ui / componentes puros</p>
          </div>
          <p className="mt-5 text-sm leading-6 text-fg-muted">
            Separar responsabilidades não é burocracia: é tornar mudanças locais, testáveis e previsíveis.
          </p>
        </div>
      </section>
      <section className="pb-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-fg-subtle">
              <Library size={14} /> Biblioteca de arquiteturas
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-fg">
              Estude os padrões antes de escolher um
            </h2>
          </div>
          <Link
            to="/biblioteca"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Ver todos <ArrowRight size={15} />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {architecturePatterns.map((pattern) => (
            <Link
              key={pattern.id}
              to={`/biblioteca/${pattern.id}`}
              className="group flex items-start gap-4 rounded-xl border border-border bg-panel p-5 transition hover:border-primary/50 hover:shadow-md hover:shadow-black/5"
            >
              <img src={patternIcons[pattern.id]} alt="" className="h-10 w-10 shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.14em] text-fg-subtle">
                  {pattern.shortName}
                </p>
                <p className="mt-2 text-sm leading-6 text-fg-muted">{pattern.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
