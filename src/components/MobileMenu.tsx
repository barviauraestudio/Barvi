type Props = {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: Props) {
  return (
    <div className={`mobile-menu${open ? ' open' : ''}`}>
      <a href="#quem-somos" onClick={onClose}>Quem Somos</a>
      <a href="#pilares" onClick={onClose}>Pilares</a>
      <a href="#psicologia" onClick={onClose}>Psicologia</a>
      <a href="#parceiros" onClick={onClose}>Parceiros</a>
      <div className="mobile-menu-line" />
      <a href="#cta" onClick={onClose}>Contato</a>
      <a href="https://consultoria-tawny-zeta.vercel.app" target="_blank" rel="noopener noreferrer" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        Consultoria
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
      <a href="https://planos-roan.vercel.app" target="_blank" rel="noopener noreferrer" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        Nossos Planos
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
      <p className="mobile-menu-contact">Urubici · Serra Catarinense</p>
    </div>
  )
}
