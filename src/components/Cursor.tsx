import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pos = { mx: -100, my: -100, rx: -100, ry: -100 }
    let rafId: number
    let started = false

    function animate() {
      pos.rx += (pos.mx - pos.rx) * 0.12
      pos.ry += (pos.my - pos.ry) * 0.12
      if (cursorRef.current) {
        cursorRef.current.style.left = pos.mx + 'px'
        cursorRef.current.style.top = pos.my + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = pos.rx + 'px'
        ringRef.current.style.top = pos.ry + 'px'
      }
      rafId = requestAnimationFrame(animate)
    }

    function onMouseMove(e: MouseEvent) {
      pos.mx = e.clientX
      pos.my = e.clientY
      if (!started) {
        started = true
        animate()
      }
    }

    function onMouseOver(e: MouseEvent) {
      if ((e.target as Element).closest('a, button, .pillar-card, .testimonial-card, .psych-state, .partner-name')) {
        document.body.classList.add('hovering')
      }
    }

    function onMouseOut(e: MouseEvent) {
      if ((e.target as Element).closest('a, button, .pillar-card, .testimonial-card, .psych-state, .partner-name')) {
        document.body.classList.remove('hovering')
      }
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}
