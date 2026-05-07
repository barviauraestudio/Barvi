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

  // Called once on the very first user interaction anywhere on the page
  const startAudio = () => {
    if (startedRef.current) return
    startedRef.current = true
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0
    audio.play()
      .then(() => { fadeIn(); setPlaying(true) })
      .catch(() => { /* autoplay still blocked — user must press button */ })
  }

  // Button click: if audio hasn't started yet, start it;
  // otherwise toggle play/pause
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
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
    // Listen for the first interaction anywhere on the page
    // but NOT on the audio button itself (it handles its own logic)
    const onFirstInteraction = (e: Event) => {
      const target = e.target as Element
      if (target.closest('#audioBtn')) return
      startAudio()
    }

    const events = ['click', 'touchstart', 'keydown'] as const
    events.forEach(ev => document.addEventListener(ev, onFirstInteraction as EventListener, { once: true, passive: true }))

    return () => {
      events.forEach(ev => document.removeEventListener(ev, onFirstInteraction as EventListener))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Separate touch handler for mobile to avoid passive listener conflicts
  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    const audio = audioRef.current
    if (!audio) return

    if (!startedRef.current) {
      startedRef.current = true
      audio.volume = 0
      audio.play()
        .then(() => { fadeIn(); setPlaying(true) })
        .catch(() => {})
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

  return (
    <>
      <audio ref={audioRef} loop preload="auto" src={src} />

      <button
        id="audioBtn"
        aria-label={playing ? 'Pausar música ambiente' : 'Reproduzir música ambiente'}
        onClick={handleButtonClick}
        onTouchEnd={handleTouchEnd}
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
          background: rgba(10,3,5,0.72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(201,169,110,0.28);
          padding: 10px 18px 10px 14px;
          cursor: pointer;
          transition: border-color 0.35s, background 0.35s, transform 0.35s;
          animation: fadeUp 0.8s ease 1.5s both;
        }
        #audioBtn:hover {
          border-color: rgba(201,169,110,0.6);
          background: rgba(20,5,10,0.88);
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
