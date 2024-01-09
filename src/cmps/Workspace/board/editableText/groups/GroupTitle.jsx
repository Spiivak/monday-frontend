import { useRef, useState, useEffect } from "react"

export function GroupTitle({ initialText, onSave, placeholder, type, textColor }) {
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

  function handleSave() {
    if (inputText.length > 0) onSave(inputText)
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
      {isEditing ? (
        <div ref={editableTextRef} className="group-title-input">
          <input
            ref={textInputRef}
            style={{ color: textColor }}
            type="text"
            value={inputText}
            onChange={handleChange}
            onBlur={handleSave}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      ) : (
        <div className="flex align-center" onClick={handleToggleEditing}>
          <span style={{ color: textColor}}>{inputText || placeholder}</span>
        </div>
      )}
    </div>
  )
}
