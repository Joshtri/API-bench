import { ArrowRightIcon, ArrowUpRightIcon, GithubLogoIcon } from '@phosphor-icons/react'
import { REPO_URL } from '../config.js'
import DotGrid from './DotGrid.jsx'
import ResultsPreview from './ResultsPreview.jsx'
import { Announcement, AnnouncementTag, AnnouncementTitle } from './ui/announcement.jsx'

export default function Hero() {
  return (
    <div className="relative isolate">
      <DotGrid className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[820px] w-full" />

      <section id="top" className="mx-auto w-full max-w-6xl px-4 pt-24 pb-20 sm:px-6 md:pb-24">
        <div className="hero-in mt-16 flex flex-col items-center text-center">
          <Announcement href={REPO_URL} className="mb-8">
            <AnnouncementTag>Open source</AnnouncementTag>
            <AnnouncementTitle>
              Now on GitHub
              <ArrowUpRightIcon className="size-4 shrink-0 opacity-70" />
            </AnnouncementTitle>
          </Announcement>

          <h1 className="heading-3 sm:heading-2 lg:heading-1 hero-gradient max-w-[680px] pb-2">
            Ship your API migration
            <br />
            without the guesswork
          </h1>

          <p className="body-7 mt-6 max-w-[680px] text-ink-2 [text-wrap:balance]">
            Run the old and the new version side by side. API Bench checks that every endpoint still returns the same
            data, then shows exactly how much faster the new one is.
          </p>

          <div className="mt-8">
            <a href={REPO_URL} className="btn btn-primary button-md group">
              <GithubLogoIcon weight="fill" className="size-5" />
              Get it free on GitHub
              <ArrowRightIcon className="size-4 transition-transform duration-300 ease-base group-hover:translate-x-0.5" />
            </a>
          </div>

          <ul className="caption-2 mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-muted sm:gap-x-3">
            <li>Free and open source</li>
            <li aria-hidden className="hidden sm:block">·</li>
            <li>Runs on your own machine</li>
            <li aria-hidden className="hidden sm:block">·</li>
            <li>Set up in about a minute</li>
          </ul>
        </div>

        <div className="hero-in mt-16">
          <div style={{ animationDelay: '320ms' }}>
            <ResultsPreview />
          </div>
        </div>
      </section>
    </div>
  )
}
