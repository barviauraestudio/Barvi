import Reveal from './Reveal'
import CenterWrapper from './CenterWrapper'
import FadeContent from './FadeContent'

export default function Manifesto() {
  return (
    <section id="quem-somos" className="section">

      <CenterWrapper>
        <Reveal className="section-header">
          <FadeContent duration={800} blur>
            <p className="section-eyebrow">Quem é a Barví</p>
            <h2 className="section-title">Uma <em>obsessão</em></h2>
            <div className="section-rule" />
          </FadeContent>
        </Reveal>

        <Reveal>
          <FadeContent duration={800} delay={100} blur>
            <p className="manifesto-text">
              A Barví Aura Estúdio não nasceu de uma ideia comum de negócio.
              Nasceu de uma obsessão <em>silenciosa e quase cirúrgica</em> de entender
              por que algumas marcas atravessam o olhar das pessoas como uma cena
              inesquecível de cinema, enquanto a maioria apenas passa como
              figurante em um feed saturado.
            </p>
          </FadeContent>
        </Reveal>

        <Reveal style={{ marginTop: 48 }}>
          <FadeContent duration={800} delay={150} blur>
            <p className="manifesto-text">
              Mergulhamos em psicologia do comportamento, estética visual,
              narrativa cinematográfica e comunicação de alto impacto —
              não para montar um portfólio bonito, mas para dominar o território
              onde as decisões humanas realmente acontecem:{' '}
              <strong>a percepção.</strong>
            </p>
          </FadeContent>
        </Reveal>

        <Reveal style={{ marginTop: 48 }}>
          <FadeContent duration={800} delay={200} blur>
            <p className="manifesto-text">
              Porque é ali que o valor de uma marca <em>nasce ou morre.</em>
            </p>
          </FadeContent>
        </Reveal>


      </CenterWrapper>
    </section>
  )
}