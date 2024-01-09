export function DatePreview({ setDateModal, removeDate, task, cmpId }) {
  function formatDate(timestamp) {
    const dateObj = new Date(timestamp)

    const dayNumber = dateObj.getDate()
    const monthAbbreviation = dateObj.toLocaleString('default', {
      month: 'short',
    })

    return `${dayNumber} ${monthAbbreviation}`
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        textWrap: 'nowrap',
        justifyContent: 'center',
        position: 'relative',
      }}
      onClick={() => {
        setDateModal(true)
      }}
    >
      {formatDate(task['date' + cmpId])}
      <button
        onClick={removeDate}
        className=" btn-ctn medium-sec  "
        style={{
          color: 'black',
          padding: '0px',
          position: 'absolute',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          left: '100%',
          scale: '0.6',
        }}
      >
        X
      </button>
    </div>
  )
}
