import { PlusIcon } from '@phosphor-icons/react'
import { Reveal, Section, SectionHeader } from './bits.jsx'

// Layout inspired by the 21st.dev "Ghost Accordion": borderless, numbered,
// with a plus that turns into a cross. Built on native <details>.
export const FAQS = [
  {
    q: 'Is it free?',
    a: 'Yes. API Bench is open source. There is no account, no sign up and no paid plan.',
  },
  {
    q: 'Does it work with my API?',
    a: 'If it speaks HTTP, yes. It does not care what language or framework is behind it: Express, Laravel, Django, Go, Spring or anything else. Requests can use any method, with JSON bodies and your own headers for auth.',
  },
  {
    q: 'Will it change my data?',
    a: 'Only if you ask it to. GET requests are read only. Endpoints that write, like POST or DELETE, show a warning first, because every request is sent to both versions. Point those at a test database.',
  },
  {
    q: 'Does anything leave my machine?',
    a: 'No. The tool runs locally and only talks to the two API addresses you give it. There is no account and no cloud service involved.',
  },
  {
    q: 'Why a desktop app instead of a website?',
    a: 'Browsers limit how many connections they open to one server and block many cross site calls. That would make the numbers wrong. The desktop app sends the requests itself, so you measure the API and not the browser.',
  },
  {
    q: 'Can I compare a staging or production API?',
    a: 'You can point it at any address. Keep in mind that network distance becomes part of every number, so compare two servers in the same region for a fair result.',
  },
  {
    q: 'What if a route changed in the migration?',
    a: 'Give the new version its own path for that endpoint, for example /api/v1/users on the old side and /v2/users on the new one. Each row shows the full address both sides will call.',
  },
  {
    q: 'Can my team run the same benchmark?',
    a: 'Save your setup as a profile and export it as a .bench.json file. Commit it to the repo and anyone on the team can load the exact same check.',
  },
  {
    q: 'What do I need to install?',
    a: 'Just the app. Download the installer for Windows (.exe or .msi) or Linux (.AppImage, .deb or .rpm, for x64 or ARM64) and open it. No Node, no terminal.',
  },
]

export default function Faq() {
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeader eyebrow="FAQ" title="Questions before you try it" />

        <Reveal as="ul" delay={80} className="divide-y divide-rule">
          {FAQS.map(({ q, a }, i) => (
            <li key={q}>
              <details className="faq group">
                <summary className="flex cursor-pointer list-none items-start gap-4 rounded-lg py-6 text-left">
                  <span className="caption-3 mt-0.5 w-6 shrink-0 font-mono text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <span className="title-2 flex-1 text-ink">{q}</span>
                  <PlusIcon
                    aria-hidden
                    className="mt-1 size-5 shrink-0 text-muted transition-transform duration-500 ease-base group-open:rotate-45"
                  />
                </summary>
                <div className="faq-answer pb-6 pl-10">
                  <p className="body-3 max-w-xl text-ink-2">{a}</p>
                </div>
              </details>
            </li>
          ))}
        </Reveal>
      </div>
    </Section>
  )
}
