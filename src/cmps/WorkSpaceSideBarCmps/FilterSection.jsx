import Filter from "../../assets/icons/Filter.svg"
import Search from "../../assets/icons/Search.svg"
import Button from "@mui/material/Button"
import { AddIcon, FilterIcon, SearchIcon } from "../Icons"

export function FilterSection() {
  return (
    <div className="filter-container flex">
      <div className="filter-search flex">
        <button className="btn-icon small-transparent">
          <SearchIcon/>
        </button>
        <input type="text" placeholder="Search" />
        <button className="btn-icon small-transparent">
          <FilterIcon/>
        </button>
      </div>
      <div className="add-btn flex align-center justify-center">
        <button className="btn-ctn small-primary">
          <AddIcon/>
        </button>
      </div>
    </div>
  )
}
