import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import CenterWrapper from './CenterWrapper'
import Reveal from './Reveal'

const TESTIMONIALS = [
  {
    id: 1,
    quote: 'Fora o alto nível de gravação e edição áudio visual, muito criativo, proativo, educado e o principal, responsabilidade com os prazos. Entrega de qualidade. Recomendo sem medo de errar.',
    author: 'Dr. Bernardo Passoni',
    role: 'Cirurgião Dentista',
    initials: 'BP',
    photo: '/foto-bernardo.jpg',
    rating: 5
  },
  {
    id: 2,
    quote: 'Arthur foi dedicado, criativo e muito prático. Tornou minha experiência com o marketing mais leve e confiante. Indico demais!',
    author: 'Vitória Lazzaris',
    role: 'Psicóloga',
    initials: 'VL',
    photo: '/foto-vitoria.jpg',
    rating: 5
  },
  {
    id: 3,
    quote: 'A Barví foi de grande importância no nosso negócio, desmistificando algumas ideias que tínhamos quanto a publicidade, vídeos e mídias sociais. Foi o começo de um caminho sem volta.',
    author: 'Buss & Siementcoski',
    role: 'Advogados',
    initials: 'BS',
    photo: '/foto-buss.jpg',
    rating: 5
  },
  {
    id: 4,
    quote: 'Dá pra ver nitidamente a evolução do perfil nos últimos meses: a comunicação, a identidade visual e as mensagens estão cada vez mais alinhadas com o que eu acredito e quero transmitir.',
    author: 'Monan',
    role: 'Coach Fitness',
    initials: 'MN',
    photo: '/foto-monan.jpg',
    rating: 5
  },
  {
    id: 5,
    quote: 'Os vídeos profissionais não apenas capturam a essência da nossa marca, mas também têm elevado significativamente a qualidade do nosso perfil no Instagram. A atenção cuidadosa aos detalhes é verdadeiramente admirável.',
    author: 'Rei Cell',
    role: 'Tecnologia',
    initials: 'RC',
    photo: '/foto-rei.jpg',
    rating: 5
  },
  {
    id: 6,
    quote: 'O Arthur foi peça fundamental nos primeiros passos da comunicação da nossa clínica. Além de enxergar nossos pontos fortes e conseguir transmitir isso nos materiais gerados, ele compreendeu a essência do negócio, gerando conteúdos muito mais profundos e relevantes.',
    author: 'Savini',
    role: 'Clínica de Saúde',
    initials: 'SV',
    photo: '/foto-savini.jpg',
    rating: 5
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  // Auto rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIALS.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} id="depoimentos" className="section" style={{ minHeight: 'auto', paddingTop: '120px', paddingBottom: '120px', overflow: 'hidden' }}>
      <CenterWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Side: Text and Nav */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="section-eyebrow" style={{ marginBottom: '12px' }}>Testemunhos</p>
              <h2 className="section-title" style={{ marginBottom: '24px', textAlign: 'left' }}>
                O que dizem sobre<br />nossa <em>atmosfera</em>
              </h2>
              <div className="section-rule" style={{ marginLeft: 0, marginBottom: '32px' }} />

              <p className="hero-tagline" style={{ textAlign: 'left', maxWidth: '480px', fontSize: '16px', opacity: 0.8, marginBottom: '40px' }}>
                Não entregamos apenas arquivos. Entregamos autoridade, intenção e resultados que reverberam.
              </p>

              <div className="flex items-center gap-4">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      height: '4px',
                      borderRadius: '2px',
                      transition: 'all 0.4s ease',
                      width: activeIndex === index ? '40px' : '12px',
                      background: activeIndex === index ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    aria-label={`Ver depoimento ${index + 1}`}
                  />
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Side: Animated Card */}
          <div className="relative h-[450px] md:h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -50, scale: 0.95, filter: 'blur(10px)' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <div style={{
                  height: '100%',
                  background: 'rgba(10, 3, 5, 0.5)',
                  backdropFilter: 'blur(32px)',
                  border: '1px solid rgba(201, 169, 110, 0.15)',
                  borderRadius: '24px',
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05)'
                }}>
                  <div className="flex gap-1 mb-8">
                    {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                      <Star key={i} size={16} fill="var(--gold)" stroke="var(--gold)" />
                    ))}
                  </div>

                  <div className="flex-1 relative">
                    <Quote className="absolute -top-6 -left-4 opacity-10" size={64} style={{ color: 'var(--gold)' }} />
                    <p style={{
                      fontSize: '18px',
                      lineHeight: '1.6',
                      color: '#E8D5B0',
                      fontFamily: 'var(--FB)',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      "{TESTIMONIALS[activeIndex].quote}"
                    </p>
                  </div>

                  <Separator style={{ margin: '32px 0', background: 'rgba(201, 169, 110, 0.1)' }} />

                  <div className="flex items-center gap-4">
                    <Avatar style={{ height: '56px', width: '56px', border: '2px solid rgba(201, 169, 110, 0.2)' }}>
                      <AvatarImage src={TESTIMONIALS[activeIndex].photo} alt={TESTIMONIALS[activeIndex].author} />
                      <AvatarFallback style={{ background: 'var(--crimson)', color: 'white' }}>
                        {TESTIMONIALS[activeIndex].initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--gold)' }}>{TESTIMONIALS[activeIndex].author}</h3>
                      <p style={{ fontSize: '14px', color: 'rgba(184, 175, 166, 0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {TESTIMONIALS[activeIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Decorative Orbs behind card */}
            <div style={{
              position: 'absolute',
              top: '10%',
              right: '-10%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(139,0,0,0.15) 0%, transparent 70%)',
              zIndex: -1,
              filter: 'blur(40px)'
            }} />
          </div>

        </div>
      </CenterWrapper>
    </section>
  )
}
