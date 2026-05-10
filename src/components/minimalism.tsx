import { useEffect, useRef } from 'react'
import CenterWrapper from './CenterWrapper'

const LETTERS = 'MINIMALISMO'.split('')

export default function Minimalism() {
  const sectionRef = useRef<HTMLElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const phraseRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let animated = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          animated = true
          animate()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  function animate() {
    // Linha se expande
    if (lineRef.current) {
      lineRef.current.style.transition = 'width 1.2s cubic-bezier(0.22,1,0.36,1)'
      lineRef.current.style.width = '100%'
    }

    // Letras aparecem uma por uma
    lettersRef.current.forEach((el, i) => {
      if (!el) return
      setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        el.style.filter = 'blur(0px)'
      }, 300 + i * 80)
    })

    // Frase aparece
    setTimeout(() => {
      if (phraseRef.current) {
        phraseRef.current.style.opacity = '1'
        phraseRef.current.style.transform = 'translateY(0)'
      }
    }, 300 + LETTERS.length * 80 + 200)

    // Texto aparece
    setTimeout(() => {
      if (textRef.current) {
        textRef.current.style.opacity = '1'
        textRef.current.style.transform = 'translateY(0)'
      }
    }, 300 + LETTERS.length * 80 + 500)
  }

  return (
    <section
      ref={sectionRef}
      id="minimalismo"
      style={{
        padding: '120px 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Fundo sutil */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)',
      }} />

      <CenterWrapper>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Linha horizontal animada */}
          <div
            ref={lineRef}
            style={{
              height: 1,
              width: 0,
              background: 'linear-gradient(90deg, var(--crimson), rgba(201,169,110,0.4), transparent)',
              marginBottom: 56,
            }}
          />

          {/* MINIMALISMO — letra por letra */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(2px, 0.8vw, 10px)',
            marginBottom: 48,
            overflow: 'hidden',
          }}>
            {LETTERS.map((letter, i) => (
              <span
                key={i}
                ref={el => { lettersRef.current[i] = el }}
                style={{
                  fontFamily: 'var(--FD)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(52px, 9vw, 130px)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  color: i === 0 ? 'var(--gold)' : 'var(--white)',
                  opacity: 0,
                  transform: 'translateY(40px)',
                  filter: 'blur(8px)',
                  transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease',
                  display: 'inline-block',
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          {/* Frase */}
          <p
            ref={phraseRef}
            style={{
              fontFamily: 'var(--FD)',
              fontStyle: 'italic',
              fontSize: 'clamp(20px, 2.5vw, 32px)',
              color: 'var(--gold)',
              letterSpacing: '0.02em',
              marginBottom: 24,
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            Trabalhamos com minimalismo.
          </p>

          {/* Texto + linha divisória */}
          <div
            ref={textRef}
            style={{
              display: 'flex',
              gap: 48,
              alignItems: 'flex-start',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <div style={{
              width: 2,
              minHeight: 80,
              background: 'linear-gradient(180deg, var(--crimson), transparent)',
              flexShrink: 0,
              marginTop: 4,
            }} />
            <p style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              color: 'var(--muted)',
              lineHeight: 1.88,
              maxWidth: 620,
            }}>
              Na estética, no volume, no foco. Removemos o que distrai.
              Cada escolha é intencional, cada silêncio tem peso.
              O que sobra é <em style={{ color: 'var(--goldlt)', fontStyle: 'italic' }}>intenção pura.</em>
            </p>
          </div>

          {/* Linha inferior */}
          <div style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.15), transparent)',
            marginTop: 72,
          }} />

        </div>
      </CenterWrapper>
    </section>
  )
}