import { useState } from 'react'
import { AddIcon, AddSmallIcon, FilterIcon, SearchIcon } from '../../Icons'
import { FilterModal } from './modals/FilterModal'
import { saveBoard } from '../../../store/actions/board.actions'
import { boardService } from '../../../services/board.service'
import { AddBoardModal } from './modals/AddBoardModal'

export function SidebarFilter({ onAddBoard }) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isAddModalOpen, SetAddModalOpen] = useState(false)
  function onClickFilterModal() {
    setIsFilterModalOpen((prevIsFilterModalOpen) => !prevIsFilterModalOpen)
  }

  const openAddModal = () => SetAddModalOpen(!isAddModalOpen)

  function onClose() {
    setIsFilterModalOpen(false)
    SetAddModalOpen(false)
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
      <div className="add-btn flex align-center justify-center" data-addboard-button="true">
        <button className="btn-ctn medium-primary" onClick={() => openAddModal()}>
          <AddSmallIcon />
        </button>
      </div>
      {isFilterModalOpen && <FilterModal onClose={onClose} />}
      {isAddModalOpen && <AddBoardModal onClose={onClose} SetAddModalOpen={SetAddModalOpen}/>}
    </div>
  )
}
