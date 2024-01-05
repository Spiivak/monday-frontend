import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BoardIcon, DeleteIcon } from '../Icons'

export function WorkSpaceList({ onRemoveBoard }) {
  const boards = useSelector((storeState) => storeState.boardModule.boards)

  return (
    <div className="workspaces-list flex column">
      {boards.map((board) => (
        <div key={board._id}>
          <div className="workspace-item flex align-center space-between">
            <div className="link">
              <Link to={`/workspace/${board._id}`} className="flex gap8 align-center">
                <BoardIcon />
                {board.title}
              </Link>
            </div>
            <div className="menu-btn">
              <button
                className="btn-icon medium-transparent"
                onClick={() => onRemoveBoard(board._id)}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
