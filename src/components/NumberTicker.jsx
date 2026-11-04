import { useEffect, useState } from 'react'
import { reducedMotion, useInView } from '../lib/motion.js'

// Counts up to `value` once it scrolls into view, modeled on 21st.dev
// "Number Ticker" (Magic UI). Screen readers get the final number only.

export default function NumberTicker({ value, decimals = 0, duration = 1200, delay = 0, className }) {
  const [ref, inView] = useInView({ rootMargin: '0px' })
  const [shown, setShown] = useState(() => (reducedMotion() ? value : 0))

  useEffect(() => {
    if (!inView || reducedMotion()) return setShown(value)
    let raf
    let start
    const timer = setTimeout(() => {
      const tick = (t) => {
        start ??= t
        const p = Math.min((t - start) / duration, 1)
        setShown(value * (1 - Math.pow(1 - p, 4))) // ease-out quart
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [inView, value, duration, delay])

  const final = value.toFixed(decimals)
  return (
    <span ref={ref} className={className}>
      <span aria-hidden className="tabular-nums">
        {shown.toFixed(decimals)}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  )
}
