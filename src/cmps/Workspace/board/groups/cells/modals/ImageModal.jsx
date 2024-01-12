import { useEffect, useRef } from 'react'
import {
  AddSmallIcon,
  ArchiveIcon,
  CollapseIcon,
  DeleteIcon,
  EditIcon,
  MwmIcon,
  SettingsIcon,
  SwitchIcon,
  TimeIcon,
} from '../../../../../Icons'
import { Save } from '@mui/icons-material'
export function ImageModal({ src }) {
  const modalRef = useRef()

  const handleClickOutside = (event) => {
    const isFilterButton = event.target.closest('[data-more-button="true"]')
    if (
      !modalRef.current ||
      (!modalRef.current.contains(event.target) && !isFilterButton)
    ) {
      // onClose();
    }
  }

  console.log(src)
  useEffect(() => {
    const handleOutsideClick = (event) => handleClickOutside(event)
    window.addEventListener('mousedown', handleOutsideClick)

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  if (!src) return
  return (
    <div
      className="image-modal flex column align-center space-between"
      ref={modalRef}>
      <img src={src.imgUrl} alt="" />

      <div className="img-bottom flex space-between align-center gap16">
        <span>{src.publicId}</span>
        <TimeIcon />
      </div>
    </div>
  )
}
