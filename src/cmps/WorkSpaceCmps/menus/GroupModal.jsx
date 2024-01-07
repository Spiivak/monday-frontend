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
import { useEffect, useRef } from 'react'
export function GroupModal({
  onDeleteGroup,
  setIsMoreModalOpen,
  menuBtnRef
}) {
  const modalRef = useRef();
  useEffect(() => {
    // Add event listener to close modal when clicking outside
    const handleOutsideClick = event => {
      if (modalRef.current && !modalRef.current.contains(event.target) && menuBtnRef.current && !menuBtnRef.current.contains(event.target)) {
        setIsMoreModalOpen(false);
      }
    }; // Add event listener to the document body


    document.body.addEventListener('click', handleOutsideClick); // Remove event listener on component unmount

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [setIsMoreModalOpen]);
  return <div className="more-modal-container flex column" ref={modalRef}>
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
          <button className="btn-icon medium-transparent flex gap16" onClick={onDeleteGroup}>
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
    </div>;
}
