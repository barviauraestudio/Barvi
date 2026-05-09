import { useEffect, useRef, useState } from 'react'

interface AudioPlayerProps {
  src?: string
}

export default function AudioPlayer({ src = '/SITE-AURA-AUDIO.MP3' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const startedRef = useRef(false)
  const fadeInRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const fadeOutRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearFade = () => {
    if (fadeInRef.current) { clearInterval(fadeInRef.current); fadeInRef.current = null }
    if (fadeOutRef.current) { clearInterval(fadeOutRef.current); fadeOutRef.current = null }
  }

  const fadeIn = () => {
    clearFade()
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0
    fadeInRef.current = setInterval(() => {
      const next = Math.min(audio.volume + 0.03, 0.55)
      audio.volume = next
      if (next >= 0.55) { clearInterval(fadeInRef.current!); fadeInRef.current = null }
    }, 80)
  }

  const fadeOut = (cb?: () => void) => {
    clearFade()
    const audio = audioRef.current
    if (!audio) return
    fadeOutRef.current = setInterval(() => {
      const next = Math.max(audio.volume - 0.05, 0)
      audio.volume = next
      if (next <= 0) {
        clearInterval(fadeOutRef.current!); fadeOutRef.current = null
        cb?.()
      }
    }, 40)
  }

  const startAudio = () => {
    if (startedRef.current) return
    startedRef.current = true
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0
    audio.play()
      .then(() => { fadeIn(); setPlaying(true) })
      .catch(() => {})
  }

  const handleButtonClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const audio = audioRef.current
    if (!audio) return

    if (!startedRef.current) {
      startAudio()
      return
    }

    if (!audio.paused) {
      fadeOut(() => audio.pause())
      setPlaying(false)
    } else {
      audio.play().catch(() => {})
      fadeIn()
      setPlaying(true)
    }
  }

  useEffect(() => {
    const onFirstInteraction = (e: Event) => {
      const target = e.target as Element
      if (target.closest('#audioBtn')) return // botão cuida de si mesmo
      startAudio()
    }

    const events = ['click', 'touchstart', 'keydown'] as const
    events.forEach(ev => document.addEventListener(ev, onFirstInteraction, { once: true, passive: true }))

    return () => {
      events.forEach(ev => document.removeEventListener(ev, onFirstInteraction))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <audio ref={audioRef} loop preload="auto" src={src} />

      <button
        id="audioBtn"
        aria-label={playing ? 'Pausar música ambiente' : 'Reproduzir música ambiente'}
        onClick={handleButtonClick}
        onTouchEnd={handleButtonClick}
        className={playing ? 'playing' : 'paused'}
      >
        <span className="audio-icon">
          <span className="bar b1" />
          <span className="bar b2" />
          <span className="bar b3" />
          <span className="bar b4" />
        </span>
        <span className="audio-label">som</span>
      </button>

      <style>{`
        #audioBtn {
          position: fixed;
          bottom: 32px; right: 32px;
          z-index: 500;
          display: flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: 1px solid rgba(201,169,110,0.13);
          box-shadow: inset 0 1px 0 rgba(255,240,210,0.13), inset 0 -1px 0 rgba(80,0,0,0.18), inset 1px 0 0 rgba(255,240,210,0.04), inset -1px 0 0 rgba(255,240,210,0.04), 0 12px 40px rgba(0,0,0,0.5);
          padding: 10px 18px 10px 14px;
          cursor: pointer;
          isolation: isolate;
          overflow: hidden;
          will-change: transform;
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1);
          animation: fadeUp 0.8s ease 1.5s both;
        }
        #audioBtn::before {
          content: '';
          position: absolute; inset: 0; z-index: -2;
          background: rgba(8,2,5,0.52);
          backdrop-filter: blur(32px) saturate(2.1) brightness(1.04);
          -webkit-backdrop-filter: blur(32px) saturate(2.1) brightness(1.04);
          transform: translate3d(0,0,0);
          transition: background 0.4s ease;
          pointer-events: none;
        }
        #audioBtn::after {
          content: '';
          position: absolute; inset: 0; z-index: -1;
          background: rgba(139,0,0,0.06);
          background-image: linear-gradient(135deg, rgba(255,240,210,0.09) 0%, rgba(201,169,110,0.07) 30%, rgba(139,0,0,0.04) 55%, transparent 75%);
          pointer-events: none;
          transition: background-color 0.4s ease;
        }
        #audioBtn:hover::before { background: rgba(18,5,9,0.72); }
        #audioBtn:hover::after  { background-color: rgba(139,0,0,0.14); }
        #audioBtn:hover {
          border-color: rgba(201,169,110,0.36);
          box-shadow: inset 0 1px 0 rgba(255,240,210,0.13), inset 0 -1px 0 rgba(80,0,0,0.18), 0 28px 72px rgba(0,0,0,0.62), 0 4px 20px rgba(139,0,0,0.22);
          transform: translateY(-3px);
        }
        #audioBtn.paused {
          animation: fadeUp 0.8s ease 1.5s both, btnPulse 2.8s ease-in-out 2.3s infinite;
        }
        @keyframes btnPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(201,169,110,0); border-color: rgba(201,169,110,0.28); }
          50%      { box-shadow: 0 0 0 8px rgba(201,169,110,0.1); border-color: rgba(201,169,110,0.6); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .audio-icon { display: flex; align-items: flex-end; gap: 3px; height: 18px; }
        .bar { display: block; width: 3px; background: #B8AFA6; border-radius: 2px; transform-origin: bottom; transition: background 0.3s; }
        .b1 { height: 8px; }
        .b2 { height: 14px; }
        .b3 { height: 10px; }
        .b4 { height: 6px; }
        #audioBtn.playing .b1 { animation: barPulse 0.9s ease-in-out 0.0s infinite alternate; background: #C9A96E; }
        #audioBtn.playing .b2 { animation: barPulse 0.9s ease-in-out 0.2s infinite alternate; background: #C9A96E; }
        #audioBtn.playing .b3 { animation: barPulse 0.9s ease-in-out 0.1s infinite alternate; background: #C9A96E; }
        #audioBtn.playing .b4 { animation: barPulse 0.9s ease-in-out 0.3s infinite alternate; background: #C9A96E; }
        #audioBtn.paused .bar { animation: none !important; background: #B8AFA6; }
        @keyframes barPulse {
          from { transform: scaleY(0.3); }
          to   { transform: scaleY(1.1); }
        }
        .audio-label {
          font-size: 9px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #B8AFA6;
          transition: color 0.3s;
          white-space: nowrap;
        }
        #audioBtn.playing .audio-label { color: #C9A96E; }
        #audioBtn:hover .audio-label   { color: #E8D5B0; }
        @media (max-width: 640px) {
          #audioBtn { bottom: 20px; right: 20px; padding: 9px 14px 9px 12px; }
        }
      `}</style>
    </>
  )
}
