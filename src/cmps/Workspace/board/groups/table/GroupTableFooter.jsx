import React from 'react'

export function GroupTableFooter({ rows, columns, group }) {
  return (
    <>
      <div
        style={{ gridRow: rows.length + 3, gridColumn: 1, opacity: '0' }}
      ></div>
      <div
        style={{ gridRow: rows.length + 3, gridColumn: 2, opacity: '0' }}
      ></div>
      {columns.map((column, colIdx) => {
        var x = groupSummaryByColumn(column, group)
        console.log('x:', x)
        if (colIdx === columns.length - 1) return
        return (
          <React.Fragment key={column.id}>
            <div
              style={{ gridRow: rows.length + 3, gridColumn: colIdx + 3 }}
              className="group-table-cell"
            >
              {x}
            </div>
          </React.Fragment>
        )
      })}
    </>
  )
}

function groupSummaryByColumn(column, group) {
  //Files , Person
  let currAccessor = column.accessor

  switch (column.Header) {
    // case 'Status':
    //   const statusSum = group.tasks.reduce((acc, task) => {
    //     const taskValue = task[currAccessor] || "Haven't Started"
    //     acc[taskValue] = (acc[taskValue] || 0) + 1
    //     return acc
    //   }, {})
    //   //   console.log('statusSum:', statusSum);
    //   return statusSum

    // case 'Date':
    //   const dates = group.tasks
    //     .filter((task) => task[currAccessor])
    //     .map((task) => task[currAccessor])
    //   const minDate = Math.min(...dates)
    //   const maxDate = Math.max(...dates)
    //   //   console.log([minDate, maxDate])
    //   return [minDate, maxDate]

    case 'Numbers':
      const numbersSum = group.tasks.reduce((acc, task) => {
        const taskValue = task[currAccessor] || 0
        acc += taskValue
        return acc
      }, 0)
      return numbersSum
    //   console.log('numbersSum:', numbersSum);

    // case 'Timeline':
    //   const timelines = group.tasks
    //     .filter((task) => task[currAccessor])
    //     .map((task) => task[currAccessor])
    //   const minTimestamp = Math.min(
    //     ...timelines.map((timestamps) => Math.min(...timestamps))
    //   )
    //   const maxTimestamp = Math.max(
    //     ...timelines.map((timestamps) => Math.max(...timestamps))
    //   )

    //   console.log('minTimestamp:', minTimestamp)
    //   console.log('maxTimestamp:', maxTimestamp)
    //   return [minTimestamp, maxTimestamp]
  }
}
