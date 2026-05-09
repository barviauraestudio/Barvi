import { useEffect } from 'react'

export function useBlurSiblings(gridSelector: string, cardSelector: string) {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return // sai se for mobile/touch

    const grids = document.querySelectorAll<HTMLElement>(gridSelector)

    grids.forEach(grid => {
      const cards = Array.from(grid.querySelectorAll<HTMLElement>(cardSelector))

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.intersectionRatio > 0.6) {
              cards.forEach(card => {
                if (card === entry.target) {
                  card.style.filter = 'blur(0px)'
                  card.style.transform = 'scale(1.03)'
                } else {
                  card.style.filter = 'blur(2px)'
                  card.style.transform = 'scale(0.95)'
                }
              })
            }
          })
        },
        { threshold: 0.6, rootMargin: '0px 0px -10% 0px' }
      )

      cards.forEach(card => observer.observe(card))
    })
  }, [])
}
