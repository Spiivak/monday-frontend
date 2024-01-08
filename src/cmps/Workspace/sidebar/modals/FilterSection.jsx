import { useState } from 'react'
import { AddIcon, FilterIcon, SearchIcon } from '../../../Icons'
import { FilterModal } from './FilterModal'
import { saveBoard } from '../../../../store/actions/board.actions'
import { boardService } from '../../../../services/board.service'

export function FilterSection() {

  async function onAddBoard() {
    const board = boardService.getEmptyBoard()
    try {
      await saveBoard(board)
    } catch (err) {
      console.log('Cannot add board', err)
    }
  }

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  function onClickFilterModal() {
    setIsFilterModalOpen((prevIsFilterModalOpen) => !prevIsFilterModalOpen);
  }

  function onClose() {
    setIsFilterModalOpen(false)
  }

  return (
    <div className="filter-container flex space-between">
      <div className="filter-search flex">
        <button className="btn-icon small-transparent">
          <SearchIcon />
        </button>
        <input type="text" placeholder="Search" />
        <button
          className="btn-icon small-transparent"
          onClick={onClickFilterModal}
        >
          <div data-filter-button="true" className='flex align-center'>

          <FilterIcon />
          </div>
        </button>
      </div>
      <div className="add-btn flex align-center justify-center">
        <button className="btn-ctn medium-primary" onClick={onAddBoard}>
          <AddIcon />
        </button>
      </div>
      {isFilterModalOpen && <FilterModal onClose={onClose} />}
    </div>
  )
}
