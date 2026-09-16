import { Outlet, Link, useLocation } from 'react-router'
import { Moon, Sparkles, Sun } from 'lucide-react'
import { useTheme } from '../../app/theme/ThemeProvider'
import { Tooltip } from '../ui/Tooltip'
export function Layout() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  return (
    <div className="min-h-screen text-fg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/90 px-4 backdrop-blur-xl sm:px-5">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 whitespace-nowrap font-display text-sm font-bold">
            Frontend Architect
          </Link>
          <nav className="flex items-center gap-0.5 text-sm text-fg-muted sm:gap-1">
            <Link className="rounded-md px-2 py-2 hover:bg-panel-strong hover:text-fg sm:px-3" to="/">
              Início
            </Link>
            <Link className="rounded-md px-2 py-2 hover:bg-panel-strong hover:text-fg sm:px-3" to="/explorar">
              Explorar
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
              className="grid h-9 w-9 place-items-center rounded-md text-fg-muted hover:bg-panel-strong hover:text-fg sm:ml-1"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            {location.pathname !== '/builder' && (
              <span className="hidden sm:inline-flex">
                <Tooltip
                  label="Em construção. Volte em breve para usar o recomendador."
                  position="bottom"
                  align="end"
                >
                  <button
                    type="button"
                    aria-disabled="true"
                    className="ml-1 inline-flex cursor-not-allowed items-center gap-2 rounded-md bg-primary/50 px-3 py-2 font-semibold text-white/70"
                  >
                    <Sparkles size={15} /> Recomendador
                  </button>
                </Tooltip>
              </span>
            )}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="relative z-10 mx-auto max-w-7xl px-5 py-9">
        <div className="flex flex-wrap items-center justify-between gap-2 pt-5 font-mono text-[11px] text-fg-subtle">
          <span>Frontend-architect: recomendações, não verdades universais</span>
          <span>feito com carinho por juliene ❤️</span>
        </div>
      </footer>
    </div>
  )
}
