import { ImgUploaderWithoutImg } from './ImgUploaderWithoutImg'
import { ImgUploaderWithImg } from './ImgUploaderWithImg'
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
      className="upload-preview cell flex space-between"
      style={{ padding: '7px' }}>
      {isLoading ? (
        <CircularProgress size="16px" style={{ margin: 'auto' }} />
      ) : (
        <>
          {imgData?.imgUrl ? (
            <ImgUploaderWithImg
              uploadImg={uploadImg}
              imgData={imgData}
              removeImg={removeImg}
            />
          ) : (
            <ImgUploaderWithoutImg id={id} uploadImg={uploadImg} />
          )}
        </>
      )}
    </div>
  )
}
