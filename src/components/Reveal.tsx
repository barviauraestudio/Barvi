import { useEffect, useRef } from 'react'

const DELAYS = ['', '0.08s', '0.18s', '0.28s', '0.38s'] as const

type Props = {
  children: React.ReactNode
  className?: string
  delay?: 1 | 2 | 3 | 4
  style?: React.CSSProperties
}

export default function Reveal({ children, className = '', delay, style }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) el.style.transitionDelay = DELAYS[delay]
          el.classList.remove('exit-up')
          el.classList.add('visible')
        } else {
          el.style.transitionDelay = '0s'
          el.classList.remove('visible', 'exit-up')
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  const cls = ['reveal', delay ? `reveal-d${delay}` : '', className].filter(Boolean).join(' ')

  return (
    <div ref={ref} className={cls} style={style}>
      {children}
    </div>
  )
}
