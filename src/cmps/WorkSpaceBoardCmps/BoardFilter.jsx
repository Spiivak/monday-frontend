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

export function BoardFilter({}) {
  return (
    <section className="board-filter">
      <button className="btn-ctn medium-primary flex gap8">
        New Item <NavigationChevronDownIcon />
      </button>
      <button className="btn-icon medium-transparent flex gap8">
        <SearchIcon /> Search
      </button>
      <button className="btn-icon medium-transparent flex gap8">
        <PersonIcon />
        Person
      </button>
      <button className="btn-icon medium-transparent flex gap8">
        <FilterIcon />
        Filter <NavigationChevronDownIcon />
      </button>
      <button className="btn-icon medium-transparent flex gap8">
        <SortIcon />
        Sort
      </button>
      <button className="btn-icon medium-transparent flex gap8">
        <HideIcon />
        Hide
      </button>
      <button className="btn-icon medium-transparent flex gap8">
        <GroupIcon />
        Group by
      </button>
      <button className="btn-icon medium-transparent">
        <MenuIcon />
      </button>
    </section>
  )
}
