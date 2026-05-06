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
      <a href="https://consultoria-tawny-zeta.vercel.app" target="_blank" rel="noopener noreferrer" onClick={onClose}>Consultoria ↗</a>
      <a href="https://planos-roan.vercel.app" target="_blank" rel="noopener noreferrer" onClick={onClose}>Nossos Planos ↗</a>
      <p className="mobile-menu-contact">Urubici · Serra Catarinense</p>
    </div>
  )
}
