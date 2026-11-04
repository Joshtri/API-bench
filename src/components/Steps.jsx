import { Reveal, Section, SectionHeader } from './bits.jsx'

const STEPS = [
  {
    title: 'Start both versions',
    body: 'Run the old API and the new one, ideally on the same machine and against the same database. Paste in their two addresses.',
    sample: ['Old   http://localhost:3000', 'New   http://localhost:4000'],
  },
  {
    title: 'List the endpoints you care about',
    body: 'Paste them in one go. If a route moved in the migration, point the old path at the new one with an arrow.',
    sample: ['/users', 'POST /search', '/api/v1/orders -> /v2/orders'],
  },
  {
    title: 'Press Run and read the result',
    body: 'Pick how much load to send. Each endpoint gets its data check and speed check, and progress shows up live as it runs.',
    sample: ['/users        same data   42.0% faster', '/search       same data   18.9% faster'],
  },
]

export default function Steps() {
  return (
    <Section id="how">
      <SectionHeader eyebrow="How it works" title="Three steps to a verdict" />

      <ol className="mt-12 grid gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal
            as="li"
            key={s.title}
            delay={i * 80}
            className="flex flex-col rounded-3xl border border-rule bg-surface-2 p-2"
          >
            <div className="flex-1 px-4 pt-4 pb-6">
              <span className="caption-3 inline-flex size-8 items-center justify-center rounded-full bg-ink text-bg">{i + 1}</span>
              <h3 className="title-2 mt-6 text-ink">{s.title}</h3>
              <p className="body-6 mt-2 text-ink-2">{s.body}</p>
            </div>
            {/* 24px outer radius, 8px gap: inner radius 16px. */}
            <pre className="caption-5 overflow-x-auto rounded-2xl border border-rule bg-surface px-4 py-3 font-mono text-ink-2">
              {s.sample.join('\n')}
            </pre>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
