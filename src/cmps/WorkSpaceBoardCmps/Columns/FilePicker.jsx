import { ImgUploader } from '../../ImgUploader'

export function FilePicker({ task, cmpId, handleUpdateTask }) {
  function handelUpdateFile(fileData) {
    handleUpdateTask('FilePicker', fileData, task)
  }
  return (
    <ImgUploader
      imgData={task['file' + cmpId]}
      handleUpdateTaskFile={handelUpdateFile}
    />
  )
}
