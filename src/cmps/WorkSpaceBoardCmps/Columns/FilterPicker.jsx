import { ImgUploader } from "../../ImgUploader"

export function FilePicker({ task, handleUpdateTask }) {
  function handelUpdateFile(imgUrl) {
    handleUpdateTask("FilePicker", imgUrl, task)
  }
  return <ImgUploader imgUrl={task.file} onUploaded={handelUpdateFile} />
}