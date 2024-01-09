import React from 'react'
export function TextSearch({ handleChange, handleSubmit, filterBy }) {




  return (
    <div style={{translate: '0 -10%'}} className="btn-icon medium-transparent flex align-center relative">
      <input
        style={{height: '28px' ,backgroundColor: filterBy.txt ? '#cce5ff' : ''}}
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
