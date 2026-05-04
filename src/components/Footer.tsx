import CenterWrapper from './CenterWrapper'

export default function Footer() {
  return (
    <footer>
      <CenterWrapper>
        <div className="footer-brand">Barví Aura Estúdio</div>
        <div className="footer-info">
          <p>Urubici, Serra Catarinense · SC</p>
          <p style={{ marginTop: 4, color: 'var(--golddm)' }}>Barví Aura Estúdio · Arthur Bernardo, CEO · Maria Helena, COO</p>
        </div>
      </CenterWrapper>
    </footer>
  )
}
