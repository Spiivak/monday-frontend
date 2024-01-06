import { useState } from 'react'
import { uploadService } from '../services/upload.service'
import { styled } from '@mui/material/styles'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
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

export function ImgUploader({ imgUrl, onUploaded = null, handleDeleteFile }) {
  const [imgData, setImgData] = useState({
    imgUrl,
    height: 500,
    width: 500,
  })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url)
  }
  function removeImg() {
    setImgData({ imgUrl: '' })
    handleDeleteFile()
  }

  return (
    <div className="upload-preview cell">
      {imgData.imgUrl && (
        <>
          <img src={imgData.imgUrl} style={{ maxWidth: '200px' }} />
          <IconButton onClick={removeImg} component="label" size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      )}
      {!imgData.imgUrl && (
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
    </div>
  )
}
