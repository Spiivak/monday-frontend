import { useEffect, useRef, useState } from "react"
import { AppsIcon, BoardIcon, BoardTemplateIcon, CheckboxIcon, DashboardIcon, DocIcon, FormIcon, UploadIcon } from "../../../Icons"
import { boardService } from "../../../../services/board.service"
import { saveBoard } from "../../../../store/actions/board.actions"
import { useNavigate } from "react-router"

export function AddBoardModal({ onClose, SetAddModalOpen }) {
  const modalRef = useRef()
  const [isModalOpen, setModalOpen] = useState(false)

  const handleToggleModal = () => {
    setModalOpen(!isModalOpen)
  }



  const handleClickOutside = (event) => {
    if (!modalRef.current.contains(event.target)) {
      onClose()
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('mousedown', handleClickOutside)
    } else {
      window.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isModalOpen, onClose])
  return (
    <>
      <div className="add-board-modal flex gap8" ref={modalRef}>

        <button data-addnewboard-button="true" className="flex btn-icon medium-transparent gap8" onClick={() => handleToggleModal()}><BoardIcon />New Board</button>
        <button disabled className="flex btn-icon medium-transparent gap8"><DocIcon /> New Doc</button>
        <button disabled className="flex btn-icon medium-transparent gap8"><DashboardIcon />New Dashboard</button>
        <button disabled className="flex btn-icon medium-transparent gap8"><BoardTemplateIcon /> Choose from templates</button>
        <button disabled className="flex btn-icon medium-transparent gap8"><UploadIcon />Import data</button>
        <div className="divider"></div>
        <button disabled className="flex btn-icon medium-transparent gap8"><AppsIcon /> Apps</button>
        <button disabled className="flex btn-icon medium-transparent gap8"><FormIcon /> New Form</button>
        <div className="divider"></div>
        <button disabled className="flex btn-icon medium-transparent gap8"><CheckboxIcon /> New Folder</button>
      </div>
      {isModalOpen && <OnAddBoardModal setModalOpen={setModalOpen} modalRef={modalRef} SetAddModalOpen={SetAddModalOpen}/>}
    </>
  )
}




export function OnAddBoardModal({ setModalOpen, modalRef, SetAddModalOpen }) {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [option, setOption] = useState('Items')
  console.log('OnAddBoardModal  option:', option)

  const handleOptionChange = (event) => {
    setOption(event.target.value)
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break
      case 'checkbox':
        value = target.checked
        break
      default:
        break
    }
    setTitle(value)
  }
  async function onAddBoard() {
    if (!title) return
    try {
      const newBoard = await boardService.getEmptyBoard()
      newBoard.title = title
      newBoard.option = option
      await saveBoard(newBoard)
      navigate(`/workspace/${newBoard._id}`)
    } catch (err) {
      console.error('Cannot add board', err)
    }
  }
  const handleCancel = () => {
    setModalOpen(false)
    SetAddModalOpen(false)
  }

  const handleCreateBoard = () => {
    if (!title) return
    onAddBoard(title)
    SetAddModalOpen(false)
    setModalOpen(false)
  }

  return (
    <>
      <div className="overlay" onClick={handleCancel}></div>
      <div className="create-board-modal" ref={modalRef}>
        <div className="modal-content">
          <span>Create board</span>
          <div className="board-input">
            <label htmlFor="title">Board name</label>
            <input type="text" name="title" onChange={handleChange} />
          </div>
          <div className="select-type-board">
            <div className="divider"></div>
            <h3>Select what you're managing in this board</h3>
            <div className="type-list">
              <label className="select-label">
                <input
                  type="radio"
                  value="Items"
                  checked={option === 'Items'}
                  onChange={handleOptionChange}
                />
                Items
              </label>

              <label>
                <input
                  type="radio"
                  value="Budget"
                  checked={option === 'Budget'}
                  onChange={handleOptionChange}
                />
                Budget
              </label>

              <label>
                <input
                  type="radio"
                  value="Employees"
                  checked={option === 'Employees'}
                  onChange={handleOptionChange}
                />
                Employees
              </label>

              <label>
                <input
                  type="radio"
                  value="Campaigns"
                  checked={option === 'Campaigns'}
                  onChange={handleOptionChange}
                />
                Campaigns
              </label>

              <label>
                <input
                  type="radio"
                  value="Leads"
                  checked={option === 'Leads'}
                  onChange={handleOptionChange}
                />
                Leads
              </label>

              <label>
                <input
                  type="radio"
                  value="Projects"
                  checked={option === 'Projects'}
                  onChange={handleOptionChange}
                />
                Projects
              </label>

              <label>
                <input
                  type="radio"
                  value="Creatives"
                  checked={option === 'Creatives'}
                  onChange={handleOptionChange}
                />
                Creatives
              </label>

              <label>
                <input
                  type="radio"
                  value="Clients"
                  checked={option === 'Clients'}
                  onChange={handleOptionChange}
                />
                Clients
              </label>

              <label>
                <input
                  type="radio"
                  value="Tasks"
                  checked={option === 'Tasks'}
                  onChange={handleOptionChange}
                />
                Tasks
              </label>

              <label>
                <input
                  type="radio"
                  value="Custom"
                  checked={option === 'Custom'}
                  onChange={handleOptionChange}
                />
                Custom
              </label>

              {option === 'Custom' && (
                <input
                  type="text"
                  placeholder="Enter custom text"
                  value={option}
                  onChange={handleOptionChange}
                />
              )}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-txt medium-sec" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn-ctn medium-primary" onClick={handleCreateBoard}>
            Create Board
          </button>
          </div>
      </div>
    </>
  )
}
