import { useRef, useState, useEffect } from "react"

export function TaskTitle({ initialText, onSave, placeholder, type }) {
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
  return (
    <div className="task-title">
      {isEditing ? (
        <div ref={editableTextRef} className="task-title-input">
          <input
            ref={textInputRef}
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
        // <div className="editable-txt editable-task-title task-title-text" onClick={handleToggleEditing}>
          <span onClick={handleToggleEditing} className="flex align-center editable-txt editable-task-title task-title-text">{inputText || placeholder}</span>
        // </div>
      )}
    </div>
  )
}
