import { ArrowRightIcon, GithubLogoIcon } from '@phosphor-icons/react'
import { REPO_URL } from '../config.js'
import { Logo, Reveal, Section } from './bits.jsx'
import AsciiField from './AsciiField.jsx'
import Terminal from './Terminal.jsx'

export function FinalCta() {
  return (
    <Section id="start">
      <Reveal className="relative isolate overflow-hidden rounded-3xl border border-rule bg-surface px-6 py-16 text-center md:px-12 md:py-20">
        <AsciiField className="pointer-events-none absolute inset-0 -z-10 overflow-hidden font-mono text-muted opacity-30 select-none" />
        <h2 className="heading-4 md:heading-3 mx-auto max-w-[680px] text-ink">
          Try it on your next migration
        </h2>
        <p className="body-3 mx-auto mt-4 max-w-md text-ink-2">
          Free and open source. No account, no sign up, and nothing leaves your machine. Delete the folder when you are done.
        </p>
        <div className="mt-8">
          <a href={REPO_URL} className="btn btn-primary button-md group">
            <GithubLogoIcon weight="fill" className="size-5" />
            Get it free on GitHub
            <ArrowRightIcon className="size-4 transition-transform duration-300 ease-base group-hover:translate-x-0.5" />
          </a>
        </div>
        <p className="caption-2 mt-10 text-muted">Or run it right now:</p>
        <Terminal className="mx-auto mt-3 max-w-xl" />
      </Reveal>
    </Section>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center">
        <div>
          <a href="#top" className="title-3 inline-flex items-center gap-2 text-ink">
            <Logo className="size-6 text-ink" /> API Bench
          </a>
          <p className="caption-2 mt-2 text-muted">Compare an API before and after a migration.</p>
        </div>
        <nav aria-label="Footer" className="md:ml-auto">
          <ul className="caption-1 flex flex-wrap gap-x-6 gap-y-2 text-ink-2">
            <li>
              <a href={REPO_URL} className="transition-colors duration-300 ease-base hover:text-ink">GitHub</a>
            </li>
            <li>
              <a href="/privacy.html" className="transition-colors duration-300 ease-base hover:text-ink">Privacy</a>
            </li>
            <li>
              <a href="/terms.html" className="transition-colors duration-300 ease-base hover:text-ink">Terms</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
