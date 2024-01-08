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
  let padding
  switch (type) {
    case 'boardHeader':
      width = '60vw'
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
  const [inputText, setInputText] = useState('')
  const [savedText, setSavedText] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setInputText(initialText)
    setSavedText(initialText)
  }, [initialText])

  useEffect(() => {
    if (type === 'groupTitle') {
      const handleWindowClick = (ev) => {
        if (
          editableTextRef.current &&
          editableTextRef.current.contains(ev.target)
        ) {
          console.log('true')
        } else {
          console.log('false')
          setIsEditing(false)
        }
      }
      window.addEventListener('click', handleWindowClick)
      return () => {
        window.removeEventListener('click', handleWindowClick)
      }
    }
  }, [])

  function handleChange(ev) {
    const target = ev.target
    const text = target.value
    setInputText(text)
  }

  function handleSave(ev) {
    if(type !== 'groupTitle'){
      if (inputText.length > 0) onSave(inputText)
      if (type === 'addTask') setInputText('')
      else setInputText(savedText)
      setIsEditing(false)
    }
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
  return (
    <>
      {isEditing ? (
        <div ref={editableTextRef} className="editable-text-input relative">
          {textColor && (
            <div
              className="absolute"
              style={{
                backgroundColor: textColor,
                width: '16px',
                height: '16px',
                borderRadius: '4px',
                top: '50%',
                left: '8px',
                translate: '0 -50%',
              }}></div>
          )}
          <input
            style={{
              padding: padding,
              color: textColor,
              maxHeight: '32px',
              width: width,
            }}
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
              width: type === 'groupTitle' ? 'fit-content' : width,
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
    </>
  )
}
