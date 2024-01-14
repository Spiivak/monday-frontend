import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { setLabels } from '../../../../../../store/actions/board.actions'
import { EditableText } from '../../../editableText/EditableText'

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

  const labelsEditModal = useRef()

  const [position, setPosition] = useState({ top: 0, left: 0 })
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
          newLeft = labelModalTargetLeft + (labelModalTargetWidth - labelModalWidth) / 2;
        } else {
          newLeft = labelModalTargetLeft + (labelModalTargetWidth - labelModalWidth) / 2;
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
  }, [editLabelTarget])

  if (!editLabelTarget) return
  return (
    <div
      onClick={() => setLabels(null, null)}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: '99999999999',
      }}>
      <div
        ref={labelsEditModal}
        style={{
          position: 'absolute',
          inset: 0,
          left: position.left,
          top: position.top,
          zIndex: '2000',
          width: 'fit-content',
          height: 'fit-content',
          backgroundColor: 'pink',
        }}>
        {selectedBoard[editLabelTargetData].map((label) => {
          return (
            <div className='flex' onClick={(ev)=>ev.stopPropagation()}>
                <div style={{width:'24px', height:'24px', backgroundColor:label.color}}></div>
                <EditableText initialText={label.title} type={'taskTitle'} onSave={()=>{}}/>
                {console.log(labelsEditModal)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
