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
} from '../Icons'

export function BoardFilter({ }) {
  return (
    <section className="board-filter flex gap8">
      <Tooltip title="New Item" placement='top' arrow>
        <div className="new-item-button flex align-center">
          <div className="new-item flex">
            <button className="btn-ctn medium-primary">
              <span>New Item</span>
            </button>
            <button className='btn-ctn medium-primary'>
              <span className='flex align-center'>
                <NavigationChevronDownIcon />
              </span>
            </button>
          </div>
        </div>
      </Tooltip>
      <button className="btn-icon medium-transparent flex gap8">
        <SearchIcon /> Search
      </button>
      <Tooltip title="Filter by person" placement='top' arrow>
        <button className="btn-icon medium-transparent flex gap8">
          <PersonIcon />
          Person
        </button>
      </Tooltip>
      <Tooltip title="Filter by anything" placement='top' arrow>
        <button className="btn-icon medium-transparent flex gap8">
          <FilterIcon />
          Filter <NavigationChevronDownIcon />
        </button>
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
