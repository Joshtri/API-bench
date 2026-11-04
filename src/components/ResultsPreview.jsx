import { CheckCircleIcon, WarningCircleIcon } from '@phosphor-icons/react'
import { cn } from '../lib/cn.js'
import NumberTicker from './NumberTicker.jsx'

// Example run shown in the hero. The numbers are sample data, and the
// panel says so, so nobody reads them as a benchmark claim.
const ROWS = [
  { method: 'GET', path: '/users', same: true, old: 131, now: 76 },
  { method: 'GET', path: '/users/42', same: true, old: 88, now: 55 },
  { method: 'POST', path: '/search', same: true, old: 95, now: 77 },
  { method: 'GET', path: '/orders', same: false, old: 64, now: 41, diff: ['role', '"admin"', '"Admin"'] },
]

const pct = (a, b) => ((a - b) / a) * 100

function DataStatus({ same }) {
  return same ? (
    <span className="caption-4 inline-flex items-center gap-1 rounded-full bg-good-soft px-2 py-0.5 text-good">
      <CheckCircleIcon weight="fill" className="size-4" />
      Same data
    </span>
  ) : (
    <span className="caption-4 inline-flex items-center gap-1 rounded-full bg-bad-soft px-2 py-0.5 text-bad">
      <WarningCircleIcon weight="fill" className="size-4" />1 field changed
    </span>
  )
}

export default function ResultsPreview() {
  return (
    <figure
      aria-label="Example results: three of four endpoints return the same data, and the new version is up to 42 percent faster"
      className="mx-auto max-w-4xl rounded-3xl border border-rule bg-surface-2 p-2 shadow-soft"
    >
      <div className="overflow-hidden rounded-2xl border border-rule bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-4 py-4 sm:px-6">
          <div className="text-left">
            <p className="title-3 text-ink">Orders API: old vs new</p>
            <p className="caption-5 text-muted">Example run · 1,000 requests per endpoint</p>
          </div>
          <span className="caption-3 rounded-full bg-ink px-3 py-1 text-bg">
            Up to <NumberTicker value={42} delay={500} />% faster
          </span>
        </div>

        <div
          role="row"
          className="caption-4 hidden grid-cols-[1.4fr_1fr_0.6fr_0.6fr_0.8fr] gap-4 border-b border-rule px-6 py-3 text-left text-muted md:grid"
        >
          <span>Endpoint</span>
          <span>Data check</span>
          <span className="text-right">Old</span>
          <span className="text-right">New</span>
          <span className="text-right">Speed</span>
        </div>

        <ul className="divide-y divide-rule text-left">
          {ROWS.map((r) => (
            <li key={r.path} className={cn('px-4 py-4 sm:px-6', !r.same && 'bg-bad-soft/40')}>
              <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 md:grid-cols-[1.4fr_1fr_0.6fr_0.6fr_0.8fr]">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="caption-3 w-12 shrink-0 font-mono text-muted">{r.method}</span>
                  <span className="body-5 truncate font-mono text-ink">{r.path}</span>
                </span>
                <span className="order-3 col-span-2 md:order-none md:col-span-1">
                  <DataStatus same={r.same} />
                </span>
                <span className="body-6 hidden text-right font-mono text-muted md:block">{r.old} ms</span>
                <span className="body-6 hidden text-right font-mono text-ink md:block">{r.now} ms</span>
                <span className="body-4 text-right font-mono text-good">
                  <NumberTicker value={pct(r.old, r.now)} decimals={1} delay={500} />% faster
                </span>
              </div>
              {r.diff && (
                <p className="caption-5 mt-2 font-mono text-ink-2">
                  {r.diff[0]}: <span className="text-muted line-through">{r.diff[1]}</span> → <span className="text-bad">{r.diff[2]}</span>
                </p>
              )}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-rule px-4 py-4 sm:px-6">
          <span className="caption-1 text-ink">3 of 4 endpoints match</span>
          <span className="caption-2 text-muted">Faster isn't finished: /orders needs a look before you merge.</span>
        </div>
      </div>
    </figure>
  )
}
