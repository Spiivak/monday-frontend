import React from 'react'
import emptyState from '../../../../../../assets/img/empty-state.svg'

export default function FilesPreview({ activeTask, activeBoard }) {
  if (!activeTask && !activeBoard) return
  const fileKeys = activeTask
    ? Object.values(activeTask)
        .filter((key) => key && key.imgUrl !== undefined)
        .map((key) => key.imgUrl)
    : activeBoard.groups.flatMap((group) =>
        group.tasks.flatMap((task) =>
          Object.values(task)
            .filter((key) => key && key.imgUrl !== undefined)
            .map((key) => key.imgUrl)
        )
      )

  const imgUrls = fileKeys

  return (
    <div
      className={`files-preview-tab ${
        imgUrls.length > 0 ? '' : 'flex justify-center align-center'
      }`}
    >
      {imgUrls.length > 0 ? (
        <>
          <div className="gallery flex gap16">
            {imgUrls.map((img, index) => (
              <img
                style={{ objectFit: 'cover', objectPosition: '0% 70%' }}
                key={index}
                src={img}
                alt={`Image ${index}`}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state flex column align-center justify-center text-center">
          <img src={emptyState} alt="" />
          <p>
            <b>Drag & drop</b> or <b>add files here</b>
          </p>
          <p>
            Upload, comment and review all files in this item to easily
            collaborate in context
          </p>
        </div>
      )}
    </div>
  )
}
