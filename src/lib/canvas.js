import { useEffect, useRef } from 'react'
import { reducedMotion } from './motion.js'

// Reads a color token (e.g. '--ink') and re-reads it when the theme changes.
export function useThemeColor(name) {
  const color = useRef('#111111')
  useEffect(() => {
    const read = () => {
      color.current = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || color.current
    }
    read()
    const mo = new MutationObserver(read)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [name])
  return color
}

// Runs draw(t) every frame, but only while the element is on screen and the
// tab is visible. With reduced motion it draws one still frame and stops.
export function useFrameLoop(ref, draw, { fps = 60 } = {}) {
  const drawRef = useRef(draw)
  drawRef.current = draw
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const still = reducedMotion()
    let raf = 0
    let visible = false
    let last = 0
    const step = 1000 / fps

    const tick = (t) => {
      raf = requestAnimationFrame(tick)
      if (t - last < step) return
      last = t
      drawRef.current(t)
    }
    const start = () => {
      if (still) return drawRef.current(0)
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      visible ? start() : stop()
    })
    io.observe(el)
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)
    return () => {
      stop()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [ref, fps])
}
