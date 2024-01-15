import { EmptyFilePreview } from './Workspace/board/groups/cells/cellsPreview/EmptyFilePreview'
import { FilePreview } from './Workspace/board/groups/cells/cellsPreview/FilePreview'
import { useState } from 'react'
import { uploadService } from '../services/upload.service'
import { CircularProgress } from '@mui/material'

export function ImgUploader({ id, imgData, handleUpdateTaskFile = null }) {
  const [isLoading, setIsLoading] = useState(false)

  async function uploadImg(ev) {
    try {
      setIsLoading(true)
      const { public_id, secure_url } = await uploadService.uploadImg(ev)
      const fileData = {
        publicId: public_id,
        imgUrl: secure_url,
      }
      await handleUpdateTaskFile?.(fileData)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  async function removeImg() {
    try {
      setIsLoading(true)
      await uploadService.destroyImg(imgData.publicId)
      await handleUpdateTaskFile?.(undefined)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div
      className="upload-preview  flex space-between"
      style={{ padding: '7px', height: '100%' }}
    >
      {isLoading ? (
        <CircularProgress size="16px" style={{ margin: 'auto' }} />
      ) : (
        <>
          {imgData?.imgUrl ? (
            <FilePreview
              uploadImg={uploadImg}
              imgData={imgData}
              removeImg={removeImg}
            />
          ) : (
            <EmptyFilePreview id={id} uploadImg={uploadImg} />
          )}
        </>
      )}
    </div>
  )
}
