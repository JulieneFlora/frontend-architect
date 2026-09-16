import { Link } from 'react-router'
import { CardLink } from '../../components/ui/CardLink'
import { PathLabel } from '../../components/ui/PathLabel'
import { WindowFrame } from '../../components/ui/WindowFrame'
import { architecturePatterns } from '../library/domain'
import { patternIcons } from '../library/patternIcons'

export function PatternPreviewGrid() {
  return (
    <>
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
              className="h-full"
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
    </>
  )
}
