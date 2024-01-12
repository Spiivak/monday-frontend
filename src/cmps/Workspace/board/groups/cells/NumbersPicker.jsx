import TextField from '@mui/material/TextField'
import { useState } from 'react'

export function NumbersPickers({ task, cmpId, handleUpdateTask, cmpsOrder }) {
  const [num, setNum] = useState(+task['number' + cmpId] || 0)
  const colName = cmpsOrder.find((cmp) => cmp.type === 'NumbersPicker')?.title
  function handleUpdateNumber(ev) {
    const input = ev.target.value
    const sanitizedInput = input.replace(/[^0-9]/g, '')
    setNum(sanitizedInput)
  }

  async function handleBlur() {
    try {
      const updatedTask = { ...task, ['number' + cmpId]: num }
      await handleUpdateTask('NumbersPicker', +num, task)
      await handleUpdateTask(
        'Activity',
        {
          createdAt: Date.now(),
          title: updatedTask.title,
          colName,
          oldValue: task['number' + cmpId],
          newValue: num,
        },
        updatedTask
      )
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="cell number-picker-cell">
      <TextField
        className="cell"
        variant="standard"
        placeholder="Add a number"
        id="outlined-number"
        onChange={handleUpdateNumber}
        onBlur={handleBlur}
        value={num}
        type="text"
        inputProps={{
          inputMode: 'numeric',
          style: {
            fontSize: '15px',
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
