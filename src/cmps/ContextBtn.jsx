import { RowModal } from './WorkSpaceCmps/menus/RowModal';
import { ColumnModal } from './WorkSpaceCmps/menus/ColumnModal';
import { BoardModal } from './WorkSpaceCmps/menus/BoardModal';
import { GroupModal } from './WorkSpaceCmps/menus/GroupModal';
import {
  AddSmallIcon,
  ArchiveIcon,
  CollapseIcon,
  DeleteIcon,
  EditIcon,
  FavoriteIcon,
  GalleryIcon,
  HomeIcon,
  MenuIcon,
  MwmIcon,
  SearchIcon,
  SettingsIcon,
  SwitchIcon,
  WorkspaceIcon,
} from './Icons'
import Mwm from '../assets/img/mwm.png'
import { Save } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'

export function ContextBtn({ type, onDeleteGroup, onDeleteBoard, onDeleteColumn, onDeleteRow }) {
  const menuBtnRef = useRef()
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false)

  function openMoreModal() {
    setIsMoreModalOpen((isOpen) => !isOpen)
  }

  switch (type) {
    case 'group':
      return (
        <div className="context-menu relative">
          <button
            ref={menuBtnRef}
            className="btn-icon small-transparent"
            onClick={(ev) => {
              ev.stopPropagation()
              openMoreModal()
              }}>
            <MenuIcon />
          </button>
          {isMoreModalOpen && (
            <GroupModal
              onDeleteGroup={onDeleteGroup}
              setIsMoreModalOpen={setIsMoreModalOpen}
              menuBtnRef={menuBtnRef}
            />
          )}
        </div>
      )
    case 'board':
      return (
        <div className="context-menu relative hidden-hover">
          <button
            ref={menuBtnRef}
            className="btn-icon small-transparent"
            onClick={() => openMoreModal()}>
            <MenuIcon />
          </button>
          {isMoreModalOpen && (
            <BoardModal
              onDeleteBoard={onDeleteBoard}
              setIsMoreModalOpen={setIsMoreModalOpen}
              menuBtnRef={menuBtnRef}
            />
          )}
        </div>
      )
    case 'column':
      return (
        <div className="context-menu relative hidden-hover">
          <button
            ref={menuBtnRef}
            className="btn-icon small-transparent"
            onClick={() => openMoreModal()}>
            <MenuIcon />
          </button>
          {isMoreModalOpen && (
            <ColumnModal
              onDeleteColumn={onDeleteColumn}
              setIsMoreModalOpen={setIsMoreModalOpen}
              menuBtnRef={menuBtnRef}
            />
          )}
        </div>
      )
    case 'row':
      return (
        <div className="context-menu relative hidden-hover">
          <button
            ref={menuBtnRef}
            className="btn-icon small-transparent"
            onClick={() => openMoreModal()}>
            <MenuIcon />
          </button>
          {isMoreModalOpen && (
            <RowModal
              onDeleteRow={onDeleteRow}
              setIsMoreModalOpen={setIsMoreModalOpen}
              menuBtnRef={menuBtnRef}
            />
          )}
        </div>
      )
    default:
      break
  }
}








