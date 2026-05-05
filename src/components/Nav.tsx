import { useEffect, useRef } from 'react'
import CenterWrapper from './CenterWrapper'

type Props = {
  menuOpen: boolean
  onToggle: () => void
}

export default function Nav({ menuOpen, onToggle }: Props) {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function onScroll() {
      navRef.current?.classList.toggle('scrolled', window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav id="nav" ref={navRef}>
      <CenterWrapper>
        <a href="#hero" className="nav-logo">Barví Aura Estúdio</a>
        <ul className="nav-links">
          <li><a href="#quem-somos">Quem Somos</a></li>
          <li><a href="#pilares">Pilares</a></li>
          <li><a href="#psicologia">Psicologia</a></li>
          <li><a href="#parceiros">Parceiros</a></li>
          <li><a href="#cta">Contato</a></li>
           <li>
    <a href="https://consultoriabarvi.netlify.app" target="_blank" rel="noopener noreferrer"
       style={{ color: 'var(--gold)' }}>
      Consultoria ↗
    </a>
  </li>
        </ul>
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          aria-label="Menu"
          onClick={onToggle}
        >
          <span /><span /><span />
        </button>
      </CenterWrapper>
    </nav>
  )
}
