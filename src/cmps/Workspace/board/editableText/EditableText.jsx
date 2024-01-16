import { HeaderTitle } from './groups/HeaderTitle'
import { GroupTitle } from './groups/GroupTitle'
import { ColumnTitle } from './groups/ColumnTitle'
import { TaskTitle } from './groups/TaskTitle'
import { AddTask } from './groups/AddTask'

export function EditableText({
  initialText,
  onSave,
  placeholder,
  type,
  textColor,
  group,
}) {
  switch (type) {
    case 'addTask':
      return <AddTask {...{ initialText, onSave, placeholder, type }} />
    case 'columnTitle':
      return <ColumnTitle {...{ initialText, onSave, placeholder, type }} />
    case 'taskTitle':
      return <TaskTitle {...{ initialText, onSave, placeholder, type, group }} />
    case 'groupTitle':
      return (
        <GroupTitle
          {...{ initialText, onSave, placeholder, type, textColor }}
        />
      )
    case 'headerTitle':
      return <HeaderTitle {...{ initialText, onSave, placeholder, type }} />
    default:
      return console.error('couldnt find any type to edit')
  }
}
