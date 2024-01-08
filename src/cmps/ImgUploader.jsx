import { useState } from 'react'
import { uploadService } from '../services/upload.service'
import { styled } from '@mui/material/styles'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import { CircularProgress } from '@mui/material'
import { ImageModal } from './Workspace/board/groups/cells/modals/ImageModal'
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
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    <div className="upload-preview cell" style={{ padding: '7px' }}>
      {isLoading ? (
        <CircularProgress size="16px" />
      ) : (
        <>
          {imgData?.imgUrl ? (
            <>
              <IconButton
                component="label"
                size="small"
                style={{ padding: '0px' }}
              >
                <UploadFileIcon fontSize="small" />
                <VisuallyHiddenInput
                  type="file"
                  onChange={uploadImg}
                  accept="img/*"
                  id="imgUpload"
                />
              </IconButton>
              <div className="image-preview flex align-center">
                <img
                  src={imgData.imgUrl}
                  onMouseEnter={() => setIsModalOpen(true)}
                  // onMouseLeave={() => setIsModalOpen(false)}
                />
                <div className="modal">
                  <ImageModal src={imgData} />
                </div>
              </div>
              <IconButton
                onClick={removeImg}
                component="label"
                size="small"
                style={{ padding: '0px' }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <IconButton
              component="label"
              size="small"
              style={{ padding: '0px' }}
            >
              <UploadFileIcon fontSize="small" />
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
