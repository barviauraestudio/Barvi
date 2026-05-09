import { useEffect } from 'react'

export function useBlurSiblings(gridSelector: string, cardSelector: string) {
  useEffect(() => {
    const isTouch = !window.matchMedia('(pointer: fine)').matches
    const grids = document.querySelectorAll<HTMLElement>(gridSelector)

    grids.forEach(grid => {
      const cards = Array.from(grid.querySelectorAll<HTMLElement>(cardSelector))

      function focusCard(target: HTMLElement) {
        cards.forEach(card => {
          card.style.transition = 'filter 0.4s ease, opacity 0.4s ease, transform 0.4s ease'
          if (card === target) {
            card.style.filter = 'blur(0px)'
            card.style.opacity = '1'
            card.style.transform = 'scale(1.03)'
          } else {
            card.style.filter = 'blur(2px)'
            card.style.opacity = '0.5'
            card.style.transform = 'scale(0.95)'
          }
        })
      }

      function resetAll() {
        cards.forEach(card => {
          card.style.transition = 'filter 0.4s ease, opacity 0.4s ease, transform 0.4s ease'
          card.style.filter = ''
          card.style.opacity = ''
          card.style.transform = ''
        })
      }

      if (isTouch) {
        // Mobile: toque no card destaca ele, toque fora reseta
        const handlers = new Map<HTMLElement, () => void>()

        cards.forEach(card => {
          const handler = () => focusCard(card)
          handlers.set(card, handler)
          card.addEventListener('touchstart', handler, { passive: true })
        })

        // Toque fora de qualquer card reseta tudo
        const onOutsideTouch = (e: TouchEvent) => {
          const touched = e.target as Element
          if (!touched.closest(cardSelector)) resetAll()
        }
        document.addEventListener('touchstart', onOutsideTouch, { passive: true })

        return () => {
          cards.forEach(card => {
            const handler = handlers.get(card)
            if (handler) card.removeEventListener('touchstart', handler)
          })
          document.removeEventListener('touchstart', onOutsideTouch)
        }

      } else {
        // Desktop: hover
        const onEnter = (card: HTMLElement) => () => focusCard(card)
        const onLeave = () => resetAll()

        cards.forEach(card => card.addEventListener('mouseenter', onEnter(card)))
        grid.addEventListener('mouseleave', onLeave)

        return () => {
          cards.forEach(card => card.removeEventListener('mouseenter', onEnter(card)))
          grid.removeEventListener('mouseleave', onLeave)
        }
      }
    })
  }, [])
}
