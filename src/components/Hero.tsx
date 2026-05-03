import { useRef } from 'react'
import CenterWrapper from './CenterWrapper'

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null)

  function onMouseMove(e: React.MouseEvent) {
    const rx = (e.clientX / window.innerWidth - 0.5) * 22
    const ry = (e.clientY / window.innerHeight - 0.5) * 16
    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${rx}px, ${ry}px)`
    }
  }

  return (
    <section id="hero" onMouseMove={onMouseMove}>
      <div className="hero-glow" ref={glowRef} />
      <div className="hero-line" />
      <div className="hero-ring" />
      <div className="hero-ring hero-ring-2" />
      <CenterWrapper>
        <p className="studio-label">· Barví Aura Estúdio ·</p>
        <h1 className="hero-title">
          Do invisível<br />ao <em>inevitável.</em>
        </h1>
        <div className="hero-divider" />
        <p className="hero-tagline">
          Não prestamos serviço. Você compra Barví.<br />
          Não somos agência. Somos atmosfera.
        </p>
        <div className="scroll-cue">
          <span>Descobrir</span>
          <div className="scroll-line" />
        </div>
      </CenterWrapper>
    </section>
  )
}
