import { useEffect, useState } from 'react'
import { uploadService } from '../services/upload.service'
import { styled } from '@mui/material/styles'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import { CircularProgress } from '@mui/material'
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export function ImgUploader({ imgData, handleUpdateTaskFile = null }) {
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
      await handleUpdateTaskFile(undefined)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="upload-preview cell">
      {isLoading ? (
        <CircularProgress size="16px" />
      ) : (
        <>
          {imgData?.imgUrl ? (
            <>
              <img src={imgData.imgUrl} style={{ maxWidth: '200px' }} />
              <IconButton onClick={removeImg} component="label" size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <IconButton component="label" size="small">
              <UploadFileIcon />
              <VisuallyHiddenInput
                type="file"
                onChange={uploadImg}
                accept="img/*"
                id="imgUpload"
              />
            </IconButton>
          )}
        </>
      )}
    </div>
  )
}
