import { useRef, useState, useEffect } from 'react'
import { ColorPickerModal } from '../../ColorPickerModal'

export function GroupTitle({
  initialText,
  onSave,
  placeholder,
  type,
  textColor,
}) {
  const editableTextRef = useRef()
  const textInputRef = useRef()
  const [inputText, setInputText] = useState('')
  const [savedText, setSavedText] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [colorPicker, setColorPicker] = useState(false)

  const groupTitleRef = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target

      if (groupTitleRef.current && !groupTitleRef.current.contains(target)) {
        setTimeout(() => {
          setIsEditing(false)
        }, 100)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  function openColorModal(ev) {
    setColorPicker(!colorPicker)
  }

  function handleColor(color) {
    onSave({ prop: 'style', value: { color: color } })
    setColorPicker(!colorPicker)
    setIsEditing(false)
  }

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
    const relatedTarget = ev.relatedTarget
    if (
      relatedTarget &&
      relatedTarget.classList.contains('open-color-modal-btn')
    ) {
      return
    }
    if (inputText.length > 0) onSave({ prop: 'title', value: inputText })
    else setInputText(savedText)
    setIsEditing(false)
  }

  function handleKeyDown(ev) {
    const key = ev.key
    if (key === 'Enter') handleSave()
  }

  function handleToggleEditing() {
    setIsEditing(true)
    setTimeout(() => {
      textInputRef.current.focus()
    }, 1)
  }
  return (
    <div
      ref={groupTitleRef}
      className="group-title editable-txt editable-title">
      <div
        style={{ display: isEditing ? 'flex' : 'none' }}
        ref={editableTextRef}
        className="group-title-input">
        {colorPicker && <ColorPickerModal {...{ handleColor }} />}
        <div style={{ position: 'relative' }}>
          <button
            className="open-color-modal-btn"
            style={{
              position: 'absolute',
              backgroundColor: textColor,
              width: '14px',
              height: '14px',
              borderRadius: '2px',
              border: 'none',
              left: '6px',
              top: '7px',
              zIndex: 100000000,
            }}
            onClick={openColorModal}></button>
          <input
            ref={textInputRef}
            style={{
              color: textColor,
              paddingLeft: '25px',
            }}
            type="text"
            value={inputText}
            onChange={handleChange}
            onBlur={(ev) => handleSave(ev)}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div
        style={{ display: isEditing ? 'none' : 'flex' }}
        className="flex align-center"
        onClick={handleToggleEditing}>
        <span style={{ color: textColor }}>{inputText || placeholder}</span>
      </div>
    </div>
  )
}
