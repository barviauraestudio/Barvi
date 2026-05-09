import { useEffect } from 'react'

export function useBlurSiblings(gridSelector: string, cardSelector: string) {
  useEffect(() => {
    const isTouch = !window.matchMedia('(pointer: fine)').matches
    const grids = document.querySelectorAll<HTMLElement>(gridSelector)

    grids.forEach(grid => {
      const cards = Array.from(grid.querySelectorAll<HTMLElement>(cardSelector))

      function focusCard(target: HTMLElement) {
        cards.forEach(card => {
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
          card.style.filter = ''
          card.style.opacity = ''
          card.style.transform = ''
        })
      }

      if (isTouch) {
        // Mobile: ativa pelo scroll (IntersectionObserver), sem toque
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.intersectionRatio >= 0.6) {
                focusCard(entry.target as HTMLElement)
              }
            })
          },
          { threshold: 0.6, rootMargin: '0px 0px -10% 0px' }
        )
        cards.forEach(card => observer.observe(card))
        return () => observer.disconnect()

      } else {
        // Desktop: ativa pelo hover
        cards.forEach(card => {
          card.addEventListener('mouseenter', () => focusCard(card))
          grid.addEventListener('mouseleave', resetAll)
        })
        return () => {
          cards.forEach(card => {
            card.removeEventListener('mouseenter', () => focusCard(card))
          })
          grid.removeEventListener('mouseleave', resetAll)
        }
      }
    })
  }, [])
}
