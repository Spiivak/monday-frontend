import { Tooltip } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

export function EditableText({ initialText, onSave, placeholder }) {
  const constText = 'Add Item'
  const [isEditing, setEditing] = useState(false)
  const [text, setText] = useState(initialText)
  const [originalText, setOriginalText] = useState(initialText)

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
          style={{ minWidth: Math.ceil(text.length) + 'ch', maxHeight: '34px' }}
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
          arrow
        >
          <div onClick={handleToggleEditing}>{text || placeholder}</div>
        </Tooltip>
      )}
    </>
  )
}
