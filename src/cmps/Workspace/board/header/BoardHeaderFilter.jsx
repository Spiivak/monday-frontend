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

export function BoardHeaderFilter({ }) {
  return (
    <section className="board-filter flex gap8">
      <Tooltip title="New Item" placement='top' arrow>
        <div className="new-item flex">
          <button className="btn-ctn medium-primary new-item-btn">
            New Item
          </button>
          <button className='btn-ctn medium-primary new-item-arrow'>
            <NavigationChevronDownIcon />
          </button>
        </div>
      </Tooltip>
      <button className="btn-icon medium-transparent flex align-center">
        <SearchIcon /> Search
      </button>
      <Tooltip title="Filter by person" placement='top' arrow>
        <button className="btn-icon medium-transparent flex align-center gap8">
          <PersonIcon />
          Person
        </button>
      </Tooltip>
      <Tooltip title="Filter by anything" placement='top' arrow>
          <div className="filter-item flex">
            <button className="btn-icon medium-transparent filter-item-btn flex gap8">
              <FilterIcon />
              Filter
            </button>
            <button className='btn-icon small-transparent filter-btn-arrow'>
              <NavigationChevronDownIcon />
            </button>
          </div>
      </Tooltip>
      <Tooltip title="Sort by any column" placement='top' arrow>
        <button className="btn-icon medium-transparent flex gap8">
          <SortIcon />
          Sort
        </button>
      </Tooltip>
      <Tooltip title="Hidden Columns" placement='top' arrow>
        <button className="btn-icon medium-transparent flex gap8">
          <HideIcon />
          Hide
        </button>
      </Tooltip>
      <Tooltip title="Group By Column" placement='top' arrow>
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
