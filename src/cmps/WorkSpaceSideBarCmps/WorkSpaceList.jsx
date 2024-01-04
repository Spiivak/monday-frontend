import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import Board from "../../assets/icons/Board.svg"
import Delete from "../../assets/icons/Delete.svg"

export function WorkSpaceList({ onRemoveBoard }) {
  const boards = useSelector((storeState) => storeState.boardModule.boards)

  return (
    <div className="work-spaces-list flex">
      {boards.map((board) => (
        <div key={board._id} className="flex space-between relative">
          <Link
            style={{
              width: "100%",
            }}
            to={`/${board._id}`}
          >
            <div className="flex ">
              <img src={Board} />
              {board.title}
            </div>
          </Link>
          <div
            style={{ right: "15px", top: "11px" }}
            className="menu-btn absolute"
          >
            <button onClick={() => onRemoveBoard(board._id)}>
              <img src={Delete} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
