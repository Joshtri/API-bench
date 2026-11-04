import { cn } from '../lib/cn.js'
import { useInView } from '../lib/motion.js'

export function Logo({ className = 'size-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M2 15c2.5 0 3-8 5.5-8S10 17 12.5 17 15 9 17.5 9 20 13 22 13" stroke="#F2A93B" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M2 18c2.5 0 3-5 5.5-5S10 19 12.5 19 15 14 17.5 14 20 16 22 16" stroke="#5AB0FF" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

// Rises 32px and fades in once, when it scrolls into view.
export function Reveal({ as: Tag = 'div', delay = 0, className, children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      data-in={inView || undefined}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={cn('reveal', className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Section({ id, className, children, ...rest }) {
  return (
    <section id={id} className={cn('mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 md:py-24', className)} {...rest}>
      {children}
    </section>
  )
}

export function SectionHeader({ eyebrow, title, children, center, className }) {
  return (
    <Reveal className={cn('max-w-2xl', center && 'mx-auto text-center', className)}>
      {eyebrow && <p className="caption-1 text-muted">{eyebrow}</p>}
      <h2 className="heading-4 md:heading-3 mt-3 text-ink">{title}</h2>
      {children && <p className="body-3 mt-4 text-ink-2">{children}</p>}
    </Reveal>
  )
}
