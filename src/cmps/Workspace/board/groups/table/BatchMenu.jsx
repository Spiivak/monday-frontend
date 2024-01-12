import { useSelector } from "react-redux";
import { AppsIcon, ArchiveIcon, CloseIcon, DeleteIcon, DownloadIcon, DuplicateIcon, NavigationChevronRightIcon, RemoveIcon } from "../../../../Icons";
import { useState } from "react";
import { removeAllTasks, resetSelectedTasks } from "../../../../../store/actions/board.actions";

export function BatchMenu() {
  const checkedTaskIds = useSelector((storeState) => storeState.boardModule.checkedTaskIds)
  console.log('BatchMenu  checkedTaskIds:', checkedTaskIds)

  if (checkedTaskIds.length === 0) return
  return (
    <section className="batch-actions-menu flex justify-center">
      <div className="actions flex">
        <div className="display-selected flex align-center justify-center">
          <span>{checkedTaskIds.length}</span>
        </div>
        <div className="title flex column">
          {checkedTaskIds.length === 1 ? <span>Item Selected</span> : <span>Items Selected</span>}
          <div className="pulses-dots flex">
          {checkedTaskIds.map((task, index) => (
              <div key={index} className="dot"></div>
            ))}
          </div>
        </div>
        <div className="actions-items flex">
          {/* <div className="batch-actions-item flex align-center justify-center column">
            <DuplicateIcon />
            <span>Duplicate</span>
          </div> */}
          {/* <div className="batch-actions-item flex align-center justify-center column">
            <DownloadIcon />
            <span>Export</span>
          </div> */}
          {/* <div className="batch-actions-item flex align-center justify-center column">
            <ArchiveIcon />
            <span>Archive</span>
          </div> */}
          <div className="batch-actions-item flex align-center justify-center column" onClick={() => removeAllTasks(checkedTaskIds)}>
            <DeleteIcon />
            <span>Delete</span>
          </div>
          {/* <div className="batch-actions-item flex align-center justify-center column">
          <DownloadIcon />
            <span>Convert</span>
          </div> */}
          {/* <div className="batch-actions-item flex align-center justify-center column">
            <NavigationChevronRightIcon />
            <span>Move to</span>
          </div> */}
        </div>
        <div className="batch-actions-delete-item flex align-center justify-center" onClick={() => resetSelectedTasks()}>
          <CloseIcon />
        </div>
      </div>
    </section>
  )
}
