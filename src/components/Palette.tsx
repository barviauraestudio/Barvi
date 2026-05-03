import Reveal from './Reveal'
import CenterWrapper from './CenterWrapper'

const COLORS = [
  { name: 'Preto Profundo', hex: '#0A0A0A', meaning: 'Sofisticação e poder' },
  { name: 'Cinza Aço', hex: '#6B7280', meaning: 'Solidez e equilíbrio' },
  { name: 'Cinza Profundo', hex: '#374151', meaning: 'Sobriedade e modernidade' },
  { name: 'Branco Neutro', hex: '#F9FAFB', meaning: 'Espaço e clareza' },
  { name: 'Terracota', hex: '#C2714F', meaning: 'Humano e inesperado' },
  { name: 'Marrom Terra', hex: '#7C5C3E', meaning: 'Força e confiança' },
  { name: 'Dourado Sutil', hex: '#C9A96E', meaning: 'Prestígio e excelência' },
]

export default function Palette() {
  return (
    <section id="paleta" className="section" style={{ minHeight: 'auto', paddingTop: 0 }}>
      <CenterWrapper>
        <Reveal className="section-header" style={{ marginBottom: 40 }}>
          <p className="section-eyebrow">Identidade Visual</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(30px,4vw,50px)' }}>
            Paleta de <em>Cores</em>
          </h2>
        </Reveal>

        <Reveal>
          <p className="colors-intro">
            Personalizada para cada cliente, sempre guiada pela lógica da clareza e da autoridade. Cada cor é escolhida com intenção psicológica — para ativar estados emocionais específicos no público da marca.
          </p>
        </Reveal>

        <Reveal className="colors-grid">
          {COLORS.map((c, i) => (
            <Reveal key={c.hex} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4} className="color-swatch">
              <div
                className="swatch-block"
                style={{ background: c.hex }}
              />
              <p className="swatch-name">{c.name}</p>
              <p className="swatch-meaning">{c.meaning}</p>
            </Reveal>
          ))}
        </Reveal>
      </CenterWrapper>
    </section>
  )
}
