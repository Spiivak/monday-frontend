import React, { useRef, useState } from 'react'
import { SearchIcon } from '../../../../Icons'
export function TextSearch({
  handleChange,
  handleSubmit,
  filterBy,
  clearText,
}) {
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

  function handleClearTxt() {
    clearText()
    setIsEditing(false)
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
      <div
        style={{
          display: isEditing ? 'flex' : 'none',
          right: 0,
          top: 0,
          cursor: 'pointer',
          translate: '-200% 0',
          zIndex: 100000,
        }}
        onClick={handleClearTxt}>
        x
      </div>

      {/* <SearchIcon /> Search */}
    </div>
  )
}
