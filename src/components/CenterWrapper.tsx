import type { CSSProperties } from 'react';

type Props = {
  children: React.ReactNode;
  style?: CSSProperties;
};

export default function CenterWrapper({ children, style }: Props) {
  return (
    <div className="cw" style={style}>
      <div className="cw-inner">
        {children}
      </div>
    </div>
  );
}