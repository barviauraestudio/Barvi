import Reveal from './Reveal'
import CenterWrapper from './CenterWrapper'

const TESTIMONIALS = [
  {
    quote: 'Fora o alto nível de gravação e edição áudio visual, muito criativo, proativo, educado e o principal, responsabilidade com os prazos. Entrega de qualidade. Recomendo sem medo de errar.',
    author: 'Dr. Bernardo Passoni',
    initials: 'BP',
    photo: '/foto-bernardo.jpg',
  },
  {
    quote: 'Arthur foi dedicado, criativo e muito prático. Tornou minha experiência com o marketing mais leve e confiante. Indico demais!',
    author: 'Vitória Lazzaris',
    initials: 'VL',
  },
  {
    quote: 'A Barví foi de grande importância no nosso negócio, desmistificando algumas ideias que tínhamos quanto a publicidade, vídeos e mídias sociais. Foi o começo de um caminho sem volta.',
    author: 'Buss & Siementcoski Advogados',
    initials: 'BS',
  },
  {
    quote: 'Dá pra ver nitidamente a evolução do perfil nos últimos meses: a comunicação, a identidade visual e as mensagens estão cada vez mais alinhadas com o que eu acredito e quero transmitir.',
    author: 'Monan — Coach Fitness',
    initials: 'MN',
  },
  {
    quote: 'Os vídeos profissionais não apenas capturam a essência da nossa marca, mas também têm elevado significativamente a qualidade do nosso perfil no Instagram. A atenção cuidadosa aos detalhes é verdadeiramente admirável.',
    author: 'Rei Cell',
    initials: 'RC',
  },
  {
    quote: 'Além de enxergar nossos pontos fortes e conseguir transmitir isso nos materiais gerados, ele compreendeu a essência do negócio, gerando conteúdos muito mais profundos e relevantes.',
    author: 'Calmaria Centro de Saúde',
    initials: 'CC',
  },
  {
    quote: 'O Arthur foi peça fundamental nos primeiros passos da comunicação da nossa clínica. Além de enxergar nossos pontos fortes e conseguir transmitir isso nos materiais gerados, ele compreendeu a essência do negócio, gerando conteúdos muito mais profundos e relevantes. Isso fez toda diferença nos resultados que obtivemos a partir da parceria com ele.',
    author: 'Savini | Clínica de Saúde e Bem-Estar',
    initials: 'SV',
  },
]

export default function Testimonials() {
  return (
    <section id="depoimentos" className="section" style={{ minHeight: 'auto', paddingTop: 0 }}>
      <CenterWrapper>
        <Reveal className="section-header" style={{ marginBottom: 40 }}>
          <p className="section-eyebrow">O que nossos clientes dizem</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(30px,4vw,50px)' }}>
            Vozes que <em>comprovam</em>
          </h2>
        </Reveal>

        <Reveal className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={(Math.min(i % 3 + 1, 4)) as 1 | 2 | 3 | 4} className="testimonial-card">
              <p className="testimonial-quote">
                <span className="testimonial-openquote">"</span>
                {t.quote}
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar">
                  <span className="testimonial-avatar-initials">{t.initials}</span>
                </div>
                <p className="testimonial-author">{t.author}</p>
              </div>
            </Reveal>
          ))}
        </Reveal>
      </CenterWrapper>
    </section>
  )
}
