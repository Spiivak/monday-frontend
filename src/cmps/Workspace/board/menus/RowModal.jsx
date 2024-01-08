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
export function RowModal({ onDeleteRow, setIsMoreModalOpen, menuBtnRef }) {
  const modalRef = useRef()

  // State for position
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const handleResize = () => {
      // Your logic for calculating newLeft and newTop
      const { innerWidth, innerHeight } = window
      const { top, left, height, width } = menuBtnRef.getBoundingClientRect()
      let newLeft, newTop

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
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize)
    window.addEventListener('click', handleOutsideClick)
    // Cleanup
    return () => {
      window.removeEventListener('click', handleOutsideClick)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleResize)
    }
  }, [menuBtnRef])

  function clickDeleteRow() {
    deactivateContextBtn()
    onDeleteRow()
  }

  return (
    <div
      className="more-modal-container flex column"
      ref={modalRef}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 1000,
      }}
    >
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
            onClick={clickDeleteRow}
          >
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
