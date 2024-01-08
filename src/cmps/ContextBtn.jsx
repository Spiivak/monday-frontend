
import {
  MenuIcon,
} from './Icons'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  deactivateContextBtn,
  setActiveContextBtn,
} from '../store/actions/board.actions'

export function ContextBtn({
  type,
  onDeleteGroup,
  onDeleteBoard,
  onDeleteColumn,
  onDeleteRow,
}) {
  const activeContextBtn = useSelector(
    (storeState) => storeState.boardModule.activeContextBtn
  )
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false)

  function onSetActiveBtn(ev) {
    const contextBtn = ev.target
    const contextBtnData = {
      type,
      onDeleteGroup,
      onDeleteBoard,
      onDeleteColumn,
      onDeleteRow,
    }

    if (activeContextBtn === contextBtn) {
      deactivateContextBtn()
    } else {
      setActiveContextBtn(contextBtn, contextBtnData)
    }
  }

  return (
    <div className="context-menu hidden-hover">
      <button
        className="btn-icon small-transparent"
        onClick={(ev) => {
          ev.stopPropagation()
          onSetActiveBtn(ev)
        }}>
        <MenuIcon />
      </button>
    </div>
  )
}
