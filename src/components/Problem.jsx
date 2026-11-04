import { EyeSlashIcon, TextAaIcon, TimerIcon } from '@phosphor-icons/react'
import { Reveal, Section, SectionHeader } from './bits.jsx'

const PROBLEMS = [
  {
    icon: TextAaIcon,
    title: 'A value quietly changes',
    body: 'The role comes back as "Admin" instead of "admin". Every test passes, and a filter in someone else\'s dashboard stops matching.',
  },
  {
    icon: EyeSlashIcon,
    title: 'A field goes missing',
    body: 'The rewrite drops a field nobody remembered was in use. You hear about it from a customer, not from CI.',
  },
  {
    icon: TimerIcon,
    title: 'It is only fast on your laptop',
    body: 'One request at a time feels quick. Ten at once, against the same database, can tell a very different story.',
  },
]

export default function Problem() {
  return (
    <Section id="problem">
      <SectionHeader eyebrow="The problem" title="API migrations rarely fail loudly">
        Swapping a framework, a server or a provider usually looks fine on day one. The breakage shows up later, in places
        your tests never looked.
      </SectionHeader>

      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {PROBLEMS.map(({ icon: Icon, title, body }, i) => (
          <Reveal as="li" key={title} delay={i * 80} className="rounded-2xl border border-rule bg-surface p-6">
            <span className="inline-flex size-10 items-center justify-center rounded-lg bg-surface-2 text-ink">
              <Icon className="size-5" />
            </span>
            <h3 className="title-2 mt-6 text-ink">{title}</h3>
            <p className="body-6 mt-2 text-ink-2">{body}</p>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-8">
        <p className="body-2 max-w-2xl text-ink">
          API Bench sends the same requests to both versions and shows you all three, before you merge.
        </p>
      </Reveal>
    </Section>
  )
}
