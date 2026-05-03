type Props = {
  children: React.ReactNode
}

export default function CenterWrapper({ children }: Props) {
  return (
    <div className="cw">
      <div className="cw-inner">
        {children}
      </div>
    </div>
  )
}
