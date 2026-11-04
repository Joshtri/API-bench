import { Fragment, useEffect, useRef } from 'react'
import { reducedMotion } from '../lib/motion.js'

// Each line is a meaningful phrase, so breaks land where the thought breaks.
const LINES = ['Faster only counts', 'when nothing broke.', 'Check the data and the speed,', 'then ship with numbers.']

// How much scroll (px) it takes to light up one full line, left to right.
const LINE_SCROLL = 120

export default function Tagline() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const words = [...root.querySelectorAll('.tagline-word')]
    if (reducedMotion()) {
      words.forEach((w) => w.setAttribute('data-on', ''))
      return
    }

    // One scroll listener, throttled to one update per frame. A word turns on
    // once it crosses a line 65% down the viewport. Words further right on a
    // line cross a little later, so they light up one at a time in reading order.
    let frame = 0
    const update = () => {
      frame = 0
      const trigger = window.innerHeight * 0.65
      const box = root.getBoundingClientRect()
      for (const w of words) {
        const r = w.getBoundingClientRect()
        const x = (r.left - box.left) / Math.max(box.width, 1)
        if (r.top + x * LINE_SCROLL < trigger) w.setAttribute('data-on', '')
        else w.removeAttribute('data-on')
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section aria-label="Why it matters" className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6">
      <p ref={ref} className="heading-3 md:heading-2 mx-auto max-w-[680px] text-ink">
        <span className="sr-only">{LINES.join(' ')}</span>
        <span aria-hidden>
          {LINES.map((line) => (
            // Inline on phones so lines wrap naturally, one phrase per line from md up.
            <span key={line} className="md:block">
              {line.split(' ').map((word, wi) => (
                <Fragment key={wi}>
                  <span className="tagline-word">{word}</span>{' '}
                </Fragment>
              ))}
            </span>
          ))}
        </span>
      </p>
    </section>
  )
}
