import { Outlet } from "react-router-dom"
import { WorkSpaceHeader } from "../cmps/WorkSpaceCmps/WorkSpaceHeader"

export function WorkSpacePage() {
  return (
    <section className="page work-space-page">
      <WorkSpaceHeader />
      <Outlet />
    </section>
  )
}
