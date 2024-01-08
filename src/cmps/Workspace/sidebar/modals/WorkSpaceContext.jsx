import { useEffect, useRef } from 'react';
import {
  AddSmallIcon,
  FavoriteIcon,
  HomeIcon,
  SearchIcon,
  WorkspaceIcon,
} from '../../../Icons'

export function WorkSpaceContext({onClose}) {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    const isFilterButton = event.target.closest('[data-workspace-button="true"]');
    if (!modalRef.current || (!modalRef.current.contains(event.target) && !isFilterButton)) {
      onClose();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => handleClickOutside(event);
    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);
  return (
    <div className="workspace-context-container flex" ref={modalRef}>
      <div className="workspace-wrapper flex column space-between">
        <div className="workspace-context-header">
          <div className="workspace-search flex">
            <input type="text" placeholder="Search for a workspace" />
            <button className="btn-icon small-transparent">
              <SearchIcon />
            </button>
          </div>
          <div className="workspace-options flex column">
            <div className="option">
              <button className="btn-icon small-transparent">
                <span className="flex align-center">
                  <FavoriteIcon />
                  Favorites
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="workspace-context-body flex column">
          <p>My workspaces</p>
          <div className="workspace-options flex column">
            <div className="option">
              <button className="btn-icon medium-transparent flex gap16">
                <span className="flex align-center">
                  <HomeIcon /> Sprint 4
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="work-space-btns flex space-between">
          <button className="btn-icon small-transparent flex gap8">
            <AddSmallIcon /> Add workspace
          </button>
          <button className="btn-icon small-transparent flex gap8">
            <WorkspaceIcon />
            Browse all
          </button>
        </div>
      </div>
    </div>
  )
}
