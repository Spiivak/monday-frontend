import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import Board from "../../assets/icons/Board.svg"
import Delete from "../../assets/icons/Delete.svg"
import { BoardIcon, DeleteIcon } from "../Icons"

export function WorkSpaceList({ onRemoveBoard }) {
  const boards = useSelector((storeState) => storeState.boardModule.boards)

  return (
    <div className="work-spaces-list flex">
      {boards.map((board) => (
        <div key={board._id} className="flex space-between relative">
          <div className="flex align-center">
            <Link to={`/${board._id}`}>
              <BoardIcon />{board.title}
            </Link>
            <div className="menu-btn">
              <button className="btn-icon medium-transparent" onClick={() => onRemoveBoard(board._id)}><DeleteIcon /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
