import { useEffect, useState } from 'react'
import { APP_VERSION, LATEST_RELEASE_API, REPO_URL } from '../config.js'

// Download links for every installer the desktop CI builds
// (api-benchmark-desktop/.github/workflows/release.yml, via tauri-action).
// Each link points straight at the file. The newest release is read from the
// GitHub API to get its version and file sizes; if that fails, links are built
// from APP_VERSION and the file names tauri-action always uses.

// GitHub turns the space in "API Bench" into a dot in uploaded file names.
const FORMATS = {
  windows: [
    {
      label: 'Installer',
      ext: '.exe',
      variants: [{ arch: 'x64', file: (v) => `API.Bench_${v}_x64-setup.exe` }],
    },
    {
      label: 'MSI package',
      ext: '.msi',
      variants: [{ arch: 'x64', file: (v) => `API.Bench_${v}_x64_en-US.msi` }],
    },
  ],
  linux: [
    {
      label: 'AppImage',
      ext: '.AppImage',
      variants: [
        { arch: 'x64', file: (v) => `API.Bench_${v}_amd64.AppImage` },
        { arch: 'ARM64', file: (v) => `API.Bench_${v}_aarch64.AppImage` },
      ],
    },
    {
      label: 'Debian / Ubuntu',
      ext: '.deb',
      variants: [
        { arch: 'x64', file: (v) => `API.Bench_${v}_amd64.deb` },
        { arch: 'ARM64', file: (v) => `API.Bench_${v}_arm64.deb` },
      ],
    },
    {
      label: 'Fedora / RHEL',
      ext: '.rpm',
      variants: [
        { arch: 'x64', file: (v) => `API.Bench-${v}-1.x86_64.rpm` },
        { arch: 'ARM64', file: (v) => `API.Bench-${v}-1.aarch64.rpm` },
      ],
    },
  ],
}

export const PLATFORMS = {
  windows: 'Windows',
  linux: 'Linux',
}

const CACHE_KEY = 'apibench.release.v2'
let pending

function shape(json = {}) {
  const assets = json.assets ?? []
  // A release with no installers on it is not useful; link to APP_VERSION instead.
  const usable = assets.length > 0 && json.tag_name
  const version = usable ? json.tag_name.replace(/^v/, '') : APP_VERSION
  const tag = `v${version}`

  const files = {}
  for (const [os, formats] of Object.entries(FORMATS)) {
    files[os] = formats.map(({ label, ext, variants }) => ({
      label,
      ext,
      variants: variants.map(({ arch, file }) => {
        const name = file(version)
        const a = assets.find((x) => x.name === name)
        return {
          arch,
          name,
          url: a?.browser_download_url || `${REPO_URL}/releases/download/${tag}/${name}`,
          size: a?.size || 0,
        }
      }),
    }))
  }

  return {
    version: tag,
    url: `${REPO_URL}/releases/tag/${tag}`,
    date: usable ? json.published_at : null,
    files,
  }
}

const FALLBACK = shape()

function load() {
  if (pending) return pending
  try {
    const hit = sessionStorage.getItem(CACHE_KEY)
    if (hit) return (pending = Promise.resolve(JSON.parse(hit)))
  } catch {}
  pending = fetch(LATEST_RELEASE_API, { headers: { Accept: 'application/vnd.github+json' } })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`GitHub ${r.status}`))))
    .then((json) => {
      const release = shape(json)
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(release))
      } catch {}
      return release
    })
    .catch(() => FALLBACK)
  return pending
}

export function useLatestRelease() {
  const [release, setRelease] = useState(FALLBACK)
  useEffect(() => {
    let alive = true
    load().then((r) => alive && setRelease(r))
    return () => {
      alive = false
    }
  }, [])
  return release
}

// The file the main button should download for this visitor, or null.
export function primaryFile(release, os) {
  const fmt = os && release.files[os]?.[0]
  if (!fmt) return null
  const arm = os === 'linux' && /aarch64|arm64/i.test(navigator.userAgent)
  const v = fmt.variants.find((x) => x.arch === (arm ? 'ARM64' : 'x64')) || fmt.variants[0]
  return { ...v, ext: fmt.ext }
}

export function detectOS() {
  if (typeof navigator === 'undefined') return null
  const p = (navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || '').toLowerCase()
  if (p.includes('win')) return 'windows'
  if (p.includes('linux') && !/android/i.test(navigator.userAgent)) return 'linux'
  return null
}

export function formatSize(bytes) {
  if (!bytes) return ''
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
