import Reveal from './Reveal'
import CenterWrapper from './CenterWrapper'

const PILLARS = [
  {
    num: '01',
    title: 'Percepção',
    subtitle: 'Não o que você faz',
    desc: 'A maioria das agências trabalha com visibilidade. Nós trabalhamos com percepção. Existe uma diferença brutal entre uma marca que é vista e uma que é desejada. Entre um perfil com seguidores e uma presença que magnetiza.',
    kicker: 'Não ocupamos o feed. Ocupamos o imaginário.',
  },
  {
    num: '02',
    title: 'Atmosfera',
    subtitle: 'Não campanhas isoladas',
    desc: 'Nós criamos atmosferas. Ambientes de percepção onde cada imagem, cada enquadramento, cada silêncio e cada palavra trabalham juntos como em um filme bem dirigido, moldando a forma como o público percebe, sente e se conecta com você.',
    kicker: 'Comunicação superficial gera lembrança fraca. Atmosfera gera presença.',
  },
  {
    num: '03',
    title: 'Aura',
    subtitle: 'Não visibilidade — inevitabilidade',
    desc: 'Cada cliente que entra aqui passa por uma construção real de identidade, posicionamento e percepção. O objetivo nunca foi apenas comunicar algo ao público. O objetivo é construir aura. E quando uma marca possui aura, ela domina o espaço como um protagonista inevitável em cena.',
    kicker: 'Sua marca deixa de competir por atenção e passa a ser inevitável.',
  },
]

export default function Pillars() {
  return (
    <section id="pilares" className="section">
      <CenterWrapper>
        <Reveal className="section-header">
          <p className="section-eyebrow">Nossa Filosofia</p>
          <h2 className="section-title">Os três <em>pilares</em></h2>
          <div className="section-rule" />
        </Reveal>
        <Reveal className="pillars-grid">
          {PILLARS.map((p, i) => (
            <Reveal key={p.num} delay={(i + 1) as 1 | 2 | 3} className="pillar-card">
              <span className="pillar-num">{p.num}</span>
              <p className="pillar-title"><em>{p.title}</em></p>
              <p style={{ fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--golddm)', marginBottom: 18 }}>{p.subtitle}</p>
              <p className="pillar-desc">{p.desc}</p>
              <p className="pillar-kicker">{p.kicker}</p>
            </Reveal>
          ))}
        </Reveal>
      </CenterWrapper>
    </section>
  )
}
