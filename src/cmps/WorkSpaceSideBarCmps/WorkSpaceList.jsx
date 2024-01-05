import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BoardIcon, DeleteIcon } from '../Icons'
import { ContextBtn } from '../ContextBtn'

export function WorkSpaceList({ onRemoveBoard }) {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const stopPropagation = (ev) => {
    ev.stopPropagation();
  };

  return (
    <div className="workspaces-list flex column">
      {boards.map((board) => (
        <div key={board._id}>
          <div className="workspace-item flex align-center space-between">
            <NavLink to={`/workspace/${board._id}`} className="flex gap8 align-center hoverable space-between" onClick={(ev) => ev.stopPropagation()}>
              <div className="link flex space-between">
                <div className="nav-link-content flex space-between align-center gap8">
                  <BoardIcon />{board.title}
                </div>
                <ContextBtn type='board' onDeleteBoard={() => onRemoveBoard(board._id)} onClick={stopPropagation}/>
              </div>
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  )
}
