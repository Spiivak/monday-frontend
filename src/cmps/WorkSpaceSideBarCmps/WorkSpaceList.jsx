import { Link } from "react-router-dom"
import Board from "../../assets/icons/Board.svg"

export function WorkSpaceList() {
  return (
    <div className="work-spaces-list flex justify-center">
      <Link>
        <img src={Board} />
        Monday
      </Link>
      <Link>
        <img src={Board} />
        Course
      </Link>
      <Link>
        <img src={Board} />
        Gym
      </Link>
    </div>
  )
}
