import React from 'react'
import { utilService } from '../../../services/util.service'
import { BoardIcon, BoltIcon, FavoriteIcon } from '../../Icons'
import { useSelector } from 'react-redux'
import QuickBoard from '../../../assets/img/icons/quick_search_recent_board.svg'


export function WorkspaceIndex() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  console.log('WorkspaceIndex  boards:', boards)

  return (
    <section className='workspace-index test'>
      <div className="workspace-index-header flex space-between">
        <div className="greeting-section">
          <span className='greeting'>{utilService.getGreeting()}, Eden Spivak</span>
          <p>Quickly access your recent boards, inboxs and workspaces</p>
        </div>
        <div className="greeting-actions flex">
          <button className='btn-txt medium-primary'>Give feedback</button>
          <button className='btn-ctn medium-primary flex gap8'>
            <BoltIcon/>
            Quick Search
            </button>
        </div>
      </div>

      <div className="main-content">
        <div className="workspace-list flex gap16">
          {boards.map(board => (
            <div key={board._id} className='test'>
              <img src={QuickBoard} alt="" />
              <div className="board-title flex">
              <BoardIcon/>
                <div className="title">
                  <span>{board.title}</span>
                </div>
                <FavoriteIcon/>
              </div>
              <div className="breadcrumbs">
                <span>work management {`>`} {board.title}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="workspace-side"></div>
      </div>
    </section>
  )
}
