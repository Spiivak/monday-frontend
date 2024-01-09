import React from 'react'
export function TextSearch({ handleChange, handleSubmit, filterBy }) {




  return (
    <div className="btn-icon medium-transparent flex align-center relative">
      <input
        style={{height: '32px' ,backgroundColor: filterBy.txt ? '#cce5ff' : ''}}
        type="text"
        value={filterBy.txt}
        name="txt"
        onChange={handleChange}
        onBlur={handleSubmit}
      />
      {/* <SearchIcon /> Search */}
    </div>
  )
}
