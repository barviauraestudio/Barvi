import Reveal from './Reveal'
import CenterWrapper from './CenterWrapper'

const STATES = [
  {
    label: 'Estado Emocional',
    title: 'Confiança',
    desc: 'Narrativas que transmitem consistência e autoridade antes da primeira palavra.',
  },
  {
    label: 'Estado Emocional',
    title: 'Desejo',
    desc: 'Estética projetada para ativar o sistema límbico — onde decisões são tomadas.',
  },
  {
    label: 'Estado Emocional',
    title: 'Identificação',
    desc: 'O público se enxerga na marca. Não compram o produto — compram a identidade.',
  },
  {
    label: 'Estado Emocional',
    title: 'Urgência',
    desc: 'Comunicação que cria movimento. Não empurra, magnetiza.',
  },
]

export default function Psychology() {
  return (
    <section id="psicologia" className="section">
      <CenterWrapper>
        <Reveal className="section-header">
          <p className="section-eyebrow">Psicologia & Comunicação</p>
          <h2 className="section-title">Neurociência <em>aplicada</em></h2>
          <div className="section-rule" />
        </Reveal>

        <div className="psych-layout">
          <Reveal>
            <p className="psych-lead">
              Toda decisão humana começa no <em>sistema límbico.</em>
            </p>
            <p className="psych-body">
              A parte do cérebro que processa emoção, memória e pertencimento, antes de passar pelo racional que tenta justificar o que já foi decidido.
            </p>
            <p className="psych-body">
              Sabendo disso, cada palavra que escrevemos, cada frame que direcionamos, cada detalhe estético que escolhemos é projetado para ativar estados emocionais específicos no seu público.
            </p>
            <p className="psych-body" style={{ fontStyle: 'italic', color: 'var(--goldlt)', fontSize: 17 }}>
              "Não fazemos comunicação por intuição. Fazemos comunicação por neurociência aplicada — com a elegância de quem entende que o maior poder não é gritar mais alto, é sussurrar na frequência certa."
            </p>
          </Reveal>

          <Reveal delay={2}>
            <div className="psych-states">
              {STATES.map((s, i) => (
                <div className="psych-state" key={i}>
                  <p className="psych-state-label">{s.label}</p>
                  <p className="psych-state-title">{s.title}</p>
                  <p className="psych-state-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="psych-layout" style={{ marginTop: 80 }}>
          <Reveal>
            <p className="section-eyebrow" style={{ marginBottom: 28 }}>Nossa Diferença</p>
            <p className="psych-lead">
              Autoridade não se declara.<br /><em>Se constrói detalhe por detalhe, intenção por intenção.</em>
            </p>
            <p className="psych-body">
              Enquanto o mercado produz em volume, nós produzimos em profundidade. Enquanto outros entregam postagens, nós entregamos posicionamento psicológico. Enquanto a maioria fala de métricas, nós falamos de percepção de valor.
            </p>
            <p className="psych-body">
              O nosso diferencial não está na ferramenta. Está na visão. Na capacidade de olhar para uma marca e enxergar não o que ela é hoje, mas o que ela pode se tornar quando cada ponto de contato com o público é pensado com intenção estratégica, profundidade estética e inteligência narrativa.
            </p>
            <p className="psych-body" style={{ fontStyle: 'italic', color: 'var(--goldlt)', fontSize: 15, marginTop: 4 }}>
              Isso não se compra em pacotes. Isso se constrói em parceria.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <div className="autoridade-pillars">
              {[
                { num: '01', title: 'Posicionamento', sub: 'Estratégico' },
                { num: '02', title: 'Direção', sub: 'Criativa' },
                { num: '03', title: 'Inteligência', sub: 'Narrativa' },
              ].map((item) => (
                <div className="autoridade-item" key={item.num}>
                  <span className="autoridade-num">{item.num}</span>
                  <div className="autoridade-text">
                    <p className="autoridade-title">{item.title}</p>
                    <p className="autoridade-sub">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </CenterWrapper>
    </section>
  )
}