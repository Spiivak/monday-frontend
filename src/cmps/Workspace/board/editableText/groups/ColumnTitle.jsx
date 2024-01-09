import { useRef, useState, useEffect } from "react"
import { ToolTip } from "../../../../ToolTip"

export function ColumnTitle({ initialText, onSave, placeholder }) {

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
    <div className="column-title flex align-center">
      {isEditing ? (
        <div ref={editableTextRef} className="column-title-input flex align-center">
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
          <span  onClick={handleToggleEditing} className="flex align-center editable-txt editable-task column-title-text">{inputText || placeholder}</span>
      )}
    </div>
  )
}
