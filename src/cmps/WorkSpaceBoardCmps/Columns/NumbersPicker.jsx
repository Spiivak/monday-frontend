import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'

export function NumbersPickers({ task, cmpId, handleUpdateTask }) {
  const [num, setNum] = useState(task['number' + cmpId] || '')

  async function handleUpdateNumber(ev) {
    const input = ev.target.value
    const sanitizedInput = input.replace(/[^0-9]/g, '')
    setNum(sanitizedInput)
  }

  async function handleBlur() {
    try {
      await handleUpdateTask('NumbersPicker', sanitizedInput, task)
      console.log('succsess')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <TextField
      className="cell"
      placeholder="Type a number..."
      id="outlined-number"
      onChange={handleUpdateNumber}
      onBlur={handleBlur}
      value={num}
      type="number"
      inputProps={{
        style: {
          boxSizing: 'border-box',
          width: '130px',
        },
      }}
    />
  )
}
