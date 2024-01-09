import React from 'react'
export function TextSearch({ handleChange, handleSubmit, filterBy }) {




  return (
    <button className="btn-icon medium-transparent flex align-center">
      <input
        style={{height: '28px' ,backgroundColor: filterBy.txt ? 'blue' : ''}}
        type="text"
        value={filterBy.txt}
        name="txt"
        onChange={handleChange}
        onBlur={handleSubmit}
      />
      {/* <SearchIcon /> Search */}
    </button>
  )
}
