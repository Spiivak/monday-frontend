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
} from '../../Icons'
import { Save } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import { deactivateContextBtn } from '../../../store/actions/board.actions'
export function ColumnModal({
  onDeleteColumn,
  setIsMoreModalOpen,
  menuBtnRef,
}) {
  const modalRef = useRef()
  useEffect(() => {
    // Add event listener to close modal when clicking outside
    const handleOutsideClick = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        menuBtnRef &&
        !menuBtnRef.contains(event.target)
      ) {
        deactivateContextBtn()
      }
    } // Add event listener to the document body

    document.body.addEventListener('click', handleOutsideClick)
    document.body.addEventListener('resize', handleResize)
    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
      document.body.removeEventListener('resize', handleResize)
    }
  }, [setIsMoreModalOpen])

  function clickDeleteColumn() {
    deactivateContextBtn()
    onDeleteColumn()
  }

  let newLeft, newTop
  const { innerWidth, innerHeight } = window
  const { top, left, height, width } = menuBtnRef.getBoundingClientRect()
  if (left > innerWidth / 2) {
    newLeft = left - 280 + width / 2
  } else {
    newLeft = left + width / 2
  }
  if (top > innerHeight / 2) {
    newTop = top - 400 + height - 6
  } else {
    newTop = top + height + 6
  }

  function handleResize() {
    let newLeft, newTop
    const { innerWidth, innerHeight } = window
    const { top, left, height, width } = menuBtnRef.getBoundingClientRect()
    if (left > innerWidth / 2) {
      newLeft = left - 280 + width / 2
    } else {
      newLeft = left + width / 2
    }
    if (top > innerHeight / 2) {
      newTop = top - 400 + height - 6
    } else {
      newTop = top + height + 6
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: newTop,
        left: newLeft,
        zIndex: 1000,
      }}
      className="more-modal-container flex column"
      ref={modalRef}>
      <div className="ds-tabs-section">
        <div className="tab flex column">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <EditIcon />
            Rename workspace
          </button>
        </div>
        <div className="tab flex column">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <SwitchIcon />
            Change icon
          </button>
        </div>
        <div className="tab flex column">
          <button className="btn-icon medium-transparent flex gap16">
            <SettingsIcon />
            Manage workspace
          </button>
        </div>
        <div className="tab flex column">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <Save />
            Save as template
          </button>
        </div>
        <div className="tab flex column">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <DeleteIcon />
            Delete workspace
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab flex column">
          <button className="btn-icon medium-transparent flex gap16">
            <AddSmallIcon />
            Add new workspace
          </button>
        </div>
        <div className="tab flex column">
          <button className="btn-icon medium-transparent flex gap16">
            <AddSmallIcon />
            Browse all workspaces
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab flex column">
          <button className="btn-icon medium-transparent flex gap16">
            <CollapseIcon />
            Collapse all folders
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab flex column">
          <button
            className="btn-icon medium-transparent flex gap16"
            onClick={clickDeleteColumn}>
            <DeleteIcon />
            Delete
          </button>
        </div>
        <div className="tab flex column">
          <button className="btn-icon medium-transparent flex gap16">
            <ArchiveIcon />
            Archive
          </button>
        </div>
      </div>
    </div>
  )
}
