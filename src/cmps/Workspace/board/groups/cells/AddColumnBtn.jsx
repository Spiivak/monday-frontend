import { Add, Description, Save, UploadFile } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import {
  AddIcon,
  AddSmallIcon,
  ArchiveIcon,
  CollapseIcon,
  ColorCol,
  DateCol,
  DeleteIcon,
  EditIcon,
  FileIcon,
  LinkCol,
  LinkIcon,
  NumbersCol,
  PeopleCol,
  SettingsIcon,
  SwitchIcon,
  TimelineCol,
} from '../../../../Icons'

export default function AddColumnBtn({onAddColumn}) {
  const menuBtnRef = useRef()
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false)

  function openMoreModal() {
    setIsMoreModalOpen((isOpen) => !isOpen)
  }
  return (
    <div className="flex align-center relative">
      <button
      style={{ marginLeft: '16px'}}
        ref={menuBtnRef}
        className="btn-icon small-transparent flex align-center"
        onClick={(ev) => {
          ev.stopPropagation()
          openMoreModal()
        }}>
        <AddIcon />
      </button>
      {isMoreModalOpen && (
        <AddModal
          setIsMoreModalOpen={setIsMoreModalOpen}
          menuBtnRef={menuBtnRef}
          onAddColumn={onAddColumn}
        />
      )}
    </div>
  )
}

function AddModal({ setIsMoreModalOpen, menuBtnRef,onAddColumn }) {
  const modalRef = useRef()

  useEffect(() => {
    // Add event listener to close modal when clicking outside
    const handleOutsideClick = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(event.target)
      ) {
        setIsMoreModalOpen(false)
      }
    }

    // Add event listener to the document body
    document.body.addEventListener('click', handleOutsideClick)

    // Remove event listener on component unmount
    return () => {
      document.body.removeEventListener('click', handleOutsideClick)
    }
  }, [setIsMoreModalOpen])
  return (
    <div className="add-modal-container flex column" ref={modalRef}>
      <div className="ds-tabs-section">
        <div className="tab flex column gap8">
          <form className='flex justify-center' onSubmit={()=>{}}>
            <input type="text" name="" id="" placeholder='search' />
          </form>
          <div className="flex">
            <p>Essentials</p>
          </div>
          <div className="btn-group grid c2">
            <button className="gc1 btn-icon medium-transparent flex gap16" onClick={()=>onAddColumn('numbers')}>
              <div className="icon-wrapper numbers-col-wrapper flex align-center justify-center">
                <NumbersCol />
              </div>
              Numbers
            </button>
            <button className="btn-icon medium-transparent flex gap16" onClick={()=>onAddColumn('timeline')}>
              <div className="icon-wrapper timeline-col-wrapper flex align-center justify-center">
                <TimelineCol />
              </div>
              Timeline
            </button>
          </div>
          <div className="btn-group grid c2">
            <button className="gc1 btn-icon medium-transparent flex gap16" onClick={()=>onAddColumn('people')}>
              <div className="icon-wrapper people-col-wrapper flex align-center justify-center">
                <PeopleCol />
              </div>
              People
            </button>
            <button className="btn-icon medium-transparent flex gap16" onClick={()=>onAddColumn('date')}>
              <div className="icon-wrapper date-col-wrapper flex align-center justify-center">
                <DateCol />
              </div>
              Date
            </button>
          </div>
          <div className="btn-group grid c2">
            <button className="gc1 btn-icon medium-transparent flex gap16" onClick={()=>onAddColumn('status')}>
              <div className="icon-wrapper color-col-wrapper flex align-center justify-center">
                <ColorCol />
              </div>
              Status
            </button>
            <button className="btn-icon medium-transparent flex gap16" onClick={()=>onAddColumn('file')}>
              <div className="icon-wrapper link-col-wrapper flex align-center justify-center">
                <UploadFile style={{color:'#eee'}} />
              </div>
              File
            </button>
          </div>
          <div className="btn-group grid c2">
            <button className="gc1 btn-icon medium-transparent flex gap16" onClick={()=>onAddColumn('description')}>
              <div className="icon-wrapper color-col-wrapper flex align-center justify-center">
                <Description style={{color: '#eee'}} />
              </div>
              Status
            </button>
            <button disabled className="btn-icon medium-transparent flex gap16" onClick={()=>onAddColumn('file')}>
              <div className="icon-wrapper link-col-wrapper flex align-center justify-center">
                <LinkIcon />
              </div>
              Link
            </button>
          </div>
        </div>
      </div>
      <div className="ds-divider"></div>
      <div className="ds-tabs-section">
        <div className="tab flex column">
          <button className="btn-icon medium-transparent flex gap16">
            <DeleteIcon />
            Delete
          </button>
        </div>
        <div className="tab flex column">
          <button className="btn-icon medium-transparent flex gap16">
            <ArchiveIcon />
            Archive
          </button>
        </div>
      </div>
    </div>
  )
}
