import CenterWrapper from './CenterWrapper'

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export default function CTA() {
  return (
    <section id="cta">
      <div className="cta-glow" />
      <CenterWrapper>
        <div className="cta-content">
          <p className="cta-eyebrow">Próximos Passos</p>
          <h2 className="cta-title">
            Você chegou até aqui<br />porque já sabe que<br /><em>algo precisa mudar.</em>
          </h2>
          <p className="cta-sub">
            Uma conversa. Sem compromisso.<br />Com a clareza de quem sabe exatamente o que está fazendo.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href="https://wa.me/5548996534721?text=Ol%C3%A1%2C%20Arthur!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20conversa."
                className="btn-primary"
              >
                Arthur — Agendar Conversa
                <ArrowIcon />
              </a>
              <a
                href="https://wa.me/5548988779117?text=Ol%C3%A1%2C%20Maria%20Helena!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20conversa."
                className="btn-primary"
              >
                Maria Helena — Agendar Conversa
                <ArrowIcon />
              </a>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href="https://consultoria-tawny-zeta.vercel.app"
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Conheça Nossa Consultoria
                <ArrowIcon />
              </a>
              <a
                href="https://planos-roan.vercel.app"
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Conheça Nossos Planos
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </CenterWrapper>
    </section>
  )
}
