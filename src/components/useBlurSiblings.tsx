import { useEffect } from 'react'

export function useBlurSiblings(gridSelector: string, cardSelector: string) {
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (!isTouch) return // desktop usa CSS :has(), só roda no mobile

    const grids = document.querySelectorAll<HTMLElement>(gridSelector)

    grids.forEach(grid => {
      const cards = Array.from(grid.querySelectorAll<HTMLElement>(cardSelector))

      cards.forEach(card => {
        card.addEventListener('touchstart', () => {
          cards.forEach(c => {
            if (c === card) {
              c.style.filter = 'blur(0px)'
              c.style.transform = 'scale(1.03)'
            } else {
              c.style.filter = 'blur(2px)'
              c.style.transform = 'scale(0.95)'
            }
          })
        }, { passive: true })
      })

      // toca fora = reseta tudo
      document.addEventListener('touchstart', (e) => {
        const touched = e.target as Element
        if (!touched.closest(cardSelector)) {
          cards.forEach(c => {
            c.style.filter = ''
            c.style.transform = ''
          })
        }
      }, { passive: true })
    })
  }, [])
}
