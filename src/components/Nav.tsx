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
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', window.scrollY > 40)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        #nav {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          transition: padding 0.4s cubic-bezier(0.22,1,0.36,1), background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s, box-shadow 0.4s !important;
          border-bottom: 1px solid transparent !important;
        }
        #nav.scrolled {
          background: rgba(4, 1, 2, 0.5) !important;
          backdrop-filter: blur(48px) saturate(2.4) brightness(0.95) !important;
          -webkit-backdrop-filter: blur(48px) saturate(2.4) brightness(0.95) !important;
          border-bottom-color: rgba(201,169,110,0.36) !important;
          box-shadow: 0 1px 0 rgba(201,169,110,0.08), 0 8px 40px rgba(0,0,0,0.55) !important;
        }
      `}</style>
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
              <a href="https://consultoria-tawny-zeta.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>
                Consultoria ↗
              </a>
            </li>
            <li>
              <a href="https://planos-roan.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>
                Nossos Planos ↗
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
    </>
  )
}
