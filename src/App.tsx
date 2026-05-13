import { useState, useEffect } from 'react'

import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import MobileMenu from './components/MobileMenu'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Pillars from './components/Pillars'
import Psychology from './components/Psychology'
import Palette from './components/Palette'
import Partners from './components/Partners'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import AudioPlayer from './components/AudioPlayer'
import { useBlurSiblings } from './components/useBlurSiblings'
import EmailPopup from './components/EmailPopup'
import Minimalism from './components/Minimalism'
import SoftAurora from './components/SoftAurora'

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <button
        id="back-to-top"
        aria-label="Voltar ao topo"
        onClick={scrollTop}
        className={visible ? 'btt-visible' : ''}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
        <span>topo</span>
      </button>

      <style>{`
        #back-to-top {
          position: fixed;
          bottom: 32px;
          left: 32px;
          z-index: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(10,3,5,0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(201,169,110,0.18);
          padding: 10px 16px 10px 12px;
          cursor: pointer;
          opacity: 0;
          pointer-events: none;
          transform: translateY(12px);
          transition: opacity 0.35s, transform 0.35s, border-color 0.35s, background 0.35s;
        }
        #back-to-top.btt-visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
        #back-to-top:hover {
          border-color: rgba(201,169,110,0.55);
          background: rgba(20,5,10,0.88);
          transform: translateY(-3px);
        }
        #back-to-top svg { stroke: #C9A96E; flex-shrink: 0; }
        #back-to-top span {
          font-size: 9px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #B8AFA6;
          transition: color 0.3s;
          white-space: nowrap;
          font-family: 'Outfit', sans-serif;
        }
        #back-to-top:hover span { color: #E8D5B0; }
        @media (max-width: 640px) {
          #back-to-top { bottom: 20px; left: 20px; padding: 9px 14px 9px 12px; }
        }
      `}</style>
    </>
  )
}

function App() {
  useBlurSiblings(".pillars-grid", ".pillar-card");
  useBlurSiblings(".psych-states", ".psych-state");
  useBlurSiblings(".testimonials-grid", ".testimonial-card");
  useBlurSiblings(".manifesto-tagline", ".manifesto-pill");

  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(prev => {
      document.body.style.overflow = !prev ? 'hidden' : ''
      return !prev
    })
  }

  function closeMenu() {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      {/* SoftAurora — fixed background, all sections scroll over it */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -2, overflow: 'hidden' }}>
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1.2}
          color1="#f7f7f7"
          color2="#ff0000"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction
          mouseInfluence={0.25}
        />
      </div>
      {/* Película suavizada para dar mais vida à aurora */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: 'rgba(6,2,4,0.30)', pointerEvents: 'none' }} />
      <Cursor />
      <ScrollProgress />
      <MobileMenu open={menuOpen} onClose={closeMenu} />
      <Nav menuOpen={menuOpen} onToggle={toggleMenu} />
      <Hero />
      <Manifesto />
      <Minimalism />
      <Pillars />
      <Psychology />
      <Palette />
      <Partners />
      <Testimonials />
      <CTA />
      <Footer />
      <AudioPlayer src="/SITE-AURA-AUDIO.MP3" />
      <BackToTop />
      <EmailPopup />
    </>
  )
}

export default App
