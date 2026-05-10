import Reveal from './Reveal'
import CenterWrapper from './CenterWrapper'

const ALL_PARTNERS = [
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
  'Buss & Siementcoski',
  'Rei Cell',
  'Pousada Vale da Ímbuia',
  'Lalaio',
]

export default function Partners() {
  return (
    <section 
      id="parceiros" 
      className="section"
      style={{ 
        padding: '100px 0 120px',
        background: 'var(--dark-bg)', 
      }}
    >
      <CenterWrapper>
        <Reveal className="section-header" style={{ marginBottom: 48 }}>
          <p className="section-eyebrow">PRODUÇÕES E PARCEIROS</p>
          <h2 className="section-title" style={{ 
            fontSize: 'clamp(32px, 5.5vw, 52px)', 
            lineHeight: 1.1,
            marginBottom: 16 
          }}>
            Marcas que <em style={{ color: 'var(--gold)' }}>acreditaram</em>
          </h2>
        </Reveal>

        <Reveal style={{ marginBottom: 60 }}>
          <p className="partners-intro" style={{
            fontSize: 'clamp(15px, 1.8vw, 17.5px)',
            maxWidth: '680px',
            lineHeight: 1.75,
            color: 'var(--muted)',
            textAlign: 'center',
            margin: '0 auto'
          }}>
            Ao longo da trajetória, desenvolvemos produções criativas e estratégicas 
            ao lado de parceiros que acreditam no poder da comunicação bem-feita.
          </p>
        </Reveal>

        {/* Grid Responsivo */}
        <Reveal>
          <div className="partners-grid">
            {ALL_PARTNERS.map((name, index) => (
              <div key={index} className="partner-item">
                <p className="partner-name">{name}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </CenterWrapper>

      <style jsx>{`
        .partners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 18px 40px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .partner-item {
          padding: 10px 0;
          border-bottom: 1px solid rgba(201, 169, 110, 0.08);
          transition: all 0.3s ease;
        }

        .partner-item:hover {
          transform: translateX(8px);
          border-bottom-color: rgba(201, 169, 110, 0.25);
        }

        .partner-name {
          font-family: var(--FD);
          font-size: clamp(15px, 1.65vw, 17px);
          font-weight: 300;
          letter-spacing: 0.02em;
          color: var(--white);
          margin: 0;
          transition: color 0.3s ease;
        }

        .partner-item:hover .partner-name {
          color: var(--gold);
        }

        /* Mobile adjustments */
        @media (max-width: 640px) {
          .partners-grid {
            grid-template-columns: 1fr;
            gap: 14px 0;
          }
          
          .partner-item {
            padding: 8px 0;
            border-bottom: 1px solid rgba(201, 169, 110, 0.06);
          }
        }
      `}</style>
    </section>
  )
}
