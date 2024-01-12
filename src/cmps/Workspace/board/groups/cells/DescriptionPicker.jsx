import { useEffect, useRef, useState } from 'react'
import TextField from '@mui/material/TextField'
import { DescriptionPreview } from './cellsPreview/DescriptionPreview'

export function DescriptionPicker({
  task,
  cmpId,
  handleUpdateTask,
  cmpsOrder,
}) {
  const [desc, setDesc] = useState(task['description' + cmpId] || '')
  const [multiLine, setOpenMultiLine] = useState(false)
  const inputRef = useRef(null)
  const colName = cmpsOrder.find(
    (cmp) => cmp.type === 'DescriptionPicker'
  )?.title

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
      const updatedTask = { ...task, ['description' + cmpId]: desc }
      await handleUpdateTask('DescriptionPicker', desc, updatedTask)
      await handleUpdateTask(
        'Activity',
        {
          createdAt: Date.now(),
          title: updatedTask.title,
          colName,
          oldValue: task['description' + cmpId],
          newValue: desc,
        },
        updatedTask
      )
    } catch (err) {
      console.error(err)
    }
  }

  function handleChange(ev) {
    ev.preventDefault()
    const txt = ev.target.value
    setDesc(txt)
  }

  return (
    <div className="description-picker-cell relative">
      {!multiLine ? (
        <DescriptionPreview {...{ setOpenMultiLine, displayValue }} />
      ) : (
        <TextField
          className="multiLine-text"
          value={desc}
          onBlur={handleBlur}
          onChange={handleChange}
          inputRef={inputRef}
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
