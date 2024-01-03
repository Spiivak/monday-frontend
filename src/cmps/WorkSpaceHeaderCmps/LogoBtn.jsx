export function LogoBtn({ iconSvg, children }) {
  return (
    <button className="logo-btn">
      <div className="logo-btn-content">
        <img src={iconSvg} alt="" style={{fill:'red'}} />
        <span>{children}</span>
      </div>
    </button>
  )
}
