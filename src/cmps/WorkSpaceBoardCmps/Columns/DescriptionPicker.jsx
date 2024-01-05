import { useEffect, useState } from 'react'
import Textarea from '@mui/joy/Textarea'

export function DescriptionPicker({ task, handleUpdateTask }) {
  const [minRows, setMinRows] = useState(1)
  const [desc, setDesc] = useState(task.description || '')

  function handleUpdateDesc(ev) {
    ev.preventDefault()
    const txt = ev.target.value
    setDesc(txt)
    handleUpdateTask('DescriptionPicker', txt, task)
  }

  useEffect(() => {}, [desc])

  function handleTextareaBlur() {
    setMinRows(1)
    setDesc((prevDesc) => prevDesc.replace(/\n/g, ' ').trim())
  }

  return (
    <div className="cell">
      <Textarea
        placeholder="Add description"
        minRows={minRows}
        value={task.description ? desc : ''}
        onChange={handleUpdateDesc}
        onClick={() => setMinRows(5)}
        onBlur={handleTextareaBlur}
      />
    </div>
  )
}
