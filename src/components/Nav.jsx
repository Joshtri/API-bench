import { useEffect, useState } from 'react'
import { GithubLogoIcon, MoonIcon, SunIcon } from '@phosphor-icons/react'
import { REPO_URL } from '../config.js'
import { cn } from '../lib/cn.js'
import { Logo } from './bits.jsx'

const LINKS = [
  ['how', 'How it works'],
  ['benefits', 'Features'],
  ['proof', 'Report'],
  ['faq', 'FAQ'],
]

// Which section is on screen, so the nav can mark it as current.
function useCurrentSection(ids) {
  const [current, setCurrent] = useState(null)
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return current
}

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light')
  useEffect(() => {
    // Switch with transitions off so every color doesn't animate at once.
    const style = document.createElement('style')
    style.textContent = '*{transition:none!important}'
    document.head.appendChild(style)
    document.documentElement.setAttribute('data-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#181818' : '#FAFAF8')
    requestAnimationFrame(() => requestAnimationFrame(() => style.remove()))
    try {
      localStorage.setItem('apibench.theme', theme)
    } catch {}
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}

function ThemeButton({ theme, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="icon-btn"
    >
      {theme === 'dark' ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
    </button>
  )
}

export default function Nav() {
  const [theme, toggleTheme] = useTheme()
  const [open, setOpen] = useState(false)
  const current = useCurrentSection(LINKS.map(([id]) => id))

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
        <nav
          aria-label="Main"
          className="flex w-full max-w-3xl items-center gap-2 rounded-2xl border border-rule bg-nav p-2 shadow-soft backdrop-blur-xl md:w-auto"
        >
          <a href="#top" className="btn btn-ghost title-3 text-ink" onClick={() => setOpen(false)}>
            <Logo className="size-6 text-ink" />
            API Bench
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={current === id ? 'true' : undefined}
                  className={cn(
                    'btn btn-ghost title-4 text-ink-2',
                    current === id && 'bg-surface-2 text-ink',
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1 md:ml-2">
            <ThemeButton theme={theme} onToggle={toggleTheme} />
            <span className="hidden md:block">
              <a href={REPO_URL} className="btn btn-primary button-sm">
                <GithubLogoIcon weight="fill" className="size-4" />
                Get it free
              </a>
            </span>
            <span className="flex md:hidden">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="icon-btn"
            >
              {/* Two lines that turn into an X. */}
              <span
                aria-hidden
                className={cn(
                  'absolute h-0.5 w-5 rounded-full bg-ink transition-transform duration-500 ease-base',
                  open ? 'rotate-45' : '-translate-y-1',
                )}
              />
              <span
                aria-hidden
                className={cn(
                  'absolute h-0.5 w-5 rounded-full bg-ink transition-transform duration-500 ease-base',
                  open ? '-rotate-45' : 'translate-y-1',
                )}
              />
            </button>
            </span>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        data-open={open || undefined}
        aria-hidden={!open}
        inert={!open}
        className={cn(
          'fixed inset-0 z-30 flex flex-col bg-menu px-6 pt-24 pb-10 backdrop-blur-2xl transition-opacity duration-500 ease-base md:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <ul className="flex flex-col gap-2">
          {LINKS.map(([id, label], i) => (
            <li key={id} className="menu-link" style={{ '--d': `${Math.min(i * 60, 400)}ms` }}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                aria-current={current === id ? 'true' : undefined}
                className={cn('heading-5 block rounded-xl py-3 text-ink-2', current === id && 'text-ink')}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="menu-link mt-auto" style={{ '--d': `${Math.min(LINKS.length * 60, 400)}ms` }}>
          <a href={REPO_URL} className="btn btn-primary button-md w-full">
            <GithubLogoIcon weight="fill" className="size-5" />
            Get it free on GitHub
          </a>
        </div>
      </div>
    </>
  )
}
