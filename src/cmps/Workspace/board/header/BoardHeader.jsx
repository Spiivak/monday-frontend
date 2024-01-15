import { useState, useEffect } from 'react'
import {
  ActivityIcon,
  InfoIcon,
  InviteMembersIcon,
  NavigationChevronUpIcon,
} from '../../../Icons'
import { BoardTabs } from './BoardTabs'
import { BoardHeaderFilter } from './BoardHeaderFilter'
import { EditableText } from '../editableText/EditableText'
import {
  deactivateBoard,
  setActiveBoard,
} from '../../../../store/actions/board.actions'
import { useSelector } from 'react-redux'

export function BoardHeader({ board, onUpdateBoard }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const activeBoard = useSelector(
    (storeState) => storeState.boardModule.activeBoard
  )
  function onOpenBoard() {
    if (activeBoard) {
      deactivateBoard()
    } else {
      setActiveBoard(board)
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      setIsCollapsed(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const [inviteModal, setOpenInviteModal] = useState(false)

  function handleTitleChange(newTitle) {
    board.title = newTitle
    onUpdateBoard(board)
  }

  return (
    <section className={'board-header flex column'}>
      <div className="wrapper flex column">
        <div className="flex">
          {!!board && (
            <h2 className="flex align-center">
              <EditableText
                type={'headerTitle'}
                initialText={`${board.title}`}
                onSave={handleTitleChange}
              />
            </h2>
          )}
          <div className={`header-btns flex align-center space-between`}>
            {!isCollapsed ? (
              <div className="left-btns flex align-center">
                <button className="btn-icon medium-transparent">
                  <InfoIcon />
                </button>
                {/* <button className="btn-icon medium-transparent">
                  <FavoriteIcon />
                </button> */}
              </div>
            ) : (
              <BoardTabs
                onCollapse={() => setIsCollapsed(!isCollapsed)}
                isCollapsed={isCollapsed}
              />
            )}

            <div className="right-btns flex align-center">
              {!isCollapsed && (
                <button
                  onClick={onOpenBoard}
                  className="btn-icon medium-transparent"
                >
                  <ActivityIcon />
                </button>
              )}
              <button
                onClick={() => setOpenInviteModal(!inviteModal)}
                className="btn-icon medium-transparent flex gap8"
              >
                <InviteMembersIcon />
                Invite / 4
              </button>
              {/* <button className="btn-icon medium-transparent">
                <MenuIcon />
              </button> */}
              {isCollapsed && (
                <button
                  className="btn-icon medium-transparent"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <NavigationChevronUpIcon />
                </button>
              )}
            </div>
          </div>
        </div>

        {!isCollapsed && (
          <BoardTabs
            isCollapsed={isCollapsed}
            onCollapse={() => setIsCollapsed(!isCollapsed)}
          />
        )}
        <BoardHeaderFilter board={board} isCollapsed={isCollapsed} />
      </div>
    </section>
  )
}
