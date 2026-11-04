import { useEffect, useRef } from 'react'
import { useFrameLoop, useThemeColor } from '../lib/canvas.js'

// Hero background, modeled on 21st.dev "Tweenly Hero Background" (dot grid).
// A field of dots that drifts in a slow wave and swells around the cursor.
// Decorative only: hidden from screen readers and never takes clicks.

const GAP = 22
const RADIUS = 160

export default function DotGrid({ className }) {
  const canvasRef = useRef(null)
  const size = useRef({ w: 0, h: 0, dpr: 1 })
  const pointer = useRef({ x: -9999, y: -9999, k: 0 })
  const ink = useThemeColor('--ink')

  useEffect(() => {
    const canvas = canvasRef.current
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(r.width * dpr)
      canvas.height = Math.round(r.height * dpr)
      size.current = { w: r.width, h: r.height, dpr }
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Track the pointer over the whole hero, since the canvas ignores events.
    const host = canvas.parentElement
    const move = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.current.x = e.clientX - r.left
      pointer.current.y = e.clientY - r.top
    }
    const leave = () => {
      pointer.current.x = -9999
      pointer.current.y = -9999
    }
    host.addEventListener('pointermove', move)
    host.addEventListener('pointerleave', leave)
    return () => {
      ro.disconnect()
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerleave', leave)
    }
  }, [])

  useFrameLoop(canvasRef, (t) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const { w, h, dpr } = size.current
    const p = pointer.current
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = ink.current

    const time = t / 1000
    for (let y = GAP / 2; y < h; y += GAP) {
      for (let x = GAP / 2; x < w; x += GAP) {
        const wave = (Math.sin(x * 0.012 + time * 0.6) + Math.cos(y * 0.015 - time * 0.4)) * 0.25 + 0.5
        const d = Math.hypot(x - p.x, y - p.y)
        const near = d < RADIUS ? 1 - d / RADIUS : 0
        const r = 0.8 + wave * 0.5 + near * near * 1.8
        ctx.globalAlpha = 0.1 + wave * 0.1 + near * 0.45
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    ctx.globalAlpha = 1
  })

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{
        // Fade the grid out toward the edges so the copy stays readable.
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 75%)',
      }}
    />
  )
}
