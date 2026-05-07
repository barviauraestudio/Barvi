import { useEffect, useRef, useState } from 'react'

interface AudioPlayerProps {
  src?: string
}

export default function AudioPlayer({ src = '/SITE-AURA-AUDIO.MP3' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const fadeInRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const fadeOutRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearFade = () => {
    if (fadeInRef.current) clearInterval(fadeInRef.current)
    if (fadeOutRef.current) clearInterval(fadeOutRef.current)
  }

  const fadeIn = () => {
    clearFade()
    const audio = audioRef.current
    if (!audio) return
    let v = 0
    fadeInRef.current = setInterval(() => {
      v = Math.min(v + 0.03, 0.55)
      audio.volume = v
      if (v >= 0.55) clearInterval(fadeInRef.current!)
    }, 80)
  }

  const fadeOut = (cb?: () => void) => {
    clearFade()
    const audio = audioRef.current
    if (!audio) return
    let v = audio.volume
    fadeOutRef.current = setInterval(() => {
      v = Math.max(v - 0.05, 0)
      audio.volume = v
      if (v <= 0) {
        clearInterval(fadeOutRef.current!)
        cb?.()
      }
    }, 40)
  }

  const startAudio = () => {
    const audio = audioRef.current
    if (!audio || started) return
    setStarted(true)
    audio.muted = false
    audio.volume = 0
    audio.play().then(() => {
      fadeIn()
      setPlaying(true)
    }).catch(() => setPlaying(false))
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return
    if (!started) { startAudio(); return }
    if (!audio.paused) {
      fadeOut(() => audio.pause())
      setPlaying(false)
    } else {
      audio.volume = 0
      audio.play().catch(() => {})
      fadeIn()
      setPlaying(true)
    }
  }

  // Start on first click anywhere in the document
  useEffect(() => {
    const handler = () => startAudio()
    document.addEventListener('click', handler, { once: true })
    return () => document.removeEventListener('click', handler)
  }, [started]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={src} type="audio/mpeg" />
      </audio>

      <button
        id="audioBtn"
        aria-label={playing ? 'Pausar música ambiente' : 'Reproduzir música ambiente'}
        onClick={handleButtonClick}
        className={playing ? 'playing' : 'paused'}
      >
        <span className="audio-icon">
          <span className="bar b1" />
          <span className="bar b2" />
          <span className="bar b3" />
          <span className="bar b4" />
        </span>
        <span className="audio-label">{playing ? 'som' : 'som'}</span>
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
