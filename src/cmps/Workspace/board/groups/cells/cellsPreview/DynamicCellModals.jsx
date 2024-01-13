import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ImageModal } from '../modals/ImageModal'
import { setImg } from '../../../../../../store/actions/board.actions'

export function DynamicCellModals() {
  const imgTarget = useSelector(
    (storeState) => storeState.boardModule.imgTarget
  )
  const imgTargetData = useSelector(
    (storeState) => storeState.boardModule.imgTargetData
  )
  const [position, setPosition] = useState({ top: 0, left: 0 })
  useEffect(() => {
    const handleResize = () => {
      if (imgTarget) {
        // Your logic for calculating newLeft and newTop
        const { innerWidth, innerHeight } = window
        // const { top, left, height, width } = imgTarget.getBoundingClientRect()
        let newLeft, newTop
        const left = imgTarget.pageX
        const top = imgTarget.pageY
        console.log(imgTarget.clinetX, imgTarget.clinetY)

        if (left > innerWidth / 2) {
          newLeft = left - 140
        } else {
          newLeft = left - 140
        }

        if (top > innerHeight / 2) {
          newTop = top - 20
        } else {
          newTop = top - 20
        }

        // Update the state with the new position
        setPosition({ top: newTop, left: newLeft })
      }
    }
    handleResize()
  }, [imgTarget])

  if(!imgTarget) return

  return (
    <div
      onMouseLeave={() => setImg(null)}
      style={{
        // backgroundColor: 'red',
        position: 'fixed',
        width: '280px',
        top: position.top,
        left: position.left,
        padding: '1rem',
        zIndex: '2000',
      }}>
      <ImageModal src={imgTargetData} />
    </div>
  )
}
