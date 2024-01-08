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
} from '../../../Icons'
import { Save } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import { deactivateContextBtn } from '../../../../store/actions/board.actions'
export function ColumnModal({
  onDeleteColumn,
  setIsMoreModalOpen,
  menuBtnRef,
}) {
  const modalRef = useRef()

  // State for position
  const [position, setPosition] = useState()
  const [modal, setModal] = useState()

  useEffect(() => {
    const handleResize = (event) => {
      // Your logic for calculating newLeft and newTop
      const { innerWidth, innerHeight } = window
      const { y, x, height, width } = menuBtnRef.getBoundingClientRect()
      let newLeft, newTop
      // var scrollLeft = event.window.scrollX || event.window.pageXOffset;
      if (x < 0) {
        newLeft = undefined
        newTop = undefined
      } else if (x > innerWidth / 2) {
        newLeft = x - 280 + width / 2
      } else {
        newLeft = x + width / 2
      }

      if (x < 0) {
        newLeft = undefined
        newTop = undefined
      } else if (y > innerHeight / 2) {
        newTop = y - 400 + height - 6
      } else {
        newTop = y + height + 6
      }

      // Update the state with the new position
      setPosition({ top: newTop, left: newLeft })
    }

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

    // Initial setup
    handleResize()

    // Event listeners
    window.addEventListener('click', handleOutsideClick)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize)
    // Cleanup
    return () => {
      window.removeEventListener('click', handleOutsideClick)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleResize)
    }
  }, [menuBtnRef])

  function clickDeleteColumn() {
    deactivateContextBtn()
    onDeleteColumn()
  }

  if (!position) return

  return (
    <div
      className="more-modal-container flex column"
      ref={modalRef}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 1000,
      }}>
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
