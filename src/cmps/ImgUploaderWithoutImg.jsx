import React from 'react'
import { FileIcon } from './Icons'
import { styled } from '@mui/material/styles'
export function ImgUploaderWithoutImg({ id, uploadImg }) {
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
    <label
      style={{
        width: '100%',
      }}
      className="flex justify-center relative test5"
      htmlFor={id}>
      <div
        style={{
          position: 'absolute',
          top: '-37%',
        }}>
        <FileIcon className="relative flex justify-center " />
      </div>
      <button
        className="btn-ctn small-primary flex absolute"
        style={{
          padding: '0px',
          borderRadius: '50%',
          width: '12px',
          height: '12px',
          right: '5%',
          top: '15%',
          translate: '0 40%',
        }}>
        +
        <VisuallyHiddenInput
          type="file"
          onChange={uploadImg}
          accept="img/*"
          id={id}
        />
      </button>
    </label>
  )
}
