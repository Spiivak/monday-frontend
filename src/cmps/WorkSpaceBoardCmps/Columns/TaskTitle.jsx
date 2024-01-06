import { EditableText } from "../../EditableText";

export function TaskTitle({ task, cmpId, handleUpdateTask }) {
  return (
    <div>
      <EditableText
        initialText={task.title}
        onSave={(text) => handleUpdateTask('task', text, task)}
      />
    </div>
  )
}
