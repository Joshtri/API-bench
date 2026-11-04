import { useEffect, useRef } from 'react'
import { useFrameLoop } from '../lib/canvas.js'

// ASCII background for the final CTA, modeled on 21st.dev "Ascii Clouds"
// (wave-style ASCII art). Rendered live as text instead of a baked video,
// so it stays sharp, follows the theme and costs no download.

const RAMP = ' .:-=+*#%@'
const CELL_W = 8.4 // Geist Mono at 14px, roughly
const CELL_H = 16

export default function AsciiField({ className }) {
  const preRef = useRef(null)
  const grid = useRef({ cols: 0, rows: 0 })

  useEffect(() => {
    const el = preRef.current
    const resize = () => {
      const r = el.parentElement.getBoundingClientRect()
      grid.current = { cols: Math.ceil(r.width / CELL_W), rows: Math.ceil(r.height / CELL_H) }
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el.parentElement)
    return () => ro.disconnect()
  }, [])

  // 24 fps is plenty for drifting clouds and keeps the cost low.
  useFrameLoop(
    preRef,
    (t) => {
      const { cols, rows } = grid.current
      const time = t / 1000
      let out = ''
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v =
            Math.sin(x * 0.09 + time * 0.5) * 0.5 +
            Math.sin(y * 0.21 - time * 0.35) * 0.35 +
            Math.sin((x + y) * 0.05 + time * 0.25) * 0.6
          const n = (v + 1.45) / 2.9 // roughly 0..1
          out += RAMP[Math.max(0, Math.min(RAMP.length - 1, Math.floor(n * RAMP.length)))]
        }
        out += '\n'
      }
      preRef.current.textContent = out
    },
    { fps: 24 },
  )

  return (
    <pre
      ref={preRef}
      aria-hidden
      className={className}
      style={{
        margin: 0,
        fontSize: 14,
        lineHeight: `${CELL_H}px`,
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 25%, black 90%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 25%, black 90%)',
      }}
    />
  )
}
