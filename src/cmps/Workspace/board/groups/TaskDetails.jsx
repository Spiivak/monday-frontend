// Example taskModal.jsx
import { useEffect, useRef } from 'react'
import { AddIcon, CloseSmallIcon, HomeIcon, MenuIcon } from '../../../Icons'
import Frame from '../../../../assets/img/Frame.png'
import { useSelector } from 'react-redux'
import { deactivateTask } from '../../../../store/actions/board.actions'
import { ActivityLogPreview } from './cells/cellsPreview/ActivityLogPreview'

export function TaskDetails() {
  const activeTask = useSelector(
    (storeState) => storeState.boardModule.activeTask
  )
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

  if (!activeTask) return
  return (
    <div className="task-details-modal" ref={modalRef}>
      {/* CLOSE BUTTON */}
      <button
        className="btn-icon small-transparent"
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
          <div className="tabs flex gap16">
            <div className="tab-container">
              <div className="tab-label flex gap8 align-center">
                <HomeIcon />
                <span>Updates</span>
                <span className="underline-active"></span>
              </div>
            </div>
            <div className="tab-container">
              <div className="tab-label">
                <span>Files</span>
                <span className="underline-active"></span>
              </div>
            </div>
            <div className="tab-container">
              <div className="tab-label">
                <span>Activity Log</span>
                <span className="underline-active"></span>
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
      <ActivityLogPreview />
    </div>
  )
}
