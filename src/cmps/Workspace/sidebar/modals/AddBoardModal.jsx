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
import { useSelector } from 'react-redux'

export function AddBoardModal({ onClose, SetAddModalOpen }) {
  const modalRef = useRef()
  const [isModalOpen, setModalOpen] = useState(false)

  const handleToggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  const handleClickOutside = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      event.target.getAttribute('id') !== 'test'
    ) {
      onClose()
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event) => handleClickOutside(event)
    window.addEventListener('mousedown', handleOutsideClick)

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [onClose])
  return (
    <>
      <div id="test" className="add-board-modal flex gap8" ref={modalRef}>
        <button
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
  const navigate = useNavigate()
  const [title, setTitle] = useState('New Board')
  const [option, setOption] = useState('Items')
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)

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
      const savedBoard = await saveBoard(newBoard)
      navigate(`/workspace/${savedBoard._id}`)
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
    onAddBoard()
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
            <input type="text" name="title" onChange={handleChange} placeholder='New Board' value={title} />
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
                  value="Budgets"
                  checked={option === 'Budgets'}
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
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-txt large-sec" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="btn-ctn large-primary"
            onClick={handleCreateBoard}
          >
            Create Board
          </button>
        </div>
      </div>
    </>
  )
}
