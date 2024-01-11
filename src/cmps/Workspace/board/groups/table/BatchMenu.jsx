import { useSelector } from "react-redux";
import { AppsIcon, ArchiveIcon, CloseIcon, DownloadIcon, DuplicateIcon, NavigationChevronRightIcon, RemoveIcon } from "../../../../Icons";
import { useState } from "react";

export function BatchMenu() {
  const selectedTask = useSelector((storeState) => storeState.boardModule.checkedTaskIds)



  if (selectedTask.length === 0) return
  return (
    <section className="batch-actions-menu flex justify-center">
      <div className="actions flex">
        <div className="display-selected flex align-center justify-center">
          <span>{selectedTask.length}</span>
        </div>
        <div className="title flex column">
          {selectedTask.length === 1 ? <span>Item Selected</span> : <span>Items Selected</span>}
          <div className="pulses-dots flex">
          {selectedTask.map((task, index) => (
              <div key={index} className="dot"></div>
            ))}
          </div>
        </div>
        <div className="actions-items flex">
          <div className="batch-actions-item flex align-center justify-center column">
            <DuplicateIcon />
            <span>Duplicate</span>
          </div>
          <div className="batch-actions-item flex align-center justify-center column">
            <DownloadIcon />
            <span>Export</span>
          </div>
          <div className="batch-actions-item flex align-center justify-center column">
            <ArchiveIcon />
            <span>Archive</span>
          </div>
          <div className="batch-actions-item flex align-center justify-center column">
            <RemoveIcon />
            <span>Delete</span>
          </div>
          <div className="batch-actions-item flex align-center justify-center column">
          <DownloadIcon />
            <span>Convert</span>
          </div>
          <div className="batch-actions-item flex align-center justify-center column">
            <NavigationChevronRightIcon />
            <span>Move to</span>
          </div>
          <div className="batch-actions-item flex align-center justify-center column">
            <AppsIcon />
            <span>Apps</span>
          </div>
        </div>
        <div className="batch-actions-delete-item flex align-center justify-center">
          <CloseIcon />
        </div>
      </div>
    </section>
  )
}
