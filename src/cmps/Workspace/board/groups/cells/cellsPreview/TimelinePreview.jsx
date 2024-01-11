import { utilService } from '../../../../../../services/util.service'

export function TimelinePreview({
  setDateModal,
  removeDates,
  task,
  cmpId,
  group,
  color,
}) {
  return (
    <div
      className="pill "
      style={{
        background: group.style.color ? color : '#333',
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
      {task['timeline' + cmpId] ? (
        <>
          {utilService.formatDateRange(task['timeline' + cmpId])}
          {
            <button
              onClick={removeDates}
              className=" btn-ctn medium-sec "
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
          }
        </>
      ) : (
        '-'
      )}
    </div>
  )
}
