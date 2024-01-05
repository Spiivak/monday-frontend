import { ImgUploader } from '../../ImgUploader'

export function FilePicker({ task, cmpId, handleUpdateTask }) {
  function handelUpdateFile(imgUrl) {
    handleUpdateTask('FilePicker', imgUrl, task)
  }
  return (
    <ImgUploader imgUrl={task['file' + cmpId]} onUploaded={handelUpdateFile} />
  )
}
