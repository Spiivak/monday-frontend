import {
  ColorCol,
  DateCol,
  LinkIcon,
  NumbersCol,
  PeopleCol,
  TimelineCol,
} from '../../../Icons'
import { Description, UploadFile } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import { deactivateContextBtn } from '../../../../store/actions/board.actions'
export function AddModal({ onAddColumn, setIsMoreModalOpen, menuBtnRef }) {
  const modalRef = useRef()

  // State for position
  const [position, setPosition] = useState()
  const [modal, setModal] = useState()

  useEffect(() => {
    const handleResize = (event) => {
      // Your logic for calculating newLeft and newTop
      const { innerWidth, innerHeight } = window
      const { y, x, height, width } = menuBtnRef.getBoundingClientRect()
      let newLeft, newTop
      // var scrollLeft = event.window.scrollX || event.window.pageXOffset;
      if (x < 0) {
        newLeft = undefined
        newTop = undefined
      } else if (x > innerWidth / 2) {
        newLeft = x - 280 + width / 2
      } else {
        newLeft = x + width / 2
      }

      if (x < 0) {
        newLeft = undefined
        newTop = undefined
      } else if (y > innerHeight / 2) {
        newTop = y - 400 + height - 6
      } else {
        newTop = y + height + 6
      }

      // Update the state with the new position
      setPosition({ top: newTop, left: newLeft })
    }

    const handleOutsideClick = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        menuBtnRef &&
        !menuBtnRef.contains(event.target)
      ) {
        deactivateContextBtn()
      }
    } // Add event listener to the document body

    const handleWheel = (event) => {
      if (modalRef.current && position) {
        event.preventDefault() // Prevent default wheel behavior when the modal is open
      }
    }

    // Initial setup
    handleResize()

    // Event listeners
    window.addEventListener('click', handleOutsideClick)
    window.addEventListener('resize', handleResize)
    window.addEventListener('wheel', handleWheel)
    // Cleanup
    return () => {
      window.removeEventListener('click', handleOutsideClick)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [menuBtnRef])

  function clickAddColumn(type) {
    deactivateContextBtn()
    onAddColumn(type)
  }

  if (!position) return

  return (
    <div
      className="add-modal-container flex column"
      ref={modalRef}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 1000,
      }}
    >
      <div className="ds-tabs-section">
        <div className="tab flex column gap8">
          <form className="flex justify-center" onSubmit={() => {}}>
            <input type="text" name="" id="" placeholder="search" />
          </form>
          <div className="flex">
            <p>Essentials</p>
          </div>
          <div className="btn-group grid c2">
            <button
              className="gc1 btn-icon medium-transparent flex gap16"
              onClick={() => clickAddColumn('numbers')}
            >
              <div className="icon-wrapper numbers-col-wrapper flex align-center justify-center">
                <NumbersCol />
              </div>
              Numbers
            </button>
            <button
              className="btn-icon medium-transparent flex gap16"
              onClick={() => clickAddColumn('timeline')}
            >
              <div className="icon-wrapper timeline-col-wrapper flex align-center justify-center">
                <TimelineCol />
              </div>
              Timeline
            </button>
          </div>
          <div className="btn-group grid c2">
            <button
              className="gc1 btn-icon medium-transparent flex gap16"
              onClick={() => clickAddColumn('people')}
            >
              <div className="icon-wrapper people-col-wrapper flex align-center justify-center">
                <PeopleCol />
              </div>
              People
            </button>
            <button
              className="btn-icon medium-transparent flex gap16"
              onClick={() => clickAddColumn('date')}
            >
              <div className="icon-wrapper date-col-wrapper flex align-center justify-center">
                <DateCol />
              </div>
              Date
            </button>
          </div>
          <div className="btn-group grid c2">
            <button
              className="gc1 btn-icon medium-transparent flex gap16"
              onClick={() => clickAddColumn('status')}
            >
              <div className="icon-wrapper color-col-wrapper flex align-center justify-center">
                <ColorCol />
              </div>
              Status
            </button>
            <button
              className="btn-icon medium-transparent flex gap16"
              onClick={() => clickAddColumn('file')}
            >
              <div className="icon-wrapper link-col-wrapper flex align-center justify-center">
                <UploadFile style={{ color: '#eee' }} />
              </div>
              File
            </button>
          </div>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="btn-group grid c2">
          <button
            className="gc1 btn-icon medium-transparent flex gap16"
            onClick={() => clickAddColumn('description')}
          >
            <div className="icon-wrapper color-col-wrapper flex align-center justify-center">
              <Description style={{ color: '#eee' }} />
            </div>
            Description
          </button>
          <button
            disabled
            className="btn-icon medium-transparent flex gap16"
            onClick={() => clickAddColumn('file')}
          >
            <div className="icon-wrapper link-col-wrapper flex align-center justify-center">
              <div className="icon-wrapper link-col-wrapper">
                <LinkIcon />
              </div>
            </div>
            Link
          </button>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab flex column">
          <button className="btn-icon medium-transparent flex gap16">
            Collapse all folders
          </button>
        </div>
      </div>
    </div>
  )
}
