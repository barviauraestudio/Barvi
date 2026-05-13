import Reveal from './Reveal'
import CenterWrapper from './CenterWrapper'
import BorderGlow from './BorderGlow'

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
  // Duplicamos a lista para criar o efeito de loop infinito
  const doubledPartners = [...ALL_PARTNERS, ...ALL_PARTNERS]

  return (
    <section
      id="parceiros"
      className="section"
      style={{
        padding: '60px 0',
        minHeight: 'auto',
        overflow: 'hidden',
        border: 'none',
        borderBottom: 'none',
        background: 'transparent'
      }}
    >
      <CenterWrapper>
        <Reveal className="section-header" style={{ marginBottom: 30, textAlign: 'center' }}>
          <p className="section-eyebrow">PRODUÇÕES E PARCEIROS</p>
          <h2 className="section-title" style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            lineHeight: 1.1,
            marginBottom: 12
          }}>
            Marcas que <em style={{ color: 'var(--gold)' }}>acreditaram</em>
          </h2>
        </Reveal>
      </CenterWrapper>

      <div className="partners-marquee-container">
        <div className="partners-marquee-track">
          {doubledPartners.map((item, index) => {
            const [name, category] = item.includes(' — ') ? item.split(' — ') : [item, 'Produção'];
            return (
              <div key={index} className="partner-card-wrapper">
                <BorderGlow
                  className="partner-card"
                  backgroundColor="rgba(8,2,5,0.6)"
                  borderRadius={12}
                  glowColor="36 65 65"
                  colors={['#C9A96E', '#8B0000', '#A8883A']}
                  glowIntensity={0.6}
                  glowRadius={24}
                  edgeSensitivity={32}
                  coneSpread={22}
                  fillOpacity={0.12}
                >
                  <div className="partner-card-content">
                    <p className="partner-label">BARVÍ PARCEIRO</p>
                    <h3 className="partner-title"><em>{name}</em></h3>
                    <p className="partner-desc">{category}</p>
                  </div>
                </BorderGlow>
              </div>
            )
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .partners-marquee-container {
            width: 100%;
            overflow: hidden;
            padding: 20px 0;
            position: relative;
            border: none !important;
            border-bottom: 0 !important;
            border-top: 0 !important;
            outline: none !important;
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          }

          .partners-marquee-track {
            display: flex;
            gap: 16px;
            width: max-content;
            animation: marquee 50s linear infinite;
          }

          .partner-card-wrapper {
            flex-shrink: 0;
            width: 240px;
          }

          .partner-card {
            width: 100%;
            height: 100%;
            border: 1px solid var(--glass-border) !important;
            box-shadow: none !important;
          }

          .partner-card-content {
            padding: 20px 18px;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            text-align: left;
          }

          .partner-label {
            font-size: 7px;
            letter-spacing: 0.4em;
            text-transform: uppercase;
            color: var(--golddm);
            margin-bottom: 6px;
          }

          .partner-title {
            font-family: var(--FD);
            font-size: 18px;
            color: var(--gold);
            line-height: 1.1;
            margin: 0;
            font-weight: 300;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .partner-desc {
            font-size: 11px;
            color: var(--muted);
            line-height: 1.4;
            margin-top: 6px;
            opacity: 0.6;
          }

          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          /* Pausa no hover */
          .partners-marquee-container:hover .partners-marquee-track {
            animation-play-state: paused;
          }

          /* Mobile adjustments */
          @media (max-width: 640px) {
            .partner-card-wrapper {
              width: 190px;
            }
            .partner-title {
              font-size: 15px;
            }
            .partners-marquee-track {
              animation-duration: 35s;
            }
            .section {
              padding: 40px 0 !important;
            }
          }

          /* Efeito de Blur Siblings (Foco no Hover) */
          .partners-marquee-track {
            transition: gap 0.3s ease;
          }

          .partners-marquee-track:hover .partner-card-wrapper {
            filter: blur(2px);
            transform: scale(0.95);
          }

          .partners-marquee-track .partner-card-wrapper:hover {
            filter: blur(0px) !important;
            transform: scale(1.05) !important;
            z-index: 10;
          }

          /* Suavizar a transição dos cards */
          .partner-card-wrapper {
            transition: transform 0.4s cubic-bezier(0.2, 0, 0.2, 1), 
                        filter 0.4s ease, 
                        opacity 0.4s ease;
          }
        `
      }} />
    </section>
  )
}
