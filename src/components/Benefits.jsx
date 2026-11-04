import { GaugeIcon, GitPullRequestIcon, ListChecksIcon, ShieldCheckIcon } from '@phosphor-icons/react'
import { Reveal, Section, SectionHeader } from './bits.jsx'

const BENEFITS = [
  {
    icon: ListChecksIcon,
    title: 'Catch changed data before your users do',
    body: 'Every field of every response is compared between the old and the new version. A renamed value or a missing field is flagged, even when the endpoint got faster.',
  },
  {
    icon: GaugeIcon,
    title: 'See the speedup in numbers you can quote',
    body: 'Typical, slow and worst case response times for each endpoint, plus how many requests per second each side handles. One request at a time, or under load.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Fewer false alarms',
    body: 'Times are compared as the same moment, so 10:00 UTC and 17:00 in Jakarta match. Lists can ignore order. You only see the differences that matter.',
  },
  {
    icon: GitPullRequestIcon,
    title: 'Proof your reviewers can read',
    body: 'Export any run as a Markdown table and paste it into the pull request. Save the setup as a file in the repo, and the whole team runs the same check.',
  },
]

export default function Benefits() {
  return (
    <Section id="benefits">
      <SectionHeader eyebrow="What you get" title="Two checks on every endpoint">
        A data check and a speed check, side by side. A faster response that changed the data still shows up.
      </SectionHeader>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {BENEFITS.map(({ icon: Icon, title, body }, i) => (
          <Reveal key={title} delay={(i % 2) * 80} className="rounded-2xl border border-rule bg-surface p-6 md:p-8">
            <span className="inline-flex size-10 items-center justify-center rounded-lg bg-surface-2 text-ink">
              <Icon className="size-5" />
            </span>
            <h3 className="heading-6 mt-6 text-ink">{title}</h3>
            <p className="body-3 mt-2 text-ink-2">{body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
