import React, { useRef, useState } from 'react'
import { SearchIcon } from '../../../../Icons'
export function TextSearch({ handleChange, handleSubmit, filterBy }) {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef()
  function handleClick() {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current.focus()
    }, 30)
  }
  function handleBlur() {
    if (filterBy.txt?.length === 0 || !filterBy.txt) setIsEditing(false)
    handleSubmit()
  }
  return (
    <div className="flex align-center relative">
      {isEditing && (
        <div className="search-icon absolute">
          <SearchIcon />
        </div>
      )}
      <input
        ref={inputRef}
        className="search-input"
        style={{
          display: isEditing ? 'block' : 'none',
          height: '32px',
          backgroundColor: filterBy.txt ? '#cce5ff' : '',
          border: filterBy.txt ? 'none' : '',
        }}
        type="text"
        value={filterBy.txt}
        name="txt"
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Search"
      />

      <button
        onClick={handleClick}
        style={{ display: isEditing ? 'none' : 'flex' }}
        className="btn-icon medium-transparent flex align-center gap8">
        <SearchIcon />
        <span>Search</span>
      </button>

      {/* <SearchIcon /> Search */}
    </div>
  )
}
