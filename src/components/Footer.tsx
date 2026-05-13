import React from 'react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginTop: 40 }}
    >
      <style>{`
        @media (max-width: 768px) {
          .footer-wrapper {
            flex-direction: column !important;
            text-align: center !important;
            gap: 24px !important;
            padding: 0 20px !important;
          }
          .footer-right {
            align-items: center !important;
            text-align: center !important;
          }
          .footer-right p {
            text-align: center !important;
          }
        }
      `}</style>
      <footer style={styles.footer}>
        <div style={styles.topGlow} />
        <div style={styles.wrapper} className="footer-wrapper">
          <p style={styles.brand}>Barví Aura Estúdio</p>
          <div style={styles.right} className="footer-right">
            <p style={styles.team}>Arthur Bernardo, CEO · Maria Helena, COO</p>
            <p style={styles.copy}>© {new Date().getFullYear()} Barví Aura Estúdio. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    position: 'relative',
    width: '100%',
    maxWidth: 1280,
    margin: '0 auto',
    borderTop: '1px solid rgba(201,169,110,0.12)',
    borderRadius: '32px 32px 0 0',
    background: 'radial-gradient(35% 128px at 50% 0%, rgba(201,169,110,0.04), transparent), rgba(6,1,3,0.55)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    padding: '28px 0',
    overflow: 'hidden',
  },
  topGlow: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '33%',
    height: 1,
    background: 'rgba(201,169,110,0.4)',
    borderRadius: 999,
    filter: 'blur(2px)',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    width: '100%',
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 60px',
  },
  brand: {
    fontFamily: 'var(--FD)',
    fontStyle: 'italic',
    fontSize: 20,
    color: 'var(--gold)',
    letterSpacing: '0.01em',
    margin: 0,
    flexShrink: 0,
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 4,
  },
  team: {
    fontSize: 12,
    letterSpacing: '0.06em',
    color: 'var(--golddm)',
    margin: 0,
    textAlign: 'right',
  },
  copy: {
    fontSize: 10,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'rgba(242,237,230,0.2)',
    margin: 0,
    textAlign: 'right',
  },
};

export default Footer;
