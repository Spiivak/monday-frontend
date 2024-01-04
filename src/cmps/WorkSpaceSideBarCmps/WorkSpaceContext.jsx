import Workspace from "../../assets/icons/Workspace.svg"
import Search from "../../assets/icons/Search.svg"
import Favorite from "../../assets/icons/Favorite.svg"

export function WorkSpaceContext() {
  return (
    <div className="workspace-context-container">
      <div className="work-space-header">
        <div className="work-space-search flex">
          <input type="text" placeholder="Search for a workspace" />
          <button>
            <img src={Search} alt="Search" />
          </button>
        </div>
        <button>
          <span>
            <img src={Favorite} />
          </span>
          Favorites
        </button>
        <div>
          <p>My workspaces</p>
          <button>Sprint 4</button>
        </div>
      </div>
      <div className="work-space-btns flex align-center">
        <span>+</span>
        <button> Add workspace</button>
        <button>
          <img src={Workspace} />
          Browse all
        </button>
      </div>
    </div>
  )
}
