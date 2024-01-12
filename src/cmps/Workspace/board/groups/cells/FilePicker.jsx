import { ImgUploader } from '../../../../ImgUploader'

export function FilePicker({ task, cmpId, handleUpdateTask }) {
  function handelUpdateFile(fileData) {
    handleUpdateTask('FilePicker', fileData, task)
  }
  return (
    <div
      className="cell file-picker-cell hoverable"
      style={{ display: 'block' }}
    >
      <ImgUploader
        imgData={task['file' + cmpId]}
        handleUpdateTaskFile={handelUpdateFile}
        id={task.id}
      />
    </div>
  )
}
