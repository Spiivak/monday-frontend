import Filter from "../../assets/icons/Filter.svg"
import Search from "../../assets/icons/Search.svg"
import Button from "@mui/material/Button"

export function FilterSection() {
  return (
    <div className="filter-container flex">
      <div className="filter-search flex">
        <button>
          <img src={Search} />
        </button>
        <input type="text" placeholder="Search" />
        <button className="filter-btn justify-center">
          <img src={Filter} />
        </button>
      </div>
      <div className="add-btn">
        <Button
          style={{
            background: "#1565c0",
            color: "white",
            padding: "0px",
            minWidth: "35px",
          }}
          size="small"
          variant="contained"
        >
          +
        </Button>{" "}
      </div>
    </div>
  )
}
