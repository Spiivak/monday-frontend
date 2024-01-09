import React from 'react'
import { styled } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import { ImageModal } from './Workspace/board/groups/cells/modals/ImageModal'
import { CloseSmallIcon } from './Icons'
export function ImgUploaderWithImg({ uploadImg, imgData, removeImg }) {
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
  return (
    <>
      <IconButton
        sx={{
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        className="test1"
        component="label"
        size="small"
        style={{
          padding: '0px',
        }}>
        <VisuallyHiddenInput
          type="file"
          onChange={uploadImg}
          accept="img/*"
          id="imgUpload"
        />
        <div
          style={{
            padding: '0px',
            margin: 'auto',
          }}
          className=" flex align-center">
          <button
            className="btn-ctn small-primary flex "
            style={{
              padding: '0px',
              borderRadius: '50%',
              width: '14px',
              height: '14px',
            }}>
            +
          </button>
        </div>
      </IconButton>
      <div className="image-preview flex align-center">
        <img src={imgData.imgUrl} />
        <div className="modal">
          <ImageModal src={imgData} />
        </div>
      </div>
      <button
        onClick={removeImg}
        style={{
          padding: '0px',
          borderRadius: '50%',
        }}
        className="test4 btn-ctn small-sec flex">
        <span className="flex align-center">
          <CloseSmallIcon />
        </span>
      </button>
    </>
  )
}
