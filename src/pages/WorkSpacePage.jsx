import { Outlet } from 'react-router-dom'
import { WorkSpaceHeader } from '../cmps/WorkSpaceCmps/WorkSpaceHeader'

export function WorkSpacePage() {
  return (
    <section className="workspace-index main-layout">
      <WorkSpaceHeader />
      <Outlet />
    </section>
  )
}
