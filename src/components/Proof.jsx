import { GitPullRequestIcon } from '@phosphor-icons/react'
import { Reveal, Section, SectionHeader } from './bits.jsx'

// What an exported Markdown report looks like once pasted into a PR.
// Sample numbers, matching the example run in the hero.
const ROWS = [
  ['GET /users', 'Same', '131 ms', '76 ms', '42.0% faster'],
  ['GET /users/42', 'Same', '88 ms', '55 ms', '37.5% faster'],
  ['POST /search', 'Same', '95 ms', '77 ms', '18.9% faster'],
  ['GET /orders', '1 field changed', '64 ms', '41 ms', '35.9% faster'],
]

export default function Proof() {
  return (
    <Section id="proof">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
        <SectionHeader eyebrow="The report" title="Numbers your reviewers can trust">
          Every finished run is kept in your history. Export one as a Markdown table, paste it into the pull request, and
          the review starts from evidence instead of "it felt faster".
        </SectionHeader>

        <Reveal delay={80}>
          <figure className="rounded-3xl border border-rule bg-surface-2 p-2 shadow-soft">
            <div className="overflow-hidden rounded-2xl border border-rule bg-surface">
              <figcaption className="flex items-center gap-3 border-b border-rule px-4 py-3 sm:px-6">
                <GitPullRequestIcon className="size-5 text-good" />
                <span className="title-4 min-w-0 truncate text-ink">Move orders service to the new framework</span>
                <span className="caption-5 ml-auto shrink-0 text-muted">Example</span>
              </figcaption>
              <div className="px-4 py-4 sm:px-6">
                <p className="body-6 text-ink-2">Benchmarked old vs new, 1,000 requests each, 10 at a time. Slow case shown (p95).</p>
                <div className="mt-4 overflow-x-auto rounded-lg border border-rule">
                  <table className="w-full min-w-[520px] text-left">
                    <thead className="caption-4 bg-surface-2 text-muted">
                      <tr>
                        <th className="px-3 py-2 font-medium">Endpoint</th>
                        <th className="px-3 py-2 font-medium">Data</th>
                        <th className="px-3 py-2 text-right font-medium">Old</th>
                        <th className="px-3 py-2 text-right font-medium">New</th>
                        <th className="px-3 py-2 text-right font-medium">Change</th>
                      </tr>
                    </thead>
                    <tbody className="caption-5 divide-y divide-rule font-mono text-ink-2">
                      {ROWS.map(([ep, data, old, now, change]) => (
                        <tr key={ep}>
                          <td className="px-3 py-2 text-ink">{ep}</td>
                          <td className={data === 'Same' ? 'px-3 py-2' : 'px-3 py-2 text-bad'}>{data}</td>
                          <td className="px-3 py-2 text-right">{old}</td>
                          <td className="px-3 py-2 text-right">{now}</td>
                          <td className="px-3 py-2 text-right text-good">{change}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </figure>
        </Reveal>
      </div>
    </Section>
  )
}
