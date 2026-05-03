import Reveal from './Reveal'
import CenterWrapper from './CenterWrapper'

const PAST_PARTNERS = [
  'Sarah Thiesen',
  'Monan — Coach Fitness',
  'Serra — Mat. de Construção',
  'Savini — Saúde e Bem-Estar',
  'Villa Del Capo',
  'Cavalos & Montanhas',
  'Dr. Bernardo — Cirurgião',
  'Fruta Fina Orgânicos',
  'Qu4d Experience',
  'Dr. Thiago Piva — Clínico',
  'Calmaria Centro de Saúde',
  'Parque Mundo Novo',
]

const CURRENT_PARTNERS = [
  'Buss & Siementcoski',
  'Rei Cell',
  'Pousada Vale da Ímbuia',
  'Lalaio',
]

export default function Partners() {
  return (
    <section id="parceiros" className="section" style={{ minHeight: 'auto', paddingTop: 0 }}>
      <CenterWrapper>
        <Reveal className="section-header" style={{ marginBottom: 40 }}>
          <p className="section-eyebrow">Produções e Parceiros</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(30px,4vw,50px)' }}>
            Marcas que <em>acreditaram</em>
          </h2>
        </Reveal>

        <Reveal>
          <p className="partners-intro">
            Ao longo da trajetória, desenvolvemos produções criativas e estratégicas ao lado de parceiros que acreditam no poder da comunicação bem-feita.
          </p>
        </Reveal>

        <Reveal className="partners-cols">
          <div>
            <p className="partners-col-label">Marcas com quem já colaboramos</p>
            <div className="partners-past">
              {PAST_PARTNERS.map((name) => (
                <p className="partner-name" key={name}>{name}</p>
              ))}
            </div>
          </div>
          <div className="partners-current">
            <p className="partners-col-label">Colaboramos atualmente</p>
            {CURRENT_PARTNERS.map((name) => (
              <p className="partner-name" key={name}>{name}</p>
            ))}
          </div>
        </Reveal>
      </CenterWrapper>
    </section>
  )
}