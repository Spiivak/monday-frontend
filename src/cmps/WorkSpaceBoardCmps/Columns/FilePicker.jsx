import { ImgUploader } from '../../ImgUploader'

export function FilePicker({ task, cmpId, handleUpdateTask }) {
  function handelUpdateFile(imgUrl) {
    handleUpdateTask('FilePicker', imgUrl, task)
  }
  function handleDeleteFile() {
    handleUpdateTask('FilePicker', '', task)
  }
  return (
    <ImgUploader
      imgUrl={task['file' + cmpId]}
      onUploaded={handelUpdateFile}
      handleDeleteFile={handleDeleteFile}
    />
  )
}
