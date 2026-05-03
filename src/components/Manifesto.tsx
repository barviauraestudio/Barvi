import Reveal from './Reveal'
import CenterWrapper from './CenterWrapper'

export default function Manifesto() {
  return (
    <section id="quem-somos" className="section">
      <CenterWrapper>
        <Reveal className="section-header">
          <p className="section-eyebrow">Quem é a Barví</p>
          <h2 className="section-title">Uma <em>obsessão</em></h2>
          <div className="section-rule" />
        </Reveal>

        <Reveal>
          <p className="manifesto-text">
            A Barví Aura Estúdio não nasceu de uma ideia comum de negócio.
            Nasceu de uma obsessão <em>silenciosa e quase cirúrgica</em> de entender
            por que algumas marcas atravessam o olhar das pessoas como uma cena
            inesquecível de cinema, enquanto a maioria apenas passa como
            figurante em um feed saturado.
          </p>
        </Reveal>

        <Reveal style={{ marginTop: 48 }}>
          <p className="manifesto-text">
            Mergulhamos em psicologia do comportamento, estética visual,
            narrativa cinematográfica e comunicação de alto impacto —
            não para montar um portfólio bonito, mas para dominar o território
            onde as decisões humanas realmente acontecem:{' '}
            <strong>a percepção.</strong>
          </p>
        </Reveal>

        <Reveal style={{ marginTop: 48 }}>
          <p className="manifesto-text">
            Porque é ali que o valor de uma marca <em>nasce ou morre.</em>
          </p>
        </Reveal>

        <Reveal style={{ marginTop: 60 }}>
          <div className="manifesto-tagline">
            <span className="manifesto-pill">Não somos agência</span>
            <span className="manifesto-pill">Somos atmosfera</span>
            <span className="manifesto-pill">Posicionamento estratégico</span>
            <span className="manifesto-pill">Direção criativa</span>
          </div>
        </Reveal>
      </CenterWrapper>
    </section>
  )
}
