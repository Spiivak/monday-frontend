import { AddSmallIcon, FavoriteIcon, HomeIcon, SearchIcon, WorkspaceIcon } from "../Icons"

export function WorkSpaceContext() {
  return (
    <div className="workspace-context-container">
      <div className="workspace-context-header">
        <div className="workspace-search flex">
          <input type="text" placeholder="Search for a workspace" />
          <button className="btn-icon small-transparent">
            <SearchIcon/>
          </button>
        </div>
          <button className="btn-icon small-transparent">
            <FavoriteIcon/>
            Favorites
          </button>
        <div className="workspace-context-middle">
          <div>
            <p>My workspaces</p>
            <button className="btn-icon medium-transparent flex gap16"><HomeIcon/> Sprint 4</button>
          </div>
        </div>
      </div>
      <div className="work-space-btns">
        <button className="btn-icon small-transparent flex gap8"><AddSmallIcon/> Add workspace</button>
        <button className="btn-icon small-transparent flex gap8"><WorkspaceIcon/>Browse all</button>
      </div>
    </div>
  )
}
