import { createContext, useContext } from 'react'
import { cn } from '../../lib/cn.js'

// Ported from 21st.dev "Announcement" by haydenbleasel (a compound badge).
// The shadcn Badge dependency is dropped and colors use this site's tokens.

const AnnouncementContext = createContext({ themed: false })

export function Announcement({ as: Tag = 'a', themed = false, className, ...props }) {
  return (
    <AnnouncementContext.Provider value={{ themed }}>
      <Tag
        className={cn(
          'inline-flex max-w-full items-center gap-2 rounded-full border border-rule bg-surface py-0.5 pr-3 pl-3 shadow-soft',
          'transition-[transform,border-color] duration-300 ease-base hover:border-rule-strong active:scale-[0.98]',
          className,
        )}
        {...props}
      />
    </AnnouncementContext.Provider>
  )
}

export function AnnouncementTag({ className, ...props }) {
  const { themed } = useContext(AnnouncementContext)
  return (
    <span
      className={cn(
        'caption-4 -ml-2.5 shrink-0 truncate rounded-full bg-surface-2 px-2.5 py-1 text-ink',
        themed && 'bg-bg/60',
        className,
      )}
      {...props}
    />
  )
}

export function AnnouncementTitle({ className, ...props }) {
  return <span className={cn('caption-1 flex items-center gap-1 truncate py-1 text-ink-2', className)} {...props} />
}
