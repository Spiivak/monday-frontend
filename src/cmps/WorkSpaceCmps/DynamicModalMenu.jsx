import React from 'react'
import { RowModal } from './menus/RowModal'
import { GroupModal } from './menus/GroupModal'
import { ColumnModal } from './menus/ColumnModal'
import { BoardModal } from './menus/BoardModal'

export function DynamicModalMenu(selectedBtn, type) {
  switch (type) {
    case 'row':
      return <RowModal />
    case 'column':
      return <ColumnModal />
    case 'group':
      return <GroupModal />
    case 'board':
      return <BoardModal />
  }

  return <></>
}
