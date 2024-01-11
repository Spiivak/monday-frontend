import TextField from '@mui/material/TextField'
import { useState } from 'react'

export function NumbersPickers({ task, cmpId, handleUpdateTask }) {
  const [num, setNum] = useState(task['number' + cmpId] || '')

  function handleUpdateNumber(ev) {
    const input = ev.target.value
    const sanitizedInput = input.replace(/[^0-9]/g, '')
    setNum(sanitizedInput)
  }

  async function handleBlur() {
    try {
      await handleUpdateTask('NumbersPicker', +num, task)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="cell number-picker-cell">
      <TextField
        className="cell"
        variant="standard"
        placeholder="Add a number..."
        id="outlined-number"
        onChange={handleUpdateNumber}
        onBlur={handleBlur}
        value={num}
        type="text"
        inputProps={{
          inputMode: 'numeric',
          style: {
            boxSizing: 'border-box',
            width: '130px',
            textAlign: 'center',
          },
        }}
        InputProps={{
          disableUnderline: true, // This will remove the underline
        }}
      />
    </div>
  )
}
