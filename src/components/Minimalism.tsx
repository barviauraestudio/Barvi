import { useEffect, useRef } from 'react'
import CenterWrapper from './CenterWrapper'

const LETTERS = 'MINIMALISMO'.split('')
const LINES_COUNT = 16

export default function Minimalism() {
  const sectionRef = useRef<HTMLElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const phraseRef = useRef<HTMLParagraphElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animatedRef = useRef(false)
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  // Cada linha tem múltiplos pontos de controle para formar curvas moles
  const linesData = useRef(
    Array.from({ length: LINES_COUNT }, () => ({  // ← removido 'i' não utilizado
      yStart: 5 + Math.random() * 90,
      amp1: 30 + Math.random() * 80,
      amp2: 20 + Math.random() * 60,
      amp3: 15 + Math.random() * 40,
      freq1: 0.8 + Math.random() * 2.5,
      freq2: 1.2 + Math.random() * 3,
      freq3: 0.5 + Math.random() * 1.5,
      phase1: Math.random() * Math.PI * 2,
      phase2: Math.random() * Math.PI * 2,
      phase3: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.8,
      opacity: 0.12 + Math.random() * 0.35,
      thickness: 0.8 + Math.random() * 1.8,
      color: Math.random() > 0.6 ? 'crimson' : Math.random() > 0.5 ? 'gold' : 'white',
    }))
  )

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const resizeCanvas = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = section.offsetWidth * dpr
      canvas.height = section.offsetHeight * dpr
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(dpr, dpr)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true
          animateText()
          startLinesAnimation()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(section)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  function animateText() {
    lettersRef.current.forEach((el, i) => {
      if (!el) return
      setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        el.style.filter = 'blur(0px)'
      }, 400 + i * 80)
    })

    setTimeout(() => {
      if (phraseRef.current) {
        phraseRef.current.style.opacity = '1'
        phraseRef.current.style.transform = 'translateY(0)'
      }
    }, 400 + LETTERS.length * 80 + 200)

    setTimeout(() => {
      if (textRef.current) {
        textRef.current.style.opacity = '1'
        textRef.current.style.transform = 'translateY(0)'
      }
    }, 400 + LETTERS.length * 80 + 500)

    // Linha decorativa aparece no final da convergência
    setTimeout(() => {
      if (lineRef.current) {
        lineRef.current.style.transition = 'width 1.4s cubic-bezier(0.22,1,0.36,1), opacity 0.8s ease'
        lineRef.current.style.width = '220px'
        lineRef.current.style.opacity = '1'
      }
    }, 4500)
  }

  function startLinesAnimation() {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1

    const CHAOS_DURATION = 2500
    const CONVERGE_DURATION = 2000
    const HOLD_DURATION = 800

    startTimeRef.current = performance.now()

    function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

    function drawWavyLine(
      ctx: CanvasRenderingContext2D,
      W: number, H: number,
      yBase: number,
      amp1: number, amp2: number, amp3: number,
      freq1: number, freq2: number, freq3: number,
      phase1: number, phase2: number, phase3: number,
      time: number,
      speed: number,
      color: string,
      opacity: number,
      thickness: number,
      ampFactor: number
    ) {
      const yCenter = H * yBase / 100
      const POINTS = 80

      ctx.beginPath()
      for (let p = 0; p <= POINTS; p++) {
        const x = (p / POINTS) * W
        const xNorm = p / POINTS

        const wave =
          amp1 * ampFactor * Math.sin(xNorm * freq1 * Math.PI * 2 + phase1 + time * speed) +
          amp2 * ampFactor * Math.sin(xNorm * freq2 * Math.PI * 2 + phase2 + time * speed * 1.3) +
          amp3 * ampFactor * Math.sin(xNorm * freq3 * Math.PI * 2 + phase3 + time * speed * 0.7)

        const y = yCenter + wave

        if (p === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      if (color === 'gold') {
        ctx.strokeStyle = `rgba(201,169,110,${opacity.toFixed(2)})`
        ctx.shadowColor = 'rgba(201,169,110,0.5)'
        ctx.shadowBlur = 8 * ampFactor + 4
      } else if (color === 'crimson') {
        ctx.strokeStyle = `rgba(139,0,0,${opacity.toFixed(2)})`
        ctx.shadowColor = 'rgba(139,0,0,0.4)'
        ctx.shadowBlur = 6 * ampFactor
      } else {
        ctx.strokeStyle = `rgba(242,237,230,${(opacity * 0.4).toFixed(2)})`
        ctx.shadowBlur = 0
      }

      ctx.lineWidth = thickness
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    function draw(now: number) {
      const canvasEl = canvasRef.current
      if (!canvasEl) return

      const W = canvasEl.width / dpr
      const H = canvasEl.height / dpr
      const ctx = canvasEl.getContext('2d')
      if (!ctx) return

      ctx.clearRect(0, 0, W, H)

      const elapsed = now - startTimeRef.current
      const time = elapsed / 1000
      const targetY = 62

      if (elapsed < CHAOS_DURATION) {
        linesData.current.forEach(line => {
          drawWavyLine(
            ctx, W, H,
            line.yStart,
            line.amp1, line.amp2, line.amp3,
            line.freq1, line.freq2, line.freq3,
            line.phase1, line.phase2, line.phase3,
            time, line.speed,
            line.color, line.opacity, line.thickness,
            1.0
          )
        })
      } else if (elapsed < CHAOS_DURATION + CONVERGE_DURATION) {
        const t = easeInOut((elapsed - CHAOS_DURATION) / CONVERGE_DURATION)

        linesData.current.forEach((line, i) => {
          const currentY = lerp(line.yStart, targetY, t)
          const ampFactor = lerp(1.0, 0.0, t)
          const currentOpacity = lerp(line.opacity, 0.0, t * 0.6)

          const convergeLine = i === Math.floor(LINES_COUNT / 2)

          drawWavyLine(
            ctx, W, H,
            currentY,
            line.amp1, line.amp2, line.amp3,
            line.freq1, line.freq2, line.freq3,
            line.phase1, line.phase2, line.phase3,
            time, line.speed,
            line.color,
            Math.max(0, currentOpacity),
            line.thickness,
            ampFactor
          )

          if (convergeLine) {
            drawWavyLine(
              ctx, W, H,
              currentY,
              line.amp1, line.amp2, line.amp3,
              line.phase1, 0, 0,
              0, 0, 0,
              time, line.speed * 0.3,
              'gold',
              t * 0.45,
              1.2,
              ampFactor * 0.3
            )
          }
        })
      } else {
        const holdT = Math.min(1, (elapsed - CHAOS_DURATION - CONVERGE_DURATION) / HOLD_DURATION)
        const pulseTime = (elapsed - CHAOS_DURATION - CONVERGE_DURATION) / 1000

        linesData.current.slice(0, 6).forEach((line) => {
          drawWavyLine(
            ctx, W, H,
            targetY,
            line.amp1 * 0.04, line.amp2 * 0.03, line.amp3 * 0.02,
            line.freq1, line.freq2, line.freq3,
            line.phase1, line.phase2, line.phase3,
            pulseTime, line.speed * 0.15,
            'white',
            0.03 * holdT,
            0.8,
            1.0
          )
        })
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
  }

  return (
    <section
      ref={sectionRef}
      id="minimalismo"
      style={{
        padding: '140px 0 120px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 0, pointerEvents: 'none',
        }}
      />

      <CenterWrapper>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto' }}>
          {/* MINIMALISMO */}
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(1px, 0.4vw, 5px)',
            marginBottom: 36,
          }}>
            {LETTERS.map((letter, i) => (
              <span
                key={i}
                ref={el => { lettersRef.current[i] = el }}
                style={{
                  fontFamily: 'var(--FD)', fontStyle: 'italic', fontWeight: 300,
                  fontSize: 'clamp(42px, 7vw, 110px)', lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  color: i === 0 ? 'var(--gold)' : 'var(--white)',
                  opacity: 0, transform: 'translateY(40px)', filter: 'blur(8px)',
                  transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.6s ease',
                  display: 'inline-block',
                }}
              >{letter}</span>
            ))}
          </div>

          {/* Frase */}
          <p ref={phraseRef} style={{
            fontFamily: 'var(--FD)', fontStyle: 'italic',
            fontSize: 'clamp(18px, 2.2vw, 28px)', color: 'var(--gold)',
            letterSpacing: '0.02em', marginBottom: 20,
            opacity: 0, transform: 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}>
            Na estética, no volume, no foco.
          </p>

          {/* Linha decorativa */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div
              ref={lineRef}
              style={{
                height: 1, width: 0, opacity: 0,
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)',
              }}
            />
          </div>

          {/* Texto */}
          <p ref={textRef} style={{
            fontSize: 'clamp(14px, 1.5vw, 17px)', color: 'var(--muted)',
            lineHeight: 1.88, maxWidth: 460, margin: '0 auto',
            opacity: 0, transform: 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}>
            Removemos o que distrai.
            Cada escolha é intencional, cada silêncio tem peso.
            O que sobra é{' '}
            <em style={{ color: 'var(--goldlt)', fontStyle: 'italic' }}>intenção pura.</em>
          </p>
        </div>
      </CenterWrapper>
    </section>
  )
}
