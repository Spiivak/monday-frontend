import { NavLink } from "react-router-dom"

export function NavLinkBtn({ svgPath, children, Route }) {
  return (
    <NavLink className="side-bar-link flex" to={Route}>
      <img src={svgPath} />
      <span>{children}</span>
    </NavLink>
  )
}
