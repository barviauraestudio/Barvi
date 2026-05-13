import { useRef, useEffect } from 'react';
import type { ReactNode, CSSProperties } from 'react';

// ... resto do componente igual

interface FadeContentProps {
  children: ReactNode;
  blur?: boolean;
  duration?: number;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
  style?: CSSProperties;
}

// Pure CSS/IntersectionObserver version — no GSAP dependency
const FadeContent = ({
  children,
  blur = false,
  duration = 800,
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  className = '',
  style,
}: FadeContentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial state
    el.style.opacity = String(initialOpacity);
    el.style.filter = blur ? 'blur(10px)' : 'blur(0px)';
    el.style.transform = 'translateY(16px)';
    el.style.transition = `opacity ${duration}ms ease-out ${delay}ms, filter ${duration}ms ease-out ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`;
    el.style.willChange = 'opacity, filter, transform';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.filter = 'blur(0px)';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [blur, duration, delay, threshold, initialOpacity]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

export default FadeContent;
