import { ArrowUpRightIcon, GithubLogoIcon } from '@phosphor-icons/react'
import { REPO_URL } from '../config.js'
import { useLatestRelease } from '../lib/release.js'
import { DownloadButton, DownloadMeta } from './Download.jsx'
import DotGrid from './DotGrid.jsx'
import ResultsPreview from './ResultsPreview.jsx'
import { Announcement, AnnouncementTag, AnnouncementTitle } from './ui/announcement.jsx'

export default function Hero() {
  const release = useLatestRelease()
  return (
    <div className="relative isolate">
      <DotGrid className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[820px] w-full" />

      <section id="top" className="mx-auto w-full max-w-6xl px-4 pt-24 pb-20 sm:px-6 md:pb-24">
        <div className="hero-in mt-16 flex flex-col items-center text-center">
          <Announcement href={release.url || REPO_URL} className="mb-8">
            <AnnouncementTag>{release.version ? 'New' : 'Open source'}</AnnouncementTag>
            <AnnouncementTitle>
              {release.version ? `Desktop app ${release.version} is out` : 'Desktop app for Windows and Linux'}
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

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <DownloadButton />
            <a href={REPO_URL} className="btn btn-secondary button-md">
              <GithubLogoIcon weight="fill" className="size-5" />
              View on GitHub
            </a>
          </div>

          <DownloadMeta className="mt-4" />
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
