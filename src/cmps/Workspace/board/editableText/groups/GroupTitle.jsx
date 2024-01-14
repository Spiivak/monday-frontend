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

  function openColorModal(ev) {
    ev.preventDefault()
    ev.stopPropagation()

    setColorPicker(!colorPicker)
  }

  function handleColor(color) {
    onSave({ prop: 'style', value: { color: color } })
    setColorPicker(!colorPicker)
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

  function handleSave() {
    if (inputText.length > 0) onSave({ prop: 'title', value: inputText })
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
  return (
    <div className="group-title editable-txt editable-title">
      <div
        style={{ display: isEditing ? 'flex' : 'none' }}
        ref={editableTextRef}
        className="group-title-input"
      >
        {colorPicker && <ColorPickerModal {...{ handleColor }} />}
        <div style={{ position: 'relative' }}>
          <button
            style={{
              position: 'absolute',
              backgroundColor: textColor,
              width: '14px',
              height: '14px',
              borderRadius: '2px',
              border: 'none',
              left: '6px',
              top: '7px',
            }}
            onClick={openColorModal}
          ></button>
          <input
            ref={textInputRef}
            style={{
              color: textColor,
              paddingLeft: '25px',
            }}
            type="text"
            value={inputText}
            onChange={handleChange}
            onBlur={handleSave}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div
        style={{ display: isEditing ? 'none' : 'flex' }}
        className="flex align-center"
        onClick={handleToggleEditing}
      >
        <span style={{ color: textColor }}>{inputText || placeholder}</span>
      </div>
    </div>
  )
}
