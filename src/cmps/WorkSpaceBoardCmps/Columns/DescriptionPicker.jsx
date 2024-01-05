import { useEffect, useRef, useState } from "react"
import { utilService } from "../../../services/util.service"

export function DescriptionPicker({ task, handleUpdateTask }) {
  const [isActive, setIsActive] = useState(false)
  const [desc, setDesc] = useState(task.description)
  handleUpdateTask = useRef(utilService.debounce(handleUpdateTask))

  function handleUpdateDesc(ev) {
    ev.preventDefault()
    const txt = ev.target.value
    setDesc(txt)
  }

  function removeLeadingSlashN(description) {
    let modifiedDescription = description

    while (modifiedDescription && modifiedDescription.startsWith("\n")) {
      modifiedDescription = modifiedDescription.slice(2)
    }

    return modifiedDescription
  }

  const descriptionToShow = removeLeadingSlashN(desc) || "empty"

  useEffect(() => {
    handleUpdateTask.current("DescriptionPicker", desc, task)
  }, [desc])

  return (
    <div className="cell">
      <h4
        onClick={() => {
          setIsActive((a) => !a)
        }}
      >
        {descriptionToShow}
      </h4>
      <div className={`cell-context ${isActive ? "active" : "hidden"}`}>
        <textarea
          placeholder="Add description"
          value={desc}
          onChange={handleUpdateDesc}
          onBlur={() => {
            setIsActive((a) => !a)
          }}
        />
      </div>
    </div>
  )
}

