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

  function handleColorChange(color, labelId) {
    labelChange('color', color, selectedBoard, labelId, editLabelTargetData)
    setIsColorModalOpen(null)
  }

  function handleTextChange(text, labelId) {
    labelChange('text', text, selectedBoard, labelId, editLabelTargetData)
    setIsColorModalOpen(null)
  }

  function onAddLabel(txt) {
    addLabel(txt, selectedBoard, editLabelTargetData)
  }

  function onRemoveLabel(labelId) {
    removeLabel(selectedBoard, labelId, editLabelTargetData)
  }

  if (!editLabelTarget) return
  if (!!!boards) return
  return (
    <div
      onClick={() => {
        setLabels(null, null)
        setIsColorModalOpen(null)
      }}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: '99999999999',
      }}>
      <div
        onClick={(ev) => ev.stopPropagation()}
        ref={labelsEditModal}
        style={{
          position: 'absolute',
          inset: 0,
          left: position.left,
          top: position.top,
          zIndex: '2000',
          width: 'fit-content',
          height: 'fit-content',
          padding: '8px 12px',
          backgroundColor: 'pink',
        }}>
        {selectedBoard[editLabelTargetData].map((label) => {
          return (
            <div
              style={{ marginBottom: '8px' }}
              className="flex space-between"
              onClick={(ev) => {
                ev.stopPropagation()
              }}>
              <div
                onClick={() => {
                  setIsColorModalOpen((prev) => {
                    if (prev) return null
                    return label.id
                  })
                }}
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: label.color,
                }}>
                {label.id === isColorModalOpen ? (
                  <div onClick={(ev) => ev.stopPropagation()}>
                    <ColorPickerModal
                      handleColor={(color) =>
                        handleColorChange(color, label.id)
                      }
                    />
                    {console.log(isColorModalOpen)}
                  </div>
                ) : null}
              </div>
              <EditableText
                initialText={label.title}
                type={'taskTitle'}
                onSave={(text) => handleTextChange(text, label.id)}
              />
              <button onClick={() => onRemoveLabel(label.id)}>x</button>
            </div>
          )
        })}
        <div onClick={(ev) => ev.stopPropagation()}>
          <EditableText
            initialText={'add label'}
            type={'taskTitle'}
            onSave={onAddLabel}
          />
        </div>
      </div>
    </div>
  )
}
