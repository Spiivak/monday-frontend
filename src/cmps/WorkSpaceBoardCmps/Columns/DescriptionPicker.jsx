import { useState } from 'react'
import TextField from '@mui/material/TextField'

export function DescriptionPicker({ task, cmpId, handleUpdateTask }) {
  const [desc, setDesc] = useState(task['description' + cmpId] || '')

  async function handleBlur() {
    try {
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
    <TextField
      size="small"
      className="cell"
      placeholder="Add description"
      value={desc}
      onBlur={handleBlur}
      onChange={handleChange}
      inputProps={{
        style: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      }}
    />
  )
}
