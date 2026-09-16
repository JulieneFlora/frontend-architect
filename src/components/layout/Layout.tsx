import { Outlet, Link, useLocation } from 'react-router'
import { Moon, Sparkles, Sun } from 'lucide-react'
import { useTheme } from '../../app/theme/ThemeProvider'
import { Tooltip } from '../ui/Tooltip'
export function Layout() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/90 px-5 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 font-display text-sm font-bold">
            Frontend Architect
          </Link>
          <nav className="flex items-center gap-1 text-sm text-fg-muted">
            <Link className="rounded-md px-3 py-2 hover:bg-panel-strong hover:text-fg" to="/">
              Início
            </Link>
            <Link className="rounded-md px-3 py-2 hover:bg-panel-strong hover:text-fg" to="/explorar">
              Explorar
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
              className="ml-1 grid h-9 w-9 place-items-center rounded-md text-fg-muted hover:bg-panel-strong hover:text-fg"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            {location.pathname !== '/builder' && (
              <Tooltip label="Em construção. Volte em breve para usar o recomendador." position="bottom">
                <button
                  type="button"
                  aria-disabled="true"
                  className="ml-1 inline-flex cursor-not-allowed items-center gap-2 rounded-md bg-primary/50 px-3 py-2 font-semibold text-white/70"
                >
                  <Sparkles size={15} /> Recomendador
                </button>
              </Tooltip>
            )}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="mx-auto max-w-7xl px-5 py-9">
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-5 font-mono text-[11px] text-fg-subtle">
          <span>frontend-architect: recomendações, não verdades universais</span>
          <span>feito com carinho por juliene ❤️</span>
        </div>
      </footer>
    </div>
  )
}
