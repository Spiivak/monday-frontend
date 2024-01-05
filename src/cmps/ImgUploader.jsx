import { useState } from "react"
import { uploadService } from "../services/upload.service"
import { styled } from "@mui/material/styles"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import UploadFileIcon from "@mui/icons-material/UploadFile"
import { IconButton } from "@mui/material"
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

export function ImgUploader({ imgUrl, onUploaded = null }) {
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

  return (
    <div className="upload-preview cell">
      {imgData.imgUrl && (
        <img src={imgData.imgUrl} style={{ maxWidth: "200px" }} />
      )}
      <IconButton
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        size="small"
      >
        <UploadFileIcon />
        <VisuallyHiddenInput
          type="file"
          onChange={uploadImg}
          accept="img/*"
          id="imgUpload"
        />
      </IconButton>
    </div>
  )
}
