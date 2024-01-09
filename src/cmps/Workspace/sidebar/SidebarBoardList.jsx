import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BoardIcon } from '../../Icons'
import { ContextBtn } from '../../ContextBtn'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { updateBoards } from '../../../store/actions/board.actions'

export function SidebarBoardList({ onRemoveBoard }) {
  const boards = useSelector((storeState) => storeState.boardModule.boards)

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const newBoards = [...boards]
    const [removed] = newBoards.splice(result.source.index, 1)
    newBoards.splice(result.destination.index, 0, removed)
    console.log('handleDragEnd  newBoards:', newBoards)

    updateBoards(newBoards)
  }

  // async function updateBoards(boards) {
  //   try {
  //     await saveBoardsList(boards)
  //   } catch (err) {
  //     console.error('Error saving Boards order:', err)
  //   }
  // }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="boards" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="workspaces-list flex column">
            {boards.map((board, index) => (
              <Draggable key={board._id} draggableId={board._id} index={index}>
                {(provided, snapshot) => (
                  <div
                    key={board._id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      userSelect: 'none',
                    }}
                  >
                    <div className="workspace-item flex align-center space-between">
                      <NavLink
                        to={`/workspace/${board._id}`}
                        className="flex gap8 align-center hoverable space-between"
                        onClick={(ev) => ev.stopPropagation()}
                      >
                        <div className="link flex space-between">
                          <div className="nav-link-content flex space-between align-center gap8">
                            <BoardIcon />
                            {board.title}
                          </div>
                        </div>
                      </NavLink>
                      <ContextBtn
                        type="board"
                        onDeleteBoard={() => onRemoveBoard(board._id)}
                        onClick={(ev) => ev.stopPropagation()}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
