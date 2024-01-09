import { Tooltip } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

export function EditableText({
  initialText,
  onSave,
  placeholder,
  type,
  textColor,
}) {
  let width
  let widthHeader
  let padding
  switch (type) {
    case 'headerTitle':
      width = 'calc(81vw - 265px)'
      widthHeader = 'fit-content'
      break
    case 'groupTitle':
      width = '45vw'
      padding = '0 2.1em'
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
  const editableTextRef = useRef()
  const textInputRef = useRef()
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

  function handleSave(ev) {
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
    setTimeout(() => {
      setIsEditing(true)
    }, 30)
  }

  function onOpenColorModal() {
    console.log('test')
    textInputRef.current.focus()
  }

  return (
    <div style={{ width: isEditing ? width : widthHeader }}>
      {isEditing ? (
        <div
          style={{ width: width }}
          ref={editableTextRef}
          className="editable-text-input relative">
          {textColor && (
            <button
              className="absolute"
              onClick={onOpenColorModal}
              style={{
                backgroundColor: textColor,
                border: 'none',
                outline: 'none',
                width: '16px',
                height: '16px',
                borderRadius: '4px',
                top: '50%',
                left: '8px',
                translate: '0 -50%',
              }}></button>
          )}
          <input
            style={{
              padding: padding,
              color: textColor,
              maxHeight: '32px',
              width: width,
            }}
            ref={textInputRef}
            type="text"
            value={inputText}
            onChange={handleChange}
            onBlur={handleSave}
            placeholder={placeholder || ''}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      ) : (
        <Tooltip
          title={inputText.length < 30 ? `Click to edit` : `${inputText}`}
          placement="top"
          arrow>
          <div
            className="flex align-center"
            style={{
              maxHeight: '32px',
              width: widthHeader,
              overflow: 'hidden',
              textWrap: 'nowrap',
              textOverflow: 'ellipsis',
              padding: '5px',
            }}
            onClick={handleToggleEditing}>
            {inputText || placeholder}
          </div>
        </Tooltip>
      )}
    </div>
  )
}
