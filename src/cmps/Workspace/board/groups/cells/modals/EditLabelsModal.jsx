import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  addLabel,
  labelChange,
  removeLabel,
  setLabels,
} from '../../../../../../store/actions/board.actions'
import { EditableText } from '../../../editableText/EditableText'
import { ColorPickerModal } from '../../../ColorPickerModal'
import { CloseSmallIcon, ColorPalleteIcon, DragIcon, TextColorIndicatorIcon } from '../../../../../Icons'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export function EditLabelsModal() {
  const editLabelTarget = useSelector(
    (storeState) => storeState.boardModule.editLabelTarget
  )
  const editLabelTargetData = useSelector(
    (storeState) => storeState.boardModule.editLabelTargetData
  )
  const selectedBoard = useSelector(
    (storeState) => storeState.boardModule.selectedBoard
  )
  const boards = useSelector((storeState) => storeState.boardModule.boards)

  const labelsEditModal = useRef()
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [isColorModalOpen, setIsColorModalOpen] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      if (editLabelTarget?.current) {
        const labelModal = labelsEditModal.current
        const labelModalRect = labelModal.getBoundingClientRect()
        const labelModalHeight = labelModalRect.height
        const labelModalWidth = labelModalRect.width

        const labelModalTarget = editLabelTarget.current
        const labelModalTargetRect = labelModalTarget.getBoundingClientRect()
        const labelModalTargetLeft = labelModalTargetRect.left
        const labelModalTargetTop = labelModalTargetRect.top
        const labelModalTargetWidth = labelModalTargetRect.width

        // Now 'left' and 'top' contain the x and y coordinates of the element

        const { innerWidth, innerHeight } = window
        let newLeft, newTop

        if (labelModalTargetLeft > innerWidth / 2) {
          newLeft =
            labelModalTargetLeft + (labelModalTargetWidth - labelModalWidth) / 2
        } else {
          newLeft =
            labelModalTargetLeft + (labelModalTargetWidth - labelModalWidth) / 2
        }

        if (labelModalTargetTop > innerHeight / 2) {
          newTop = labelModalTargetTop - labelModalHeight - 20
        } else {
          newTop = labelModalTargetTop - labelModalHeight - 20
        }

        // Update the state with the new position
        setPosition({ top: newTop, left: newLeft })
      }
    }
    handleResize()
  }, [editLabelTarget, selectedBoard])

  function handleChange(type, data, labelId) {
    setIsColorModalOpen(null)
    labelChange(type, data, selectedBoard, labelId, editLabelTargetData)
  }

  function onAddLabel(txt) {
    addLabel(txt, selectedBoard, editLabelTargetData)
  }

  function onRemoveLabel(labelId) {
    removeLabel(selectedBoard, labelId, editLabelTargetData)
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return; // Dragged outside the list
    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    // Reorder the labels array
    const reorderedLabels = Array.from(selectedBoard[editLabelTargetData]);
    const [removed] = reorderedLabels.splice(startIndex, 1);
    reorderedLabels.splice(endIndex, 0, removed);

    // Update the labels order
    // setLabels(editLabelTargetData, reorderedLabels);
  };


  if (!editLabelTarget) return
  if (!!!boards) return
  return (
    <div
      onClick={() => setLabels(null, null)}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: '99999999999',
      }}
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="labels">
          {(provided, snapshot) => (
            <div
              ref={(el) => {
                labelsEditModal.current = el;
                provided.innerRef(el);
              }}
              {...provided.droppableProps}
              className="edit-labels-modal flex align-center column gap8 relative"
              onClick={(ev) => ev.stopPropagation()}
              style={{
                position: 'absolute',
                inset: 0,
                left: position.left,
                top: position.top,
                zIndex: '2000',
                width: 'fit-content',
                height: 'fit-content',
              }}
            >
              {selectedBoard[editLabelTargetData].map((label, index) => (
                <Draggable key={label.id} draggableId={label.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="label-row flex align-center"
                      style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? 0.5 : 1,
                        
                      }}
                    >
                      <div className="drag flex align-center">
                        <DragIcon />
                      </div>
                      <div
                        className="label flex"
                        onClick={(ev) => ev.stopPropagation()}
                      >
                        <div
                          className="color-picker flex align-center justify-center absolute"
                          onClick={() => {
                            setIsColorModalOpen((prev) => {
                              if (prev) return null;
                              return label.id;
                            });
                          }}
                          style={{
                            backgroundColor: label.color,
                          }}
                        >
                          <ColorPalleteIcon />
                          {label.id === isColorModalOpen ? (
                            <div onClick={(ev) => ev.stopPropagation()}>
                              <ColorPickerModal
                                handleColor={(color) =>
                                  handleChange('color', color, label.id)
                                }
                              />
                              {console.log(isColorModalOpen)}
                            </div>
                          ) : null}
                        </div>
                        <div className="label-text flex">
                          <EditableText
                            initialText={label.title}
                            type={'taskTitle'}
                            onSave={(text) =>
                              handleChange('title', text, label.id)
                            }
                          />
                        </div>
                      </div>
                      <div className="label-delete">
                        <button
                          className="btn-icon small-transparent"
                          onClick={() => onRemoveLabel(label.id)}
                        >
                          <CloseSmallIcon />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <div
                onClick={(ev) => ev.stopPropagation()}
                className="add-label flex align-center justify-center"
              >
                <EditableText
                  initialText={'+ New label'}
                  type={'taskTitle'}
                  onSave={onAddLabel}
                />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );

}
