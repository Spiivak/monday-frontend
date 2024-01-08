import { useState } from 'react'
import { AddIcon, AddSmallIcon, FilterIcon, SearchIcon } from '../../../Icons'
import { FilterModal } from './FilterModal'
import { saveBoard } from '../../../../store/actions/board.actions'
import { boardService } from '../../../../services/board.service'

export function FilterSection({ onAddBoard }) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  function onClickFilterModal() {
    setIsFilterModalOpen((prevIsFilterModalOpen) => !prevIsFilterModalOpen)
  }

  function onClose() {
    setIsFilterModalOpen(false)
  }

  return (
    <div className="filter-container flex space-between">
      <div className="filter-search flex">
        <button className="btn-icon small-transparent search">
          <SearchIcon />
        </button>
        <input type="text" placeholder="Search" />
        <button
          className="btn-icon small-transparent filter"
          onClick={onClickFilterModal}
        >
          <div data-filter-button="true" className="flex align-center">
            <FilterIcon />
          </div>
        </button>
      </div>
      <div className="add-btn flex align-center justify-center">
        <button className="btn-ctn medium-primary" onClick={onAddBoard}>
          <AddSmallIcon />
        </button>
      </div>
      {isFilterModalOpen && <FilterModal onClose={onClose} />}
    </div>
  )
}
