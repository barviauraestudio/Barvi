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

  const isMobile = () => window.innerWidth < 768

  const linesData = useRef(
    Array.from({ length: LINES_COUNT }, () => {
      const mobile = isMobile()
      return {
        yStart: mobile ? 18 + Math.random() * 64 : 15 + Math.random() * 70,
        amp1: mobile ? 14 + Math.random() * 28 : 22 + Math.random() * 48,
        amp2: mobile ? 9 + Math.random() * 20 : 14 + Math.random() * 35,
        amp3: mobile ? 6 + Math.random() * 14 : 9 + Math.random() * 25,
        freq1: 0.8 + Math.random() * 2.3,
        freq2: 1.1 + Math.random() * 2.7,
        freq3: 0.5 + Math.random() * 1.4,
        phase1: Math.random() * Math.PI * 2,
        phase2: Math.random() * Math.PI * 2,
        phase3: Math.random() * Math.PI * 2,
        speed: mobile ? 0.3 + Math.random() * 0.5 : 0.35 + Math.random() * 0.65,
        opacity: mobile ? 0.08 + Math.random() * 0.22 : 0.1 + Math.random() * 0.28,
        thickness: mobile ? 0.6 + Math.random() * 1.1 : 0.7 + Math.random() * 1.4,
        color: Math.random() > 0.6 ? 'crimson' : Math.random() > 0.5 ? 'gold' : 'white',
      }
    })
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
      ctx?.scale(dpr, dpr)
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
      if (lineRef.current) {
        lineRef.current.style.transition = 'width 1.4s cubic-bezier(0.22,1,0.36,1), opacity 0.8s ease'
        lineRef.current.style.width = '220px'
        lineRef.current.style.opacity = '1'
      }
    }, 4500)

    setTimeout(() => {
      if (textRef.current) {
        textRef.current.style.opacity = '1'
        textRef.current.style.transform = 'translateY(0)'
      }
    }, 5000)
  }

  function startLinesAnimation() {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const CHAOS_DURATION = 2500
    const CONVERGE_DURATION = 2000
    const isMobileDevice = isMobile()

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
      const PADDING = isMobileDevice ? 28 : 22
      const safeHeight = H - PADDING * 2
      const yCenter = PADDING + (safeHeight * (yBase / 100))

      const POINTS = 95

      ctx.beginPath()
      for (let p = 0; p <= POINTS; p++) {
        const x = (p / POINTS) * W
        const xNorm = p / POINTS

        let wave =
          amp1 * ampFactor * Math.sin(xNorm * freq1 * Math.PI * 2 + phase1 + time * speed) +
          amp2 * ampFactor * Math.sin(xNorm * freq2 * Math.PI * 2 + phase2 + time * speed * 1.3) +
          amp3 * ampFactor * Math.sin(xNorm * freq3 * Math.PI * 2 + phase3 + time * speed * 0.7)

        const edgeFactor = Math.max(0.2, 1 - Math.pow(Math.abs(yBase - 50) / 50, 1.8))
        wave *= edgeFactor

        let y = yCenter + wave
        y = Math.max(PADDING + 6, Math.min(H - PADDING - 6, y))

        if (p === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      if (color === 'gold') {
        ctx.strokeStyle = `rgba(201,169,110,${opacity.toFixed(2)})`
        ctx.shadowColor = 'rgba(201,169,110,0.5)'
        ctx.shadowBlur = isMobileDevice ? 5 * ampFactor : 7 * ampFactor + 2
      } else if (color === 'crimson') {
        ctx.strokeStyle = `rgba(139,0,0,${opacity.toFixed(2)})`
        ctx.shadowColor = 'rgba(139,0,0,0.4)'
        ctx.shadowBlur = isMobileDevice ? 3 * ampFactor : 5 * ampFactor
      } else {
        ctx.strokeStyle = `rgba(242,237,230,${(opacity * 0.35).toFixed(2)})`
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

      const ctx = canvasEl.getContext('2d')
      if (!ctx) return

      const W = canvasEl.width / dpr
      const H = canvasEl.height / dpr

      ctx.clearRect(0, 0, W, H)

      const elapsed = now - startTimeRef.current
      const time = elapsed / 1000
      const targetY = isMobileDevice ? 55 : 56

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
        linesData.current.forEach(line => {
          const currentY = lerp(line.yStart, targetY, t)
          const ampFactor = lerp(1.0, 0.0, t)
          const currentOpacity = lerp(line.opacity, 0.0, t)

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
        })
      }

      if (elapsed < CHAOS_DURATION + CONVERGE_DURATION + 300) {
        rafRef.current = requestAnimationFrame(draw)
      }
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
          {/* Título, frase, linha e texto (mesmo de antes) */}
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

          <p ref={phraseRef} style={{
            fontFamily: 'var(--FD)', fontStyle: 'italic',
            fontSize: 'clamp(18px, 2.2vw, 28px)', color: 'var(--gold)',
            letterSpacing: '0.02em', marginBottom: 20,
            opacity: 0, transform: 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}>
            Na estética, no volume, no foco.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div
              ref={lineRef}
              style={{
                height: 1,
                width: 0,
                opacity: 0,
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.7), transparent)',
              }}
            />
          </div>

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
