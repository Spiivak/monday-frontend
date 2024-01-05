import { DatePicker } from "antd"
import { StatusPicker } from "./Columns/StatusPicker"
import { MemberPicker } from "./Columns/MemberPicker"
import { DescriptionPicker } from "./Columns/DescriptionPicker"
import { TimeLinePicker } from "./Columns/TimeLinePicker"
import { FilePicker } from "./Columns/FilterPicker"

export function DynamicTableCell({ cmp, task, onTaskUpdate }) {
  function handleUpdateTask(cmpType, data, task) {
    onTaskUpdate(cmpType, data, task)
  }

  switch (cmp) {
    case "StatusPicker":
      return <StatusPicker {...{ task, handleUpdateTask }} />
    case "MemberPicker":
      return <MemberPicker {...{ task, handleUpdateTask }} />
    case "DatePicker":
      return <DatePicker {...{ task, handleUpdateTask }} />
    case "DescriptionPicker":
      return <DescriptionPicker {...{ task, handleUpdateTask }} />
    case "TimeLinePicker":
      return <TimeLinePicker {...{ task, handleUpdateTask }} />
    case "FilePicker":
      return <FilePicker {...{ task, handleUpdateTask }} />
  }
}

