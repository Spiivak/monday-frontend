import React from 'react'
import { RowModal } from './menus/RowModal'
import { GroupModal } from './menus/GroupModal'
import { ColumnModal } from './menus/ColumnModal'
import { BoardModal } from './menus/BoardModal'
import { useSelector } from 'react-redux'
import { AddModal } from './menus/AddModal'

export function DynamicModalMenu() {
  const activeContextBtn = useSelector(
    (storeState) => storeState.boardModule.activeContextBtn
  )
  const activeContextBtnData = useSelector(
    (storeState) => storeState.boardModule.activeContextBtnData
  )
  const type = activeContextBtnData?.type
  const onDeleteGroup = activeContextBtnData?.onDeleteGroup || null
  const onDeleteBoard = activeContextBtnData?.onDeleteBoard || null
  const onDeleteColumn = activeContextBtnData?.onDeleteColumn || null
  const onDeleteRow = activeContextBtnData?.onDeleteRow || null
  const onAddColumn = activeContextBtnData?.onAddColumn || null

  console.log(activeContextBtnData, activeContextBtn)
  if (!type) return
  switch (type) {
    case 'row':
      return (
        <RowModal menuBtnRef={activeContextBtn} onDeleteRow={onDeleteRow} />
      )
    case 'column':
      return (
        <ColumnModal
          menuBtnRef={activeContextBtn}
          onDeleteColumn={onDeleteColumn}
        />
      )
    case 'group':
      return (
        <GroupModal
          menuBtnRef={activeContextBtn}
          onDeleteGroup={onDeleteGroup}
        />
      )
    case 'board':
      return (
        <BoardModal
          menuBtnRef={activeContextBtn}
          onDeleteBoard={onDeleteBoard}
        />
      )
    case 'add':
      return (
        <AddModal menuBtnRef={activeContextBtn} onAddColumn={onAddColumn} />
      )
  }
}
