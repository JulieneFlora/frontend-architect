import { icons3d } from '../../assets/icons-3d'
import { CardLink } from '../../components/ui/CardLink'
import { PathLabel } from '../../components/ui/PathLabel'
import { WindowFrame } from '../../components/ui/WindowFrame'
import { architecturePatterns, upcomingArchitecturePatterns } from './domain'
import { patternIcons } from './patternIcons'

export function LibraryPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <PathLabel segments={['explorar']} />
      <h1 className="mt-2 font-display text-3xl font-bold text-fg">Conheça arquiteturas de frontend</h1>
      <p className="mt-2 max-w-2xl text-fg-muted">
        Estude padrões conhecidos do ecossistema, um de cada vez: como cada um organiza pastas e
        responsabilidades, quando vale usar e quais trade-offs ele assume. Diferente do recomendador, aqui
        você não recebe uma sugestão para o seu projeto, você explora o padrão para entender como ele
        funciona.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {architecturePatterns.map((pattern) => (
          <CardLink key={pattern.id} to={`/explorar/${pattern.id}`} className="h-full">
            <WindowFrame title={`${pattern.id}.tsx`} className="h-full" contentClassName="flex flex-col p-6">
              <img src={patternIcons[pattern.id]} alt="" className="h-12 w-12" />
              <h2 className="mt-4 text-lg font-semibold text-fg">{pattern.name}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-fg-muted">{pattern.tagline}</p>
              <span className="mt-5 text-sm font-semibold text-primary group-hover:underline">
                explorar arquitetura
              </span>
            </WindowFrame>
          </CardLink>
        ))}
        {upcomingArchitecturePatterns.map((pattern) => (
          <WindowFrame
            key={pattern.id}
            title={`${pattern.id}.tsx`}
            className="opacity-70"
            contentClassName="flex flex-col p-6"
          >
            <div aria-disabled="true">
              <img src={icons3d.hourglassNotDone} alt="" className="h-12 w-12 grayscale" />
              <h2 className="mt-4 text-lg font-semibold text-fg-subtle">{pattern.shortName}</h2>
              <p className="mt-3 text-sm leading-6 text-fg-subtle">{pattern.tagline}</p>
              <span className="mt-5 inline-block text-sm font-semibold text-fg-subtle">em breve</span>
            </div>
          </WindowFrame>
        ))}
      </div>
    </div>
  )
}
