import {
  AddSmallIcon,
  ArchiveIcon,
  CollapseIcon,
  DeleteIcon,
  EditIcon,
  FavoriteIcon,
  GalleryIcon,
  HomeIcon,
  MwmIcon,
  SearchIcon,
  SettingsIcon,
  SwitchIcon,
  WorkspaceIcon,
} from '../Icons'
import Mwm from '../../assets/img/mwm.png'
import { Save } from '@mui/icons-material'
export function MoreModal() {
  return (
    <div className="more-modal-container flex column">
      <div className="ds-tabs-section">
        <div className="tab">
          <button className="btn-icon small-transparent flex gap16">
            <MwmIcon />
            work management overview
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
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
          <button className="btn-icon medium-transparent flex gap16">
            <ArchiveIcon />
            View archive/trash
          </button>
        </div>
      </div>
    </div>
  )
}
