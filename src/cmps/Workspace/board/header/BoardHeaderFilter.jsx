import { PersonFilter } from './filterBtns/PersonFilter'
import { TextSearch } from './filterBtns/TextSearch'
import { ToolTip } from '../../../ToolTip'
import {
  FilterIcon,
  GroupIcon,
  HideIcon,
  MenuIcon,
  NavigationChevronDownIcon,
  SortIcon,
} from '../../../Icons'
import { useState } from 'react'
import { setStoreFilterBy } from '../../../../store/actions/board.actions'
import { utilService } from '../../../../services/util.service'
import { Dropdown } from 'antd'

export function BoardHeaderFilter({ board, isCollapsed }) {
  const [filterBy, setFilterBy] = useState('')
  const debounceSetStoreFilter = utilService.debounce(setStoreFilterBy, 500)

  function handleChange(ev) {
    const target = ev.target
    const value = target.value
    const name = target.name

    setFilterBy((pervFilter) => {
      const newFilter = { ...pervFilter, [name]: value }
      debounceSetStoreFilter(newFilter)
      return newFilter
    })
  }

  function handleSubmit(incomingFilter) {
    setFilterBy((pervFilter) => {
      const newFilter = { ...pervFilter, ...incomingFilter }

      setStoreFilterBy(newFilter)
      return newFilter
    })
  }

  return (
    <section className={`board-filter flex gap6`}>
      <ToolTip title="New Item">
        <div className="new-item flex">
          <button className="btn-ctn medium-primary new-item-btn">
            New Item
          </button>
          <button className="btn-ctn medium-primary new-item-arrow">
            <NavigationChevronDownIcon />
          </button>
        </div>
      </ToolTip>
      <TextSearch
        filterBy={filterBy}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <PersonFilter
        board={board}
        filterBy={filterBy}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <ToolTip title="Filter by anything">
        <div className="filter-item flex align-center">
          <button className="btn-icon medium-transparent filter-item-btn flex gap8">
            <FilterIcon />
            Filter
          </button>
          <button className="btn-icon small-transparent filter-btn-arrow">
            <NavigationChevronDownIcon />
          </button>
        </div>
      </ToolTip>
      <ToolTip title="Sort by any column">
        <div className="filter-item flex align-center">
          <button className="btn-icon medium-transparent flex gap8">
            <SortIcon />
            Sort
          </button>
        </div>
      </ToolTip>
      <ToolTip title="Hidden Columns">
        <div className="filter-item flex align-center">
          <button className="btn-icon medium-transparent flex gap8">
            <HideIcon />
            Hide
          </button>
        </div>
      </ToolTip>
      <ToolTip title="Group By Column">
        <div className="filter-item flex align-center">
          <button className="btn-icon medium-transparent flex gap8">
            <GroupIcon />
            Group by
          </button>
        </div>
      </ToolTip>
      <div className="filter-item flex align-center">
        <button className="btn-icon medium-transparent">
          <MenuIcon />
        </button>
      </div>
    </section>
  )
}
