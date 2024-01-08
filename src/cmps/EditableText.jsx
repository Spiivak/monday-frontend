import { Tooltip } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

export function EditableText({ initialText, onSave, placeholder, type }) {
  const constText = 'Add Item'
  const [isEditing, setEditing] = useState(false)
  const [text, setText] = useState(initialText)
  const [originalText, setOriginalText] = useState(initialText)

  let width
  switch (type) {
    case 'boardHeader':
      width = '360px'
      break
    case 'groupTitle':
      width = '360px'
    case 'columnTitle':
      width = '100px'
      break
    case 'taskTitle':
      width = '300px'
      break
    case 'addTask':
      width = '360px'
      break
    default:
      width = '360px'
  }

  useEffect(() => {
    return () => {
      setText('')
      setOriginalText('')
    }
  }, [])
  const handleToggleEditing = () => {
    setEditing(!isEditing)
  }

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.target.blur()
    }
  }

  const handleSave = () => {
    if (text.trim() !== '') {
      onSave(text)
    } else {
      setText(initialText)
    }

    setEditing(false)
  }

  const showTooltip = text.length < 50
  return (
    <>
      {isEditing ? (
        <input
          style={{ maxHeight: '32px', width: width }}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleSave}
          placeholder={placeholder || ''}
          onKeyDown={onKeyDown}
          autoFocus
        />
      ) : (
        <Tooltip
          title={showTooltip ? `Click to edit` : `${text}`}
          placement="top"
          arrow>
          <div onClick={handleToggleEditing}>{text || placeholder}</div>
        </Tooltip>
      )}
    </>
  )
}
