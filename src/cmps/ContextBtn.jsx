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
import { useState } from 'react'

export function ContextBtn({ type, onDeleteGroup }) {
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false)
  function openMoreModal() {
    setIsMoreModalOpen((isOpen) => !isOpen)
  }

  switch (type) {
    case 'group':
      return (
        <div className="context-menu relative">
          <button
            className="btn-icon small-transparent"
            onClick={() => openMoreModal()}>
            <MenuIcon />
          </button>
          {isMoreModalOpen && <MoreModal onDeleteGroup={onDeleteGroup} />}
        </div>
      )
    default:
      break
  }
}

function MoreModal({ onDeleteGroup }) {
  return (
    <div className="more-modal-container flex column">
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
