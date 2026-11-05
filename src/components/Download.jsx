import { useState } from 'react'
import { ArrowUpRightIcon, DownloadSimpleIcon, LinuxLogoIcon, WindowsLogoIcon } from '@phosphor-icons/react'
import { REPO_URL } from '../config.js'
import { cn } from '../lib/cn.js'
import { detectOS, formatSize, PLATFORMS, primaryFile, useLatestRelease } from '../lib/release.js'

const ICONS = { windows: WindowsLogoIcon, linux: LinuxLogoIcon }
const ORDER = ['windows', 'linux']

// Main call to action: downloads the right installer for the visitor's system.
export function DownloadButton({ size = 'md', className }) {
  const release = useLatestRelease()
  const [os] = useState(detectOS)
  const file = primaryFile(release, os)
  const Icon = (file && ICONS[os]) || DownloadSimpleIcon
  const label = file ? `Download for ${PLATFORMS[os]}` : 'Download'

  return (
    <a
      href={file?.url || '#download'}
      className={cn('btn btn-primary group', size === 'sm' ? 'button-sm' : 'button-md', className)}
    >
      <Icon weight="fill" className={size === 'sm' ? 'size-4' : 'size-5'} />
      {size === 'sm' ? 'Download' : label}
    </a>
  )
}

// One line under the hero button: version, file type, size, other platforms.
export function DownloadMeta({ className }) {
  const release = useLatestRelease()
  const [os] = useState(detectOS)
  const file = primaryFile(release, os)
  const parts = [release.version, file && `${file.ext} ${file.arch}`, formatSize(file?.size)].filter(Boolean)
  return (
    <p className={cn('caption-2 text-muted', className)}>
      {parts.map((t) => `${t} · `)}
      <a href="#download" className="underline decoration-rule-strong underline-offset-4 hover:text-ink">
        Other platforms
      </a>
    </p>
  )
}

function VariantLink({ v, strong, wide }) {
  const size = formatSize(v.size)
  return (
    <a
      href={v.url}
      title={v.name}
      className={cn(
        'flex items-center gap-2 rounded-lg px-3 py-2 transition-colors duration-300 ease-base',
        wide && 'flex-1',
        strong ? 'bg-ink text-bg hover:opacity-90' : 'bg-surface text-ink shadow-[inset_0_0_0_1px_var(--rule-strong)] hover:bg-surface-3',
      )}
    >
      <DownloadSimpleIcon className="size-4 shrink-0" />
      <span className="caption-1">{v.arch}</span>
      {size && <span className={cn('caption-5 ml-auto font-mono', strong ? 'opacity-70' : 'text-muted')}>{size}</span>}
    </a>
  )
}

function PlatformCard({ os, formats, current }) {
  const Icon = ICONS[os]
  const archs = [...new Set(formats.flatMap((f) => f.variants.map((v) => v.arch)))]
  return (
    <li
      className={cn(
        'flex flex-col rounded-2xl border bg-surface p-5 text-left',
        current ? 'border-rule-strong shadow-soft' : 'border-rule',
      )}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-surface-2 text-ink">
          <Icon weight="fill" className="size-5" />
        </span>
        <div>
          <p className="title-3 text-ink">{PLATFORMS[os]}</p>
          <p className="caption-5 text-muted">
            {current ? 'Your system · ' : ''}
            {archs.join(' and ')}
          </p>
        </div>
      </div>

      <ul className="mt-5 flex flex-col gap-2">
        {formats.map((f, i) => (
          <li key={f.ext} className="flex flex-col gap-2 rounded-xl bg-surface-2 p-2 sm:flex-row sm:items-center">
            <div className="flex-1 px-2 py-1">
              <p className="title-4 text-ink">{f.label}</p>
              <p className="caption-5 font-mono text-muted">{f.ext}</p>
            </div>
            <div className="flex gap-2">
              {f.variants.map((v, j) => (
                <VariantLink key={v.name} v={v} strong={i === 0 && j === 0} wide={f.variants.length === 1} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </li>
  )
}

// Every installer of the latest release, one card per platform.
export function DownloadGrid({ className }) {
  const release = useLatestRelease()
  const [os] = useState(detectOS)

  const date = release.date
    ? new Date(release.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : null

  return (
    <div className={className}>
      <ul className="mx-auto grid max-w-4xl items-start gap-3 md:grid-cols-2">
        {ORDER.map((p) => (
          <PlatformCard key={p} os={p} formats={release.files[p]} current={p === os} />
        ))}
      </ul>
      <p className="caption-2 mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-muted">
        <span>
          Latest {release.version}
          {date && ` · released ${date}`}
        </span>
        <span aria-hidden>·</span>
        <a href={release.url} className="inline-flex items-center gap-1 hover:text-ink">
          Release notes <ArrowUpRightIcon className="size-3.5" />
        </a>
        <span aria-hidden>·</span>
        <a href={REPO_URL} className="inline-flex items-center gap-1 hover:text-ink">
          Source code <ArrowUpRightIcon className="size-3.5" />
        </a>
      </p>
    </div>
  )
}
