import { Outlet, Link, useLocation } from 'react-router'
import { Blocks, Moon, Sparkles, Sun } from 'lucide-react'
import { useTheme } from '../../app/theme/ThemeProvider'
export function Layout() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/85 px-5 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display text-sm font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-white">
              <Blocks size={17} />
            </span>
            Frontend Architect
          </Link>
          <nav className="flex items-center gap-1 text-sm text-fg-muted">
            <Link className="rounded-md px-3 py-2 hover:bg-panel-strong hover:text-fg" to="/">
              Início
            </Link>
            <Link className="rounded-md px-3 py-2 hover:bg-panel-strong hover:text-fg" to="/biblioteca">
              Biblioteca
            </Link>
            <Link className="rounded-md px-3 py-2 hover:bg-panel-strong hover:text-fg" to="/manual">
              Manual
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
              <Link
                to="/builder"
                className="ml-1 inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 font-semibold text-white hover:bg-primary-medium"
              >
                <Sparkles size={15} /> Recomendador
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="mx-auto max-w-7xl px-5 py-9 text-xs text-fg-subtle">
        <p>Frontend Architect · recomendações versionadas, não verdades universais.</p>
        <p className="mt-1">Feito com carinho por Juliene &lt;3</p>
      </footer>
    </div>
  )
}
