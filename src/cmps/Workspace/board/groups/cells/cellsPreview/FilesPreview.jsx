import React from 'react';
import emptyState from '../../../../../../assets/img/empty-state.svg';

export default function FilesPreview({ activeTask, activeBoard }) {

  if(!activeTask) return
  const fileKeys = Object.keys(activeTask).filter(key => key.startsWith('file'))

  const fileValues = fileKeys.map(key => activeTask[key])
  const imgUrls = fileValues.map(file => file.imgUrl)

  return (
    <div className={`files-preview-tab ${imgUrls.length > 0 ? '' : 'flex justify-center align-center'}`}>

      {imgUrls.length > 0 ? (
        <>
          {/* <div className="files-header">
            <button className='btn-outline medium-secondery'>Add file</button>
          </div> */}
          <div className="gallery">
            {imgUrls.map((img, index) => (
              <img key={index} src={img} alt={`Image ${index}`} />
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
  );
}
