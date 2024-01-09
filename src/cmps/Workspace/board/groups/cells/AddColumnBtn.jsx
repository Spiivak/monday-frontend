import { Add, Description, Save, UploadFile } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import {
  AddIcon,
} from '../../../../Icons'
import { useSelector } from 'react-redux'
import {
  deactivateContextBtn,
  setActiveContextBtn,
} from '../../../../../store/actions/board.actions'

export default function AddColumnBtn({
  onAddColumn,
  onDeleteGroup,
  onDeleteBoard,
  onDeleteColumn,
  onDeleteRow,
}) {
  const activeContextBtn = useSelector(
    (storeState) => storeState.boardModule.activeContextBtn
  )

  function onSetActiveBtn(ev) {
    const contextBtn = ev.target
    const contextBtnData = {
      type: 'add',
      onAddColumn,
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
        }}
      >
        <AddIcon />
      </button>
    </div>
  )
}
