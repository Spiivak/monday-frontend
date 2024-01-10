// Example taskModal.jsx
import { useEffect, useRef, useState } from 'react'
import { AddIcon, CloseSmallIcon, HomeIcon, MenuIcon } from '../../../Icons'
import Frame from '../../../../assets/img/Frame.png'
import { useSelector } from 'react-redux'
import { deactivateTask } from '../../../../store/actions/board.actions'
import { ActivityLogPreview } from './cells/cellsPreview/ActivityLogPreview'
import emptyState from '../../../../assets/img/empty-state.svg'

export function TaskDetails() {
  const activeTask = useSelector(
    (storeState) => storeState.boardModule.activeTask
  )

  const [activeTab, setActiveTab] = useState('activityLog'); // Default to 'updates'

  const modalRef = useRef()

  const handleClickOutside = (event) => {
    const isTaskDetailsButton = event.target.closest(
      '[data-task-details="true"]'
    )
    if (
      !modalRef.current ||
      (!modalRef.current.contains(event.target) && !isTaskDetailsButton)
    ) {
      deactivateTask()
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event) => handleClickOutside(event)
    window.addEventListener('mousedown', handleOutsideClick)

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  if (!activeTask) return
  return (
    <div className="task-details-modal" ref={modalRef}>
      {/* CLOSE BUTTON */}
      <button
        className="btn-icon small-transparent btn-close"
        onClick={() => deactivateTask()}
      >
        <CloseSmallIcon />
      </button>
      {/* TASK HEADER */}
      <div className="task-header flex align-center space-between">
        <div className="task-title">
          <span>{activeTask.title}</span>
        </div>
        <div className="header-actions flex align-center">
          <div className="members-list flex align-center">
            <picture className="flex">
              <img src={Frame} alt="" />
            </picture>
            <picture className="flex">
              <img src={Frame} alt="" />
            </picture>
          </div>
          <div className="more-btn">
            <button className="btn-icon medium-transparent">
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="task-header-tabs flex space-between">
        <div className="task-tabs quick-filters">
          <div className="tabs">
            <div className={`tab-container flex gap16`} onClick={() => handleTabChange('updates')}>
              <div className="tab-label flex gap8 align-center btn-txt medium-sec">
                <HomeIcon />
                <div className="tab">
                  <span>Updates</span>
                  <span className={activeTab === 'updates' ? "underline-active" : ''}></span>
                </div>
              </div>
            </div>
            <div className={`tab-container`} onClick={() => handleTabChange('files')}>
              <div className="tab-label btn-txt medium-sec">
                <span>Files</span>
                {activeTab === 'files' && <span className={activeTab === 'files' ? "underline-active" : ''}></span>}
              </div>
            </div>
            <div className={`tab-container`} onClick={() => handleTabChange('activityLog')}>
              <div className="tab-label btn-txt medium-sec">
                <span>Activity Log</span>
                {activeTab === 'activityLog' && <span className={activeTab === 'activityLog' ? "underline-active" : ''}></span>}
              </div>
            </div>
          </div>
        </div>
        <div className="add-view flex align-center">
          <button className="btn-icon small-transparent">
            <AddIcon />
          </button>
        </div>
      </div>

      {activeTab === 'updates' && (
        <div>
          <h2>No updates yet for this item</h2>
          <p>Be the first one to update about progress, mention someone</p>
          <p>or upload files to share with your team members</p>
        </div>
      )}

      {activeTab === 'files' && (
        <div>
          <img src={emptyState} alt="" />
          <p><b>Drag & drop</b> or <b>add files here</b></p>
          <p>Upload, comment and review all files in this item to easily collaborate in context</p>
        </div>
      )}

      {activeTab === 'activityLog' && (
        <ActivityLogPreview />
      )}
    </div>
  );
}