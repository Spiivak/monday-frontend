import { useEffect, useRef, useState } from 'react'
import {
  AppsIcon,
  BoardIcon,
  BoardTemplateIcon,
  CheckboxIcon,
  DashboardIcon,
  DocIcon,
  FormIcon,
  UploadIcon,
} from '../../../Icons'
import { boardService } from '../../../../services/board.service'
import { saveBoard } from '../../../../store/actions/board.actions'
import { useNavigate } from 'react-router'

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
        <button
          data-addnewboard-button="true"
          className="flex btn-icon medium-transparent gap8"
          onClick={() => handleToggleModal()}
        >
          <BoardIcon />
          New Board
        </button>
        <button disabled className="flex btn-icon medium-transparent gap8">
          <DocIcon /> New Doc
        </button>
        <button disabled className="flex btn-icon medium-transparent gap8">
          <DashboardIcon />
          New Dashboard
        </button>
        <button disabled className="flex btn-icon medium-transparent gap8">
          <BoardTemplateIcon /> Choose from templates
        </button>
        <button disabled className="flex btn-icon medium-transparent gap8">
          <UploadIcon />
          Import data
        </button>
        <div className="divider"></div>
        <button disabled className="flex btn-icon medium-transparent gap8">
          <AppsIcon /> Apps
        </button>
        <button disabled className="flex btn-icon medium-transparent gap8">
          <FormIcon /> New Form
        </button>
        <div className="divider"></div>
        <button disabled className="flex btn-icon medium-transparent gap8">
          <CheckboxIcon /> New Folder
        </button>
      </div>
      {isModalOpen && (
        <OnAddBoardModal
          setModalOpen={setModalOpen}
          modalRef={modalRef}
          SetAddModalOpen={SetAddModalOpen}
        />
      )}
    </>
  )
}

export function OnAddBoardModal({ setModalOpen, modalRef, SetAddModalOpen }) {
  const [selectedOption, setSelectedOption] = useState('Items')
  const [title, setTitle] = useState('')
  const navigate = useNavigate()

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
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
  async function onAddBoard(title) {
    if (!title) return
    try {
      const newBoard = await boardService.getEmptyBoard()
      newBoard.title = title
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
          <div className="board-privacy">
            <span>Privacy</span>
            <label htmlFor="main">
              <input
                type="radio"
                value="main"
                checked={selectedOption === 'Main'}
                onChange={handleOptionChange}
              />
              Main
            </label>
            <p>Visible to everyone ine your account</p>
          </div>
          <div className="select-type-board">
            <div className="divider"></div>
            <h3>Select what you're managing in this board</h3>
            <div className="type-list">
              <label className="select-label">
                <input
                  type="radio"
                  value="Items"
                  checked={selectedOption === 'Items'}
                  onChange={handleOptionChange}
                />
                Items
              </label>

              <label>
                <input
                  type="radio"
                  value="Budget"
                  checked={selectedOption === 'Budget'}
                  onChange={handleOptionChange}
                />
                Budget
              </label>

              <label>
                <input
                  type="radio"
                  value="Employees"
                  checked={selectedOption === 'Employees'}
                  onChange={handleOptionChange}
                />
                Employees
              </label>

              <label>
                <input
                  type="radio"
                  value="Campaigns"
                  checked={selectedOption === 'Campaigns'}
                  onChange={handleOptionChange}
                />
                Campaigns
              </label>

              <label>
                <input
                  type="radio"
                  value="Leads"
                  checked={selectedOption === 'Leads'}
                  onChange={handleOptionChange}
                />
                Leads
              </label>

              <label>
                <input
                  type="radio"
                  value="Projects"
                  checked={selectedOption === 'Projects'}
                  onChange={handleOptionChange}
                />
                Projects
              </label>

              <label>
                <input
                  type="radio"
                  value="Creatives"
                  checked={selectedOption === 'Creatives'}
                  onChange={handleOptionChange}
                />
                Creatives
              </label>

              <label>
                <input
                  type="radio"
                  value="Clients"
                  checked={selectedOption === 'Clients'}
                  onChange={handleOptionChange}
                />
                Clients
              </label>

              <label>
                <input
                  type="radio"
                  value="Tasks"
                  checked={selectedOption === 'Tasks'}
                  onChange={handleOptionChange}
                />
                Tasks
              </label>

              <label>
                <input
                  type="radio"
                  value="Custom"
                  checked={selectedOption === 'Custom'}
                  onChange={handleOptionChange}
                />
                Custom
              </label>

              {selectedOption === 'Custom' && (
                <input
                  type="text"
                  placeholder="Enter custom text"
                  value={selectedOption}
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
          <button
            className="btn-ctn medium-primary"
            onClick={handleCreateBoard}
          >
            Create Board
          </button>
        </div>
      </div>
    </>
  )
}
