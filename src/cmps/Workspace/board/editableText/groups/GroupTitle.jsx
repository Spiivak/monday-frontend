import { useRef, useState, useEffect } from 'react'

export function GroupTitle({
  initialText,
  onSave,
  placeholder,
  type,
  textColor,
}) {
  const optinalcolors = [
    '#ffcb00',
    '#007038',
    '#469e9b',
    '#579bfc',
    '#9aadbd',
    '#bba5e8',
    '#8050ab',
    '#4f3a65',
    '#92334c',
    '#bb3354',
    '#ff7575',
  ]
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
        {colorPicker && (
          <div
            className="flex wrap gap8"
            style={{
              cursor: 'default',
              width: '150px',
              height: '150px',
              backgroundColor: 'white',
              position: 'absolute',
              border: '1px solid black',
              top: '40px',
              left: '0px',
              padding: '8px',
              zIndex: 10000,
            }}
          >
            {optinalcolors.map((color, index) => (
              <div
                onClick={() => handleColor(color)}
                key={index}
                style={{
                  cursor: 'pointer',
                  width: '25px',
                  height: '25px',
                  borderRadius: '7px',
                  backgroundColor: color,
                }}
              ></div>
            ))}
          </div>
        )}
        <div style={{ position: 'relative' }}>
          <button
            style={{
              position: 'absolute',
              backgroundColor: textColor,
              wdith: '14px',
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
            autoFocus
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
