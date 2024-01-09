import { Tooltip } from '@mui/material'
import {
  FilterIcon,
  GroupIcon,
  HideIcon,
  MenuIcon,
  NavigationChevronDownIcon,
  PersonIcon,
  SearchIcon,
  SortIcon,
} from '../../../Icons'
import { useState } from 'react'
import { setStoreFilterBy } from '../../../../store/actions/board.actions'

export function BoardHeaderFilter({ isCollapsed }) {
  const [filterBy, setFilterBy] = useState('')

  function handleChange(ev) {
    const target = ev.target
    const value = target.value
    const name = target.name

    setFilterBy((pervFilter) => ({ ...pervFilter, [name]: value }))
  }

  function handleSubmit(ev){
    console.log(filterBy.txt)
    setStoreFilterBy(filterBy)
  }

  return (
    <section className={`board-filter flex gap6`}>
      <Tooltip title="New Item" placement="top" arrow>
        <div className="new-item flex">
          <button className="btn-ctn medium-primary new-item-btn">
            New Item
          </button>
          <button className="btn-ctn medium-primary new-item-arrow">
            <NavigationChevronDownIcon />
          </button>
        </div>
      </Tooltip>
      <button className="btn-icon medium-transparent flex align-center">
        <input type="text" value={filterBy.txt} name="txt" onChange={handleChange} onBlur={handleSubmit}/>
        {/* <SearchIcon /> Search */}
      </button>
      <Tooltip title="Filter by person" placement="top" arrow>
        <button className="btn-icon medium-transparent flex align-center gap8">
          <PersonIcon />
          Person
        </button>
      </Tooltip>
      <Tooltip title="Filter by anything" placement="top" arrow>
        <div className="filter-item flex">
          <button className="btn-icon medium-transparent filter-item-btn flex gap8">
            <FilterIcon />
            Filter
          </button>
          <button className="btn-icon small-transparent filter-btn-arrow">
            <NavigationChevronDownIcon />
          </button>
        </div>
      </Tooltip>
      <Tooltip title="Sort by any column" placement="top" arrow>
        <button className="btn-icon medium-transparent flex gap8">
          <SortIcon />
          Sort
        </button>
      </Tooltip>
      <Tooltip title="Hidden Columns" placement="top" arrow>
        <button className="btn-icon medium-transparent flex gap8">
          <HideIcon />
          Hide
        </button>
      </Tooltip>
      <Tooltip title="Group By Column" placement="top" arrow>
        <button className="btn-icon medium-transparent flex gap8">
          <GroupIcon />
          Group by
        </button>
      </Tooltip>
      <button className="btn-icon medium-transparent">
        <MenuIcon />
      </button>
    </section>
  )
}
