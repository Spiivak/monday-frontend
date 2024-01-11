import React from 'react'
import { utilService } from '../../../../../services/util.service'
import { MemberHoverModal } from '../cells/modals/MemberHoverModal'
import { Tooltip, styled, tooltipClasses } from '@mui/material'

export function GroupTableFooter({ rows, columns, group }) {
  return (
    <div className="table-body-row">
      <div
        className="empty-column"
        style={{ gridRow: rows.length + 3, gridColumn: 1 }}
      ></div>
      <div
        className="empty-column"
        style={{ gridRow: rows.length + 3, gridColumn: 2 }}
      ></div>
      {columns.map((column, colIdx) => {
        let colSummary
        if (!columns[colIdx + 1]) {
        } else {
          colSummary = groupSummaryByColumn(columns[colIdx + 1], group)
        }
        if (colIdx === columns.length - 1) return
        return (
          <React.Fragment key={column.id}>
            <div
              style={{
                gridRow: rows.length + 3,
                gridColumn: colIdx + 3,
                borderBottom: '1px solid #eee',
                width: '100%',
                height: '100%',
                translate: '0 -15%',
              }}
              className="group-table-cell cell"
            >
              {colSummary}
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

function groupSummaryByColumn(column, group) {
  let currAccessor = column.accessor

  switch (column.cmp.type) {
    case 'StatusPicker':
      const statusSum = group.tasks.reduce((acc, task) => {
        const taskValue = task[currAccessor] || "Haven't Started"
        acc[taskValue] = (acc[taskValue] || 0) + 1
        return acc
      }, {})
      let statusSumBar = renderStatusBox(calculateStatusPercentage(statusSum))
      return statusSumBar

    case 'DatePicker':
      const dates = group.tasks
        .filter((task) => task[currAccessor])
        .map((task) => task[currAccessor])
      if (!dates.length) return
      const minDate = Math.min(...dates)
      const maxDate = Math.max(...dates)
      return utilService.formatDateRange([minDate, maxDate])

    case 'NumbersPicker':
      const numbersSum = group.tasks.reduce((acc, task) => {
        const taskValue = task[currAccessor] || 0
        acc += taskValue
        return acc
      }, 0)
      return numbersSum

    case 'TimelinePicker':
      const timelines = group.tasks
        .filter((task) => task[currAccessor])
        .map((task) => task[currAccessor])
      if (!timelines.length) return
      const minTimestamp = Math.min(
        ...timelines.map((timestamps) => Math.min(...timestamps))
      )
      const maxTimestamp = Math.max(
        ...timelines.map((timestamps) => Math.max(...timestamps))
      )
      return utilService.formatDateRange([minTimestamp, maxTimestamp])

    case 'MemberPicker':
      const membersOfTask = group.tasks
        .filter((task) => task[currAccessor])
        .map((task) => task[currAccessor])
        .flat()
      if (!membersOfTask.length) return
      let uniqueMemberArray = membersOfTask.filter(
        (obj, index, self) => index === self.findIndex((t) => t._id === obj._id)
      )
      return renderMembersStatus(uniqueMemberArray)

    case 'FilePicker':
      const filesOfTask = group.tasks
        .filter((task) => task[currAccessor])
        .map((task) => task[currAccessor])
      if (!filesOfTask.length) return

      return renderFilesStatus(filesOfTask)
  }
}

function calculateStatusPercentage(tasks) {
  const doneCount = tasks['Done'] || 0
  const workingCount = tasks['Working on it'] || 0
  const havenotStartedCount = tasks["Haven't Started"] || 0
  const stuckCount = tasks['Stuck'] || 0

  const totalTasks = doneCount + workingCount + havenotStartedCount + stuckCount

  const donePercentage = totalTasks === 0 ? 0 : (doneCount / totalTasks) * 100
  const workingPercentage =
    totalTasks === 0 ? 0 : (workingCount / totalTasks) * 100
  const havenotStartedPercentage =
    totalTasks === 0 ? 0 : (havenotStartedCount / totalTasks) * 100
  const stuckPercentage = totalTasks === 0 ? 0 : (stuckCount / totalTasks) * 100

  return {
    Done: donePercentage,
    WorkingOnIt: workingPercentage,
    Stuck: stuckPercentage,
    HaventStarted: havenotStartedPercentage,
  }
}

function renderStatusBox(statusPercentages) {
  const boxStyles = {
    width: '150px',
    height: '20px',
    display: 'flex',
  }

  function getColor(status) {
    if (status === 'Stuck') {
      return '#E2445C'
    } else if (status === 'WorkingOnIt') {
      return '#FDAB3D'
    } else if (status === 'HaventStarted') {
      return '#c4c4c4'
    } else {
      return '#00C875'
    }
  }

  const statusBars = Object.entries(statusPercentages).map(
    ([status, percentage]) => (
      <div
        key={status}
        style={{
          width: `${percentage}%`,
          backgroundColor: getColor(status),
        }}
      ></div>
    )
  )

  return <div style={boxStyles}>{statusBars}</div>
}

function renderMembersStatus(members) {
  if (!members || members.length === 0) {
    return null
  }
  const [firstMember, ...restMembers] = members
  return (
    <div className="avatars-wrapper flex align-center">
      {renderAvatar(firstMember)}
      {renderOverflowIndicator(restMembers)}
    </div>
  )
}

function renderFilesStatus(files) {
  if (!files || files.length === 0) {
    return null
  }

  const maxFilesToShow = 2
  const filesToShow = files.slice(0, maxFilesToShow)
  const restFiles = files.slice(maxFilesToShow)

  return (
    <div className="files-wrapper flex align-center flex gap8">
      {filesToShow.map(renderFile)}
      {restFiles.length > 0 && renderOverflowFileIndicator(restFiles)}
    </div>
  )
}

function renderFile(file) {
  return (
    <img
      key={file.publicId}
      style={{ width: '20px', height: '20px', objectFit: 'cover' }}
      src={file.imgUrl}
    />
  )
}

function renderOverflowFileIndicator(files) {
  const additionalFilesCount = files.length

  return (
    <div className="overflow-indicator flex align-center justify-center">
      <MultiLineTooltip title={files.map((file) => file.name).join('\n')} arrow>
        <div className="overflow-tooltip-indicator">
          +{additionalFilesCount}
        </div>
      </MultiLineTooltip>
    </div>
  )
}

function renderAvatar(member) {
  return (
    <div className="avatar-logo" key={member._id}>
      <img src={member.imgUrl} alt="" />
      <MemberHoverModal member={member} />
    </div>
  )
}

function renderOverflowIndicator(members) {
  const additionalMembersCount = members.length

  if (additionalMembersCount > 0) {
    return (
      <div className="overflow-indicator flex align-center justify-center">
        <MultiLineTooltip
          title={members.map((member) => member.fullname).join('\n')}
          arrow
        >
          <div className="overflow-tooltip-indicator">
            +{additionalMembersCount}
          </div>
        </MultiLineTooltip>
      </div>
    )
  }
  return null
}

const MultiLineTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
    whiteSpace: 'pre-line',
  },
})
