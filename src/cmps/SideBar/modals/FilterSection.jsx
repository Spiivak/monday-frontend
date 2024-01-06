import { useState } from 'react'
import { AddIcon, FilterIcon, SearchIcon } from '../../Icons'
import { FilterModal } from './FilterModal'
import { saveBoard } from '../../../store/actions/board.actions'
import { Navigate } from 'react-router'

export function FilterSection() {

  async function onAddBoard() {
    try {
      const newBoard = await saveBoard()
      Navigate('/' + newBoard)
      return newBoard
    } catch (error) {
      console.log(error)
    }
    
  }

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const openFilterModal = () => setIsFilterModalOpen(!isFilterModalOpen)
  return (
    <div className="filter-container flex space-between">
      <div className="filter-search flex">
        <button className="btn-icon small-transparent">
          <SearchIcon />
        </button>
        <input type="text" placeholder="Search" />
        <button
          className="btn-icon small-transparent"
          onClick={() => openFilterModal()}
        >
          <FilterIcon />
        </button>
      </div>
      <div className="add-btn flex align-center justify-center">
        <button className="btn-ctn medium-primary" onClick={onAddBoard}>
          <AddIcon />
        </button>
      </div>
      {isFilterModalOpen && <FilterModal />}
    </div>
  )
}
