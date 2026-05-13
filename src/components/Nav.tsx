import { useEffect, useRef } from 'react'

type Props = {
  menuOpen: boolean
  onToggle: () => void
}

export default function Nav({ menuOpen, onToggle }: Props) {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    function onScroll() {
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', window.scrollY > 100)
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
          position: fixed !important;
          top: 18px !important;
          left: 50% !important;
          right: auto !important;
          transform: translateX(-50%) translateY(-10px) !important;
          width: max-content !important;
          max-width: calc(100vw - 32px) !important;
          height: 40px !important;
          padding: 0 24px !important;
          background: rgba(4, 1, 2, 0.38) !important;
          backdrop-filter: blur(48px) saturate(2.4) brightness(0.95) !important;
          -webkit-backdrop-filter: blur(48px) saturate(2.4) brightness(0.95) !important;
          border: 1px solid rgba(201,169,110,0.15) !important;
          border-radius: 60px !important;
          box-shadow: 0 4px 32px rgba(0,0,0,0.35) !important;
          z-index: 200;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 20px !important;
          white-space: nowrap !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          transition: 
            opacity 0.4s ease, 
            visibility 0.4s ease, 
            transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.4s ease, 
            border-color 0.4s !important;
        }
        #nav.scrolled {
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          transform: translateX(-50%) translateY(0) !important;
          background: rgba(4, 1, 2, 0.60) !important;
          border-color: rgba(201,169,110,0.28) !important;
        }
        #nav::before, #nav::after {
          display: none !important;
          content: none !important;
        }
        #nav .nav-links {
          display: flex !important;
          gap: 20px !important;
          margin: 0 !important;
          padding: 0 !important;
          list-style: none !important;
          align-items: center !important;
        }
        #nav .nav-links li {
          margin: 0 !important;
          padding: 0 !important;
          display: flex !important;
          align-items: center !important;
        }
        #nav .nav-links a {
          font-size: 9.5px;
          line-height: 1 !important;
          display: block !important;
        }
        #nav .hamburger {
          display: flex !important;
          flex-shrink: 0;
          margin-left: 4px;
          padding: 0 !important;
          height: 14px !important;
          justify-content: center !important;
        }
        #nav .hamburger span {
          width: 20px !important;
        }
        @media (max-width: 640px) {
          #nav { 
            left: auto !important;
            right: 16px !important;
            transform: translateY(-10px) !important;
            padding: 0 12px !important;
            gap: 0 !important; 
          }
          #nav.scrolled {
            transform: translateY(0) !important;
          }
          #nav .nav-links { display: none !important; }
          #nav .hamburger { margin-left: 0 !important; }
        }
      `}</style>

      <nav id="nav" ref={navRef}>
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
      </nav>
    </>
  )
}
