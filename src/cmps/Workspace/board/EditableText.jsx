import { Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'

export function EditableText({ initialText, onSave, placeholder, type }) {
  let width
  switch (type) {
    case 'boardHeader':
      width = '60vw'
      break
    case 'groupTitle':
      width = '45vw'
      break
    case 'columnTitle':
      width = '100px'
      break
    case 'taskTitle':
      width = '300px'
      break
    case 'addTask':
      width = '45vw'
      break
    default:
      width = '360px'
  }
  const [inputText, setInputText] = useState('')
  const [savedText, setSavedText] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  useEffect(() => {
    setInputText(initialText)
    setSavedText(initialText)
  }, [initialText])

  function handleChange(ev) {
    const target = ev.target
    const text = target.value
    setInputText(text)
  }

  function handleSave() {
    if (inputText.length > 0) onSave(inputText)
    if (type === 'addTask') setInputText('')
    else setInputText(savedText)
    setIsEditing(false)
  }

  function handleKeyDown(ev) {
    const key = ev.key
    if (key === 'Enter') handleSave()
  }

  function handleToggleEditing() {
    setIsEditing((a) => !a)
  }
  return (
    <>
      {isEditing ? (
        <input
          style={{ maxHeight: '32px', width: width }}
          type="text"
          value={inputText}
          onChange={handleChange}
          onBlur={handleSave}
          placeholder={placeholder || ''}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <Tooltip
          title={inputText.length < 30 ? `Click to edit` : `${inputText}`}
          placement="top"
          arrow>
          <div
            className='flex align-center editable-txt'
            style={{
              maxHeight: '32px',
              width: type === 'groupTitle' ? 'fit-content' : width ,
              overflow: 'hidden',
              textWrap: 'nowrap',
              textOverflow: 'ellipsis',
              padding: '5px'
            }}
            onClick={handleToggleEditing}>
            {inputText || placeholder}
          </div>
        </Tooltip>
      )}
    </>
  )
}
