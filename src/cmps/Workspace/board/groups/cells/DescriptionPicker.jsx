import { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField'

export function DescriptionPicker({ task, cmpId, handleUpdateTask }) {
  const [desc, setDesc] = useState(task['description' + cmpId] || '')
  const [multiLine, setOpenMultiLine] = useState(false)
  const inputRef = useRef(null)

  const displayValue = multiLine ? desc : desc.replace(/\n/g, ' ')

  useEffect(() => {
    if (multiLine) {
      const length = desc.length
      inputRef.current.setSelectionRange(length, length)
    }
  }, [multiLine, desc])

  async function handleBlur() {
    try {
      setOpenMultiLine(false)
      await handleUpdateTask('DescriptionPicker', desc, task)
    } catch (err) {
      console.log(err)
    }
  }

  function handleChange(ev) {
    ev.preventDefault()
    const txt = ev.target.value
    setDesc(txt)
  }

  return (
    <div className="description-picker-cell relative">
      <div
        onClick={() => setOpenMultiLine(true)}
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          padding: '5px',
        }}
      >
        {displayValue || (
          <span style={{ color: '#00000044' }}>Add description</span>
        )}
      </div>
      {multiLine && (
        <TextField
          value={desc}
          onBlur={handleBlur}
          onChange={handleChange}
          inputRef={inputRef}
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            zIndex: '999',
            right: '50%',
            top: '0',
            transform: 'translate(50%, -5%)',
          }}
          id="outlined-multiline-static"
          multiline
          fullWidth
          rows={5}
          autoFocus
        />
      )}
    </div>
  )
}