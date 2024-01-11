import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AddIcon } from '../../../Icons';
import { BoardGroupPreview } from './BoardGroupPreview';

export function BoardGroupList({ board, onAddGroup, onDragEnd }) {
  const handleDragEnd = (result) => {
    // Check if there is a valid destination
    if (result.destination) {
      const sourceTaskId = result.source.droppableId; // ID of the dragged row
      const sourceRowIndex = result.source.index; // Index of the dragged row
      const destinationGroupId = result.destination.droppableId; // ID of the dropped-on group
      const destinationRowIndex = result.destination.index; // Index of the dropped row

      // Log the row id, group id, and index of the dragged row
      console.log('Source Row ID:', sourceTaskId);
      console.log('Source Row Index:', sourceRowIndex);

      // Log the row id, group id, and index of the dropped row
      console.log('Destination Group ID:', destinationGroupId);
      console.log('Destination Row Index:', destinationRowIndex);

      // Now you can perform any logic based on these ids and indices
    }
  };


  return (
    <section className="board-view-list">
      {!!board && (
        <>
          <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
            <Droppable droppableId={`droppable-board-${board._id}`}  type="BOARD_GROUP">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {board.groups.map((group, index) => (
                    <Draggable key={group.id} draggableId={group.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <BoardGroupPreview
                            boardId={board._id}
                            key={group.id}
                            group={group}
                            cmpsOrder={board.cmpsOrder}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <button
            className="btn-outline medium-primary add-new-group"
            onClick={() => onAddGroup(board._id)}
          >
            <AddIcon />
            Add new group
          </button>
        </>
      )}
    </section>
  );
}
