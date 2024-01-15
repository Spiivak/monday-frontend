import React, { Suspense } from 'react'
import { utilService } from '../../../../../services/util.service'
import { MemberHoverModal } from '../cells/modals/MemberHoverModal'
import { Tooltip, styled, tooltipClasses } from '@mui/material'
import { KeySharp } from '@mui/icons-material'
import { useSelector } from 'react-redux'

export function GroupTableFooter({
  rows = [],
  columns = [],
  group = [],
  board = [],
  isTableOpen = true,
}) {
  return (
    <Suspense fallback={<Loading />}>
      <div
        className="table-body-row footer-row flex"
        style={{ height: '100%' }}
      >
        <div
          className="empty-column empty-1"
          style={{
            position: 'sticky',
            left: '50px',
            zIndex: 1000,
            backgroundColor: '#fff',
            // gridRow: rows.length + 3,
            gridColumn: 1,
          }}
        ></div>
        <div
          className="empty-column empty-2"
          style={{
            position: 'sticky',
            left: '79px',
            zIndex: 1000,
            backgroundColor: '#fff',
            // gridRow: rows.length + 3,
            gridColumn: 2,
          }}
        ></div>
        {Array.isArray(columns) &&
          columns.map((column, colIdx) => {
            let colSummary
            if (!columns[colIdx + 1]) {
            } else {
              colSummary = groupSummaryByColumn(
                columns[colIdx + 1],
                group,
                board,
                isTableOpen
              )
            }
            if (colIdx === columns.length - 1) return
            return (
              <React.Fragment key={column.id}>
                <div
                  style={{
                    // gridRow: rows.length + 3,
                    gridColumn: colIdx + 3,
                    borderBottom: '1px solid #d0d4e4',
                    borderLeft: '1px solid #d0d4e4',
                    width: '100%',
                    minHeight: '36px',
                    height: '100%',
                  }}
                  className={`group-table-cell cell ${
                    colIdx === 0 ? 'first-footer-cell' : ''
                  }`}
                >
                  {colSummary}
                </div>
              </React.Fragment>
            )
          })}
        <div
          style={{
            // gridRow: rows.length + 3,
            gridColumn: columns.length + 2,
            borderBottom: '1px solid #d0d4e4',
            borderLeft: '1px solid #d0d4e4',
            width: '100%',
            minHeight: '36px',
            height: '100%',
          }}
          className="group-table-cell cell"
        ></div>
      </div>
    </Suspense>
  )
}

function Loading() {
  return <h1>loading...</h1>
}

function calculateDateColor(group, fromDate, toDate) {
  const today = Date.now()
  let percentile
  if (today <= fromDate) return '#333'
  else if (today > fromDate && today < toDate) {
    percentile = Math.floor(
      100 - ((today - fromDate) / (toDate - fromDate)) * 100
    )
    return `linear-gradient(to left, #333 ${percentile}%, ${group.style.color} ${percentile}%)`
  }
  return group.style.color
}

function groupSummaryByColumn(column, group, board, isTableOpen) {
  let currAccessor = column.accessor
  switch (column.cmp.type) {
    case 'StatusPicker':
      const statusSum = group.tasks.reduce((acc, task) => {
        if (!board['labels' + column.cmp.id]) return acc
        const currLabel = board['labels' + column.cmp.id]?.find(
          (label) => label.id === task[currAccessor]
        )
        const taskValue = currLabel?.title || "Haven't Started"
        acc[taskValue] = (acc[taskValue] || 0) + 1
        return acc
      }, {})
      let statusSumBar = renderStatusBox(
        calculateStatusPercentage(statusSum, group),
        board,
        column
      )
      return (
        <div
          className="flex column"
          style={{
            marginBlockStart: !isTableOpen && '-8px',
            gap: !isTableOpen && '8px',
            padding: !isTableOpen && '8px',
            maxWidth: '200px',
          }}
        >
          {!isTableOpen && (
            <div
              style={{
                textAlign: 'center',
                textWrap: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {column.cmp.title}
            </div>
          )}
          {statusSumBar}
        </div>
      )

    case 'DatePicker':
      const dates = group.tasks
        .filter((task) => task[currAccessor])
        .map((task) => task[currAccessor])
      if (!dates.length) return
      const minDate = Math.min(...dates)
      const maxDate = Math.max(...dates)
      return (
        <div
          className="flex column"
          style={{
            marginBlockStart: !isTableOpen && '-8px',
            gap: !isTableOpen && '8px',
            padding: !isTableOpen && '8px',
            maxWidth: '200px',
          }}
        >
          {!isTableOpen && (
            <div
              style={{
                textAlign: 'center',
                textWrap: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {column.cmp.title}
            </div>
          )}
          <div
            style={{
              minWidth: '115px',
              borderRadius: '15px',
              background: calculateDateColor(group, minDate, maxDate),
              textAlign: 'center',
              color: 'white',
            }}
          >
            {utilService.formatDateRange([minDate, maxDate])}
          </div>
        </div>
      )
    case 'NumbersPicker':
      const numbersSum = group.tasks.reduce((acc, task) => {
        const taskValue = task[currAccessor] || 0
        acc += +taskValue
        return acc
      }, 0)
      return (
        <div
          className="flex column"
          style={{
            marginBlockStart: !isTableOpen && '-8px',
            gap: !isTableOpen && '8px',
            padding: !isTableOpen && '8px',
            maxWidth: '200px',
          }}
        >
          {!isTableOpen && (
            <div
              style={{
                textAlign: 'center',
                textWrap: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {column.cmp.title}
            </div>
          )}
          {numbersSum}
        </div>
      )

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
      return (
        <div
          className="flex column"
          style={{
            marginBlockStart: !isTableOpen && '-8px',
            gap: !isTableOpen && '8px',
            padding: !isTableOpen && '8px',
            maxWidth: '200px',
          }}
        >
          {!isTableOpen && (
            <div
              style={{
                textAlign: 'center',
                textWrap: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {column.cmp.title}
            </div>
          )}
          <div
            style={{
              minWidth: '115px',
              borderRadius: '15px',
              background: calculateDateColor(group, minTimestamp, maxTimestamp),
              textAlign: 'center',
              color: 'white',
            }}
          >
            {utilService.formatDateRange([minTimestamp, maxTimestamp])}
          </div>
        </div>
      )

    case 'MemberPicker':
      const membersOfTask = group.tasks
        .filter((task) => task[currAccessor])
        .map((task) => task[currAccessor])
        .flat()
      if (!membersOfTask.length) return
      let uniqueMemberArray = membersOfTask.filter(
        (obj, index, self) => index === self.findIndex((t) => t._id === obj._id)
      )
      return (
        <div
          className="flex column"
          style={{
            marginBlockStart: !isTableOpen && '-8px',
            gap: !isTableOpen && '8px',
            padding: !isTableOpen && '8px',
            maxWidth: '200px',
          }}
        >
          {!isTableOpen && (
            <div
              style={{
                textAlign: 'center',
                textWrap: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {column.cmp.title}
            </div>
          )}
          {renderMembersStatus(uniqueMemberArray)}
        </div>
      )

    case 'FilePicker':
      const filesOfTask = group.tasks
        .filter((task) => task[currAccessor])
        .map((task) => task[currAccessor])
      if (!filesOfTask.length) return

      return (
        <div
          className="flex column"
          style={{
            marginBlockStart: !isTableOpen && '-8px',
            gap: !isTableOpen && '8px',
            padding: !isTableOpen && '8px',
            maxWidth: '200px',
          }}
        >
          {!isTableOpen && (
            <div
              style={{
                textAlign: 'center',
                textWrap: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {column.cmp.title}
            </div>
          )}
          {renderFilesStatus(filesOfTask)}
        </div>
      )
  }
}

function calculateStatusPercentage(tasks, group) {
  const keys = Object.keys(tasks)
  const values = Object.values(tasks)
  const percentage = values.map((value) => {
    const sum = group.tasks.length
    return Math.floor((value / sum) * 100)
  })
  const percentageObj = keys.reduce((acc, key, idx) => {
    acc[key] = percentage[idx]
    return acc
  }, {})
  return percentageObj
}

function renderStatusBox(statusPercentages, board, column) {
  const boxStyles = {
    width: '150px',
    height: '20px',
    display: 'flex',
  }

  if (!board['labels' + column.cmp.id]) return
  const colorMap = board['labels' + column.cmp.id].reduce(
    (acc, label) => {
      acc[label.title] = label.color
      return acc
    },
    { "Haven't Started": '#c4c4c4' }
  )

  const statusBars = Object.entries(statusPercentages).map(
    ([status, percentage]) => (
      <div
        key={status}
        style={{
          width: `${percentage}%`,
          backgroundColor: colorMap[status],
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
    <div className="avatars-wrapper flex justify-center align-center">
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
