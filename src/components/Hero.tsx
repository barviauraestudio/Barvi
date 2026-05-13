import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import CenterWrapper from './CenterWrapper'
import FadeContent from './FadeContent'

// Words with their styling and whether a line break follows
const TITLE_WORDS = [
  { text: 'Do', style: {}, breakAfter: false },
  { text: 'invisível', style: {}, breakAfter: true },
  { text: 'ao', style: {}, breakAfter: false },
  { text: 'inevitável.', style: { color: 'var(--gold)', fontStyle: 'italic' }, breakAfter: false },
]

const STEP_DURATION = 0.55
const DELAY_MS = 120

const fromSnap = { filter: 'blur(10px)', opacity: 0, y: -50 }
const toSnap = [
  { filter: 'blur(5px)', opacity: 0.5, y: 5 },
  { filter: 'blur(0px)', opacity: 1, y: 0 },
]
const totalDuration = STEP_DURATION * (toSnap.length)

function buildKeyframes() {
  return {
    filter: [fromSnap.filter, toSnap[0].filter, toSnap[1].filter],
    opacity: [fromSnap.opacity, toSnap[0].opacity, toSnap[1].opacity],
    y: [fromSnap.y, toSnap[0].y, toSnap[1].y],
  }
}

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold: 0.01 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function onMouseMove(e: React.MouseEvent) {
    const rx = (e.clientX / window.innerWidth - 0.5) * 22
    const ry = (e.clientY / window.innerHeight - 0.5) * 16
    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${rx}px, ${ry}px)`
    }
  }

  const kf = buildKeyframes()

  return (
    <section id="hero" onMouseMove={onMouseMove} style={{ position: 'relative' }}>
      <div className="hero-glow" ref={glowRef} />
      <div className="hero-line" />
      <div className="hero-ring" />
      <div className="hero-ring hero-ring-2" />
      <CenterWrapper>
        <FadeContent duration={900} delay={100} threshold={0.01}>
          <p className="studio-label">· Barví Aura Estúdio ·</p>
        </FadeContent>

        {/* Title with word-by-word blur cascade */}
        <h1 ref={titleRef} className="hero-title" style={{ margin: 0, display: 'block' }}>
          {TITLE_WORDS.map((word, i) => (
            <span key={i} style={{ display: 'inline' }}>
              <motion.span
                className="inline-block will-change-[transform,filter,opacity]"
                initial={fromSnap as never}
                animate={inView ? (kf as never) : (fromSnap as never)}
                transition={{ duration: totalDuration, times: [0, 0.5, 1], delay: (i * DELAY_MS) / 1000, ease: t => t }}
                style={word.style}
              >
                {word.text}
              </motion.span>
              {i < TITLE_WORDS.length - 1 && !word.breakAfter && '\u00A0'}
              {word.breakAfter && <br />}
            </span>
          ))}
        </h1>

        <FadeContent duration={900} delay={600} blur threshold={0.01}>
          <div className="hero-divider" />
        </FadeContent>

        <FadeContent duration={900} delay={800} blur threshold={0.01}>
          <p className="hero-tagline">
            Não prestamos serviço. Você compra Barví.<br />
            Não somos agência. Somos atmosfera.
          </p>
        </FadeContent>

        <FadeContent duration={900} delay={1100} threshold={0.01}>
          <div className="scroll-cue">
            <span>Descobrir</span>
            <div className="scroll-line" />
          </div>
        </FadeContent>
      </CenterWrapper>


    </section>
  )
}