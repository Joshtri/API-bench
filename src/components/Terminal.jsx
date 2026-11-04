import { useEffect, useRef, useState } from 'react'
import { CheckIcon, CopyIcon } from '@phosphor-icons/react'
import { INSTALL_LINES } from '../config.js'
import { cn } from '../lib/cn.js'
import { reducedMotion, useInView } from '../lib/motion.js'

// Animated install terminal, modeled on 21st.dev "Terminal" (Magic UI).
// Types each command, then prints its output. The copy button always copies
// the real commands, whatever point the animation has reached.

const SCRIPT = [
  { cmd: INSTALL_LINES[0] },
  { out: 'Cloning into \'api-benchmark\'... done.' },
  { cmd: INSTALL_LINES[1] },
  { out: 'added packages, ready to run' },
  { out: '  VITE ready' },
  { out: '  ➜  Local:   http://127.0.0.1:5180/', good: true },
]

const TYPE_MS = 28
const PAUSE_MS = 380

function useTypedScript(start) {
  const still = reducedMotion()
  const [step, setStep] = useState(still ? SCRIPT.length : 0) // lines fully shown
  const [chars, setChars] = useState(0) // chars typed in the current command

  useEffect(() => {
    if (!start || still || step >= SCRIPT.length) return
    const line = SCRIPT[step]
    if (line.cmd && chars < line.cmd.length) {
      const id = setTimeout(() => setChars((c) => c + 1), TYPE_MS)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => {
      setStep((s) => s + 1)
      setChars(0)
    }, line.cmd ? PAUSE_MS : PAUSE_MS / 2)
    return () => clearTimeout(id)
  }, [start, still, step, chars])

  return { step, chars }
}

export default function Terminal({ className }) {
  const [ref, inView] = useInView()
  const { step, chars } = useTypedScript(inView)
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(INSTALL_LINES.join(' && '))
      setFailed(false)
      setCopied(true)
      timer.current = setTimeout(() => setCopied(false), 1800)
    } catch {
      setFailed(true)
    }
  }

  return (
    <div ref={ref} className={cn('overflow-hidden rounded-2xl border border-rule bg-surface text-left shadow-soft', className)}>
      <div className="flex items-center gap-2 border-b border-rule py-1 pr-1 pl-4">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-surface-3" />
          <span className="size-2.5 rounded-full bg-surface-3" />
          <span className="size-2.5 rounded-full bg-surface-3" />
        </span>
        <span className="caption-5 ml-2 font-mono text-muted">zsh</span>
        <button type="button" onClick={copy} aria-label={copied ? 'Copied' : 'Copy install commands'} className="icon-btn ml-auto">
          <CopyIcon className={cn('size-5 transition-[opacity,transform] duration-300 ease-base', copied && 'scale-50 opacity-0')} />
          <CheckIcon
            weight="bold"
            className={cn('absolute size-5 text-good transition-[opacity,transform] duration-300 ease-base', !copied && 'scale-50 opacity-0')}
          />
        </button>
      </div>

      {/* Screen readers get the commands once, not the typing. */}
      <pre className="sr-only">{INSTALL_LINES.join('\n')}</pre>
      <pre aria-hidden className="caption-2 min-h-[164px] overflow-x-auto px-4 py-3 font-mono text-ink">
        {SCRIPT.map((line, i) => {
          if (i > step) return null
          if (line.cmd) {
            const text = i < step ? line.cmd : line.cmd.slice(0, chars)
            return (
              <div key={i}>
                <span className="mr-2 text-muted select-none">$</span>
                {text}
                {i === step && <span className="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-pulse bg-ink" />}
              </div>
            )
          }
          if (i === step) return null
          return (
            <div key={i} className={line.good ? 'text-good' : 'text-muted'}>
              {line.out}
            </div>
          )
        })}
      </pre>

      <p aria-live="polite" className={cn('caption-5 px-4', !copied && !failed ? 'sr-only' : 'pb-3', failed ? 'text-bad' : 'text-muted')}>
        {copied && 'Install commands copied.'}
        {failed && 'Copy was blocked by the browser. Select the text and copy it yourself.'}
      </p>
    </div>
  )
}
