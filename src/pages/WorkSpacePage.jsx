import { Outlet } from 'react-router-dom'
import { WorkspaceHeader } from '../cmps/Workspace/header/WorkspaceHeader'

export function WorkSpacePage() {
  return (
    <section className="workspace-index main-layout">
      <WorkspaceHeader />
      <Outlet />
    </section>
  )
}
