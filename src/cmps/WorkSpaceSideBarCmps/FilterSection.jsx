import { useState } from 'react'
import { AddIcon, FilterIcon, SearchIcon } from '../Icons'
import { FilterModal } from './FilterModal'

export function FilterSection() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const openFilterModal = () => setIsFilterModalOpen(!isFilterModalOpen)
  return (
    <div className="filter-container flex">
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
        <button className="btn-ctn small-primary">
          <AddIcon />
        </button>
      </div>
      {isFilterModalOpen && <FilterModal />}
    </div>
  )
}
