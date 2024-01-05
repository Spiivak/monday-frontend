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
            onClick={() => openMoreModal()}>
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

function GroupModal({ onDeleteGroup, setIsMoreModalOpen, menuBtnRef }) {
  const modalRef = useRef()

  useEffect(() => {
    // Add event listener to close modal when clicking outside
    const handleOutsideClick = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(event.target)
      ) {
        setIsMoreModalOpen(false)
      }
    }

    // Add event listener to the document body
    document.body.addEventListener('click', handleOutsideClick)

    // Remove event listener on component unmount
    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [setIsMoreModalOpen])
  return (
    <div className="more-modal-container flex column" ref={modalRef}>
      <div className="ds-tabs-section">
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <EditIcon />
            Rename workspace
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <SwitchIcon />
            Change icon
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <SettingsIcon />
            Manage workspace
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <Save />
            Save as template
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <DeleteIcon />
            Delete workspace
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <AddSmallIcon />
            Add new workspace
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <AddSmallIcon />
            Browse all workspaces
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <CollapseIcon />
            Collapse all folders
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab">
          <button
            className="btn-icon medium-transparent flex gap16"
            onClick={onDeleteGroup}>
            <DeleteIcon />
            Delete
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <ArchiveIcon />
            Archive
          </button>
        </div>
      </div>
    </div>
  )
}

function BoardModal({ onDeleteBoard, setIsMoreModalOpen, menuBtnRef }) {
  const modalRef = useRef()

  useEffect(() => {
    // Add event listener to close modal when clicking outside
    const handleOutsideClick = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(event.target)
      ) {
        setIsMoreModalOpen(false)
      }
    }

    // Add event listener to the document body
    document.body.addEventListener('click', handleOutsideClick)

    // Remove event listener on component unmount
    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [setIsMoreModalOpen])
  return (
    <div className="more-modal-container flex column" ref={modalRef}>
      <div className="ds-tabs-section">
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <EditIcon />
            Rename workspace
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <SwitchIcon />
            Change icon
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <SettingsIcon />
            Manage workspace
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <Save />
            Save as template
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <DeleteIcon />
            Delete workspace
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <AddSmallIcon />
            Add new workspace
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <AddSmallIcon />
            Browse all workspaces
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <CollapseIcon />
            Collapse all folders
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab">
          <button
            className="btn-icon medium-transparent flex gap16"
            onClick={onDeleteBoard}>
            <DeleteIcon />
            Delete
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <ArchiveIcon />
            Archive
          </button>
        </div>
      </div>
    </div>
  )
}

function ColumnModal({ onDeleteColumn, setIsMoreModalOpen, menuBtnRef }) {
  const modalRef = useRef()

  useEffect(() => {
    // Add event listener to close modal when clicking outside
    const handleOutsideClick = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(event.target)
      ) {
        setIsMoreModalOpen(false)
      }
    }

    // Add event listener to the document body
    document.body.addEventListener('click', handleOutsideClick)

    // Remove event listener on component unmount
    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [setIsMoreModalOpen])
  return (
    <div className="more-modal-container flex column" ref={modalRef}>
      <div className="ds-tabs-section">
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <EditIcon />
            Rename workspace
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <SwitchIcon />
            Change icon
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <SettingsIcon />
            Manage workspace
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <Save />
            Save as template
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <DeleteIcon />
            Delete workspace
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <AddSmallIcon />
            Add new workspace
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <AddSmallIcon />
            Browse all workspaces
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <CollapseIcon />
            Collapse all folders
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab">
          <button
            className="btn-icon medium-transparent flex gap16"
            onClick={onDeleteColumn}>
            <DeleteIcon />
            Delete
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <ArchiveIcon />
            Archive
          </button>
        </div>
      </div>
    </div>
  )
}

function RowModal({ onDeleteRow, setIsMoreModalOpen, menuBtnRef }) {
  const modalRef = useRef()

  useEffect(() => {
    // Add event listener to close modal when clicking outside
    const handleOutsideClick = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(event.target)
      ) {
        setIsMoreModalOpen(false)
      }
    }

    // Add event listener to the document body
    document.body.addEventListener('click', handleOutsideClick)

    // Remove event listener on component unmount
    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [setIsMoreModalOpen])
  return (
    <div className="more-modal-container flex column" ref={modalRef}>
      <div className="ds-tabs-section">
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <EditIcon />
            Rename workspace
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <SwitchIcon />
            Change icon
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <SettingsIcon />
            Manage workspace
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <Save />
            Save as template
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16" disabled>
            <DeleteIcon />
            Delete workspace
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <AddSmallIcon />
            Add new workspace
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <AddSmallIcon />
            Browse all workspaces
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <CollapseIcon />
            Collapse all folders
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab">
          <button
            className="btn-icon medium-transparent flex gap16"
            onClick={onDeleteRow}>
            <DeleteIcon />
            Delete
          </button>
        </div>
        <div className="tab">
          <button className="btn-icon medium-transparent flex gap16">
            <ArchiveIcon />
            Archive
          </button>
        </div>
      </div>
    </div>
  )
}
