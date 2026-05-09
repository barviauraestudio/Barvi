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
            card.style.transition = 'filter 0.4s ease, opacity 0.4s ease, transform 0.4s ease'
            card.style.filter = 'blur(0px)'
            card.style.opacity = '1'
            card.style.transform = 'scale(1.03)'
          } else {
            card.style.transition = 'filter 0.4s ease, opacity 0.4s ease, transform 0.4s ease'
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
        // Guarda a ratio de interseção de cada card em tempo real
        const ratios = new Map<HTMLElement, number>()

        const observer = new IntersectionObserver(
          (entries) => {
            // Atualiza o mapa com a ratio atual de cada card que mudou
            entries.forEach(entry => {
              ratios.set(entry.target as HTMLElement, entry.intersectionRatio)
            })

            // Encontra o card mais visível no momento
            let bestCard: HTMLElement | null = null
            let bestRatio = 0
            ratios.forEach((ratio, card) => {
              if (ratio > bestRatio) {
                bestRatio = ratio
                bestCard = card
              }
            })

            if (bestCard && bestRatio >= 0.4) {
              focusCard(bestCard)
            } else {
              resetAll()
            }
          },
          {
            threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
            rootMargin: '0px 0px -5% 0px'
          }
        )

        cards.forEach(card => {
          ratios.set(card, 0)
          observer.observe(card)
        })

        return () => observer.disconnect()

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
