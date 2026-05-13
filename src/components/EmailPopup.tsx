import { useEffect, useState } from 'react'
import GlassSurface from './GlassSurface'

export default function EmailPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const subscribed = localStorage.getItem('barvi-subscribed')
    if (subscribed) return
    const timer = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  async function handleSubmit() {
    if (!email || !email.includes('@')) {
      setErrorMsg('Digite um e-mail válido.')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok || res.status === 204) {
        localStorage.setItem('barvi-subscribed', '1')
        setStatus('success')
      } else {
        const data = await res.json()
        setErrorMsg(data.message || 'Erro ao cadastrar. Tente novamente.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Erro de conexão. Tente novamente.')
      setStatus('error')
    }
  }

  if (!visible) return null

  return (
    <>
      <div
        onClick={() => setVisible(false)}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(4,1,2,0.65)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          zIndex: 900,
          animation: 'popupFadeIn 0.4s ease both',
        }}
      />

      <div
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 901,
          width: 'min(520px, 90vw)',
          animation: 'popupSlideIn 0.5s cubic-bezier(0.22,1,0.36,1) both',
        }}
      >
        <GlassSurface
          width="100%"
          height="auto"
          borderRadius={16}
          borderWidth={0.07}
          distortionScale={-300}
          redOffset={0}
          greenOffset={20}
          blueOffset={40}
          brightness={60}
          opacity={0.95}
          blur={20}
          displace={1}
          backgroundOpacity={0.12}
          saturation={1.5}
          mixBlendMode="difference"
          className="email-popup-glass"
          style={{ minHeight: 0 }}
        >
          <div style={{ width: '100%', padding: 'clamp(36px, 6vw, 56px)', position: 'relative', boxSizing: 'border-box' }}>
            {/* Linha superior dourada */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)',
            }} />

            {/* Glow vermelho */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(139,0,0,0.22) 0%, transparent 70%)',
            }} />

            {/* Tint dourado */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'linear-gradient(135deg, rgba(255,240,210,0.07) 0%, rgba(201,169,110,0.05) 30%, rgba(139,0,0,0.03) 55%, transparent 75%)',
            }} />

            {/* Fechar */}
            <button
              onClick={() => setVisible(false)}
              style={{
                position: 'absolute', top: 20, right: 20, zIndex: 2,
                background: 'none', border: 'none',
                color: 'rgba(184,175,166,0.5)', cursor: 'pointer',
                fontSize: 22, lineHeight: 1, padding: 4,
                transition: 'color 0.3s',
              }}
              onMouseOver={e => (e.currentTarget.style.color = '#C9A96E')}
              onMouseOut={e => (e.currentTarget.style.color = 'rgba(184,175,166,0.5)')}
            >×</button>

            <div style={{ position: 'relative', zIndex: 2 }}>
              {status === 'success' ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    border: '1px solid rgba(201,169,110,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                    background: 'rgba(201,169,110,0.08)',
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: 'italic', fontSize: 'clamp(24px,4vw,32px)',
                    color: '#F2EDE6', marginBottom: 12, lineHeight: 1.2,
                  }}>Bem-vindo à órbita.</p>
                  <p style={{ fontSize: 14, color: '#B8AFA6', lineHeight: 1.7 }}>
                    Você será o primeiro a saber quando algo novo surgir.
                  </p>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#A8883A', marginBottom: 20 }}>
                    · Barví Aura Estúdio ·
                  </p>
                  <h2 style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 300, fontSize: 'clamp(26px,4vw,38px)',
                    color: '#F2EDE6', lineHeight: 1.15, marginBottom: 12,
                    letterSpacing: '-0.02em',
                  }}>
                    Fique na <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>frequência.</em>
                  </h2>
                  <p style={{ fontSize: 14, color: '#B8AFA6', lineHeight: 1.78, marginBottom: 32 }}>
                    Novidades, lançamentos e conteúdos exclusivos.<br />Sem spam. Só o que importa.
                  </p>
                  <div style={{ marginBottom: 14 }}>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setErrorMsg('') }}
                      onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.04)',
                        border: `1px solid ${errorMsg ? 'rgba(192,48,42,0.6)' : 'rgba(201,169,110,0.2)'}`,
                        borderRadius: 8,
                        padding: '14px 18px',
                        color: '#F2EDE6', fontSize: 14,
                        fontFamily: "'Outfit', sans-serif",
                        outline: 'none', transition: 'border-color 0.3s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'}
                      onBlur={e => e.currentTarget.style.borderColor = errorMsg ? 'rgba(192,48,42,0.6)' : 'rgba(201,169,110,0.2)'}
                    />
                  </div>
                  {errorMsg && (
                    <p style={{ fontSize: 12, color: '#C0302A', marginBottom: 14 }}>{errorMsg}</p>
                  )}
                  <button
                    onClick={handleSubmit}
                    disabled={status === 'loading'}
                    style={{
                      width: '100%',
                      background: status === 'loading' ? 'rgba(201,169,110,0.6)' : '#C9A96E',
                      border: 'none', padding: '15px 32px',
                      borderRadius: 8,
                      color: '#060606', fontSize: 10,
                      fontFamily: "'Outfit', sans-serif", fontWeight: 600,
                      letterSpacing: '0.38em', textTransform: 'uppercase',
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      transition: 'background 0.3s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    }}
                    onMouseOver={e => { if (status !== 'loading') e.currentTarget.style.background = '#E8D5B0' }}
                    onMouseOut={e => { if (status !== 'loading') e.currentTarget.style.background = '#C9A96E' }}
                  >
                    {status === 'loading' ? 'Cadastrando...' : (
                      <>Quero receber
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p style={{ fontSize: 11, color: 'rgba(184,175,166,0.5)', textAlign: 'center', marginTop: 16 }}>
                    Seus dados estão seguros. Cancele quando quiser.
                  </p>
                </div>
              )}
            </div>
          </div>
        </GlassSurface>
      </div>

      <style>{`
        @keyframes popupFadeIn {
          from { opacity: 0 } to { opacity: 1 }
        }
        @keyframes popupSlideIn {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 24px)) }
          to   { opacity: 1; transform: translate(-50%, -50%) }
        }
        input::placeholder { color: rgba(184,175,166,0.4); }
        .email-popup-glass {
          border: 1px solid rgba(201,169,110,0.22) !important;
          border-radius: 16px !important;
          box-shadow: 0 0 0 1px rgba(201,169,110,0.06), 0 32px 80px rgba(0,0,0,0.7) !important;
        }
        .email-popup-glass .glass-surface__content {
          align-items: flex-start !important;
          justify-content: flex-start !important;
          padding: 0 !important;
        }
      `}</style>
    </>
  )
}
