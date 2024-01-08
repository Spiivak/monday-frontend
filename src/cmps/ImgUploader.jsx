import { useState } from 'react'
import { uploadService } from '../services/upload.service'
import { styled } from '@mui/material/styles'
import { CloseSmallIcon } from './Icons'
import { IconButton } from '@mui/material'
import { CircularProgress } from '@mui/material'
import { ImageModal } from './Workspace/board/groups/cells/modals/ImageModal'
import { FileIcon } from './Icons'
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
    <div
      className="upload-preview cell flex space-between"
      style={{ padding: '7px' }}
    >
      {isLoading ? (
        <CircularProgress size="16px" style={{ margin: 'auto' }} />
      ) : (
        <>
          {imgData?.imgUrl ? (
            <>
              <IconButton
                sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                className="hidden-hover"
                component="label"
                size="small"
                style={{
                  padding: '0px',
                }}
              >
                <VisuallyHiddenInput
                  type="file"
                  onChange={uploadImg}
                  accept="img/*"
                  id="imgUpload"
                />
                <div
                  style={{ padding: '0px', margin: 'auto' }}
                  className="hidden-hover flex align-center"
                >
                  <button
                    className="hidden-hover btn-ctn small-primary flex "
                    style={{
                      padding: '0px',
                      borderRadius: '50%',
                      width: '14px',
                      height: '14px',
                    }}
                  >
                    +
                  </button>
                </div>
              </IconButton>
              <div className="image-preview flex align-center">
                <img
                  src={imgData.imgUrl}
                  onMouseEnter={() => setIsModalOpen(true)}
                />
                <div className="modal">
                  <ImageModal src={imgData} />
                </div>
              </div>
              <button
                onClick={removeImg}
                style={{ padding: '0px', borderRadius: '50%' }}
                className="hidden-hover btn-ctn small-sec flex"
              >
                <span className="flex align-center">
                  <CloseSmallIcon />
                </span>
              </button>
            </>
          ) : (
            <label
              style={{ width: '100%' }}
              className="flex justify-center relative hidden-hover"
              htmlFor="imgUpload"
            >
              <div style={{ position: 'absolute', top: '-37%' }}>
                <FileIcon className="relative flex justify-center " />
              </div>
              <button
                className="hidden-hover btn-ctn small-primary flex absolute"
                style={{
                  padding: '0px',
                  borderRadius: '50%',
                  width: '12px',
                  height: '12px',
                  right: '5%',
                  top: '15%',
                  translate: '0 40%',
                }}
              >
                +
                <VisuallyHiddenInput
                  type="file"
                  onChange={uploadImg}
                  accept="img/*"
                  id="imgUpload"
                />
              </button>
            </label>
          )}
        </>
      )}
    </div>
  )
}
