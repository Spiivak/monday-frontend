import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  finishAddingColumn,
  setBoardLoading,
} from '../../../../../store/actions/board.actions'
export function EmptyStreachableCell({}) {
  const isAddingColumn = useSelector(
    (storeState) => storeState.boardModule.isAddingColumn
  )

  const emptyCell = useRef()
  const [width, setWidth] = useState(0)
  let newWidth
  useEffect(() => {
    setTimeout(() => {
      const { left } = emptyCell.current.getBoundingClientRect()
      newWidth = window.innerWidth - Math.floor(left)
      if (newWidth <= 40) {
        setWidth('40px')
      } else {
        setWidth(newWidth - 3 + 'px')
      }
      finishAddingColumn()
    }, 200)
  }, [isAddingColumn])

  useEffect(() => {
    const handleResize = () => {
      const { left } = emptyCell.current.getBoundingClientRect()
      newWidth = window.innerWidth - Math.floor(left)
      if (newWidth <= 40) {
        setWidth('40px')
      } else {
        setWidth(newWidth - 3 + 'px')
      }
    }
    setBoardLoading(false)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <td>
      <div
        ref={emptyCell}
        style={{ width: width ? width : '40px' }}
        className="empty-add-cell"
      ></div>
    </td>
  )
}
